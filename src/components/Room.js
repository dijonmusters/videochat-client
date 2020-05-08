import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';
import config from '../utils/config';

const Video = styled.video`
  /* width: 50vw;
  height: 50vh; */
  flex: 1;
  transform: scaleX(-1);
`;

const Room = () => {
  const { roomId } = useParams();
  const videoRef = useRef();
  const socket = useRef();
  const stream = useRef();
  const peers = useRef({});
  const [users, setUsers] = useState([]);

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

    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

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
      console.log(`${id} joined`);
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
  };

  useEffect(() => {
    connectToRoom();

    return () => {
      socket.current.close();
    };
  }, []);

  return (
    <>
      <Video ref={videoRef} autoPlay />
      {users.map((u) => (
        <Video key={u} id={u} autoPlay />
      ))}
    </>
  );
};

export default Room;
