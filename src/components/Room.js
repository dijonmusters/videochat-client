import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import config from '../utils/config';
import { getColumns } from '../utils/spatial';
import Controls from './Controls';

const Video = styled.video`
  transform: scaleX(-1);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ users }) => getColumns(users)};
`;

const Room = () => {
  const { roomId } = useParams();
  const videoRef = useRef();
  const socket = useRef();
  const stream = useRef();
  const peers = useRef({});
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const addPeer = async (id) => {
    const peer = new RTCPeerConnection(config);

    peers.current[id] = peer;
    stream.current.getTracks().forEach((t) => peer.addTrack(t, stream.current));

    peer.ontrack = (e) => {
      const videoElement = document.getElementById(id);
      if (videoElement) videoElement.srcObject = e.streams[0];
    };

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.current.emit('offer', id, peer.localDescription);

    peer.onicecandidate = (e) =>
      e.candidate && socket.current.emit('candidate', id, e.candidate);
  };

  const connectToRoom = async () => {
    socket.current = io.connect('https://videochat-broker.herokuapp.com/');
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
        },
        audio: true,
      });
    } catch (error) {
      history.push('/unsupported');
    }

    videoRef.current.srcObject = stream.current;

    socket.current.on('offer', async (id, description) => {
      const peer = peers.current[id];
      await peer.setRemoteDescription(description);

      const answer = peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.current.emit('answer', id, peer.localDescription);
    });

    socket.current.on('candidate', async (id, candidate) => {
      peers.current[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.current.on('answer', (id, description) => {
      peers.current[id].setRemoteDescription(description);
    });

    socket.current.emit('join room', roomId);

    socket.current.on('all users', async (currentUsers) => {
      await Promise.all(currentUsers.map(addPeer));
      setUsers(currentUsers);
    });

    socket.current.on('user joined', async (id) => {
      const peer = new RTCPeerConnection(config);
      peers.current[id] = peer;

      stream.current
        .getTracks()
        .forEach((t) => peer.addTrack(t, stream.current));

      peer.ontrack = (e) => {
        const videoElement = document.getElementById(id);
        videoElement && (videoElement.srcObject = e.streams[0]);
      };

      peer.onicecandidate = (e) =>
        e.candidate && socket.current.emit('candidate', id, e.candidate);

      setUsers((currentOnes) => [...currentOnes, id]);
    });

    socket.current.on('user left', async (id) => {
      delete peers.current[id];
      setUsers((currentOnes) => [...currentOnes.filter((u) => u !== id)]);
    });
  };

  useEffect(() => {
    connectToRoom();

    return () => {
      socket.current.close();
    };
  }, []);

  return (
    <VideoContainer users={users.length + 1}>
      <Video ref={videoRef} autoPlay playsInline muted={true} />
      {users.map((u) => (
        <Video key={u} id={u} autoPlay playsInline muted={isIOS} />
      ))}
      <Controls stream={stream} />
    </VideoContainer>
  );
};

export default Room;
