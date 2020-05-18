import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { getColumns } from '../utils/spatial';
import Controls from './Controls';
import {
  createPeerConnection,
  getOffer,
  getAnswer,
} from '../utils/connections';
import RemoteVideo from './RemoteVideo';
import { useSocket } from '../context/Socket';

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
  overflow: hidden;
`;

const Room = () => {
  const { roomId } = useParams();
  const videoRef = useRef();
  const { socket } = useSocket();
  const stream = useRef();
  const peers = useRef({});
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [isMuteRequested, setIsMuteRequested] = useState(false);

  const constraints = {
    video: {
      facingMode: 'user',
    },
    audio: true,
  };

  const getVideoStream = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      history.push('/unsupported');
    }
  };

  const pipeMyVideoToScreen = () => {
    videoRef.current.srcObject = stream.current;
  };

  const subscribeToMessages = () => {
    socket.on('offer', async (id, description) => {
      const peer = peers.current[id];
      const answer = await getAnswer(peer, description);
      socket.emit('answer', id, answer);
    });

    socket.on('answer', (id, description) => {
      peers.current[id].setRemoteDescription(description);
    });

    socket.on('candidate', async (id, candidate) => {
      peers.current[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('request mute', () => {
      setIsMuteRequested(true);
    });

    socket.on('all users', async (currentUsers) => {
      await Promise.all(
        currentUsers.map(async (id) => {
          const peer = createPeerConnection(id, stream, socket);
          peers.current[id] = peer;

          peer.ontrack = (e) => {
            setUsers((otherUsers) => {
              const user = otherUsers.find((u) => u.id === id);
              user.stream = e.streams[0];
              return [...otherUsers];
            });
          };

          const offer = await getOffer(id, peer);
          socket.emit('offer', id, offer);
        })
      );
      setUsers(currentUsers.map((id) => ({ id })));
    });

    socket.on('user joined', async (id) => {
      const peer = createPeerConnection(id, stream, socket);
      peers.current[id] = peer;

      peer.ontrack = (e) => {
        setUsers((otherUsers) => {
          const user = otherUsers.find((u) => u.id === id);
          user.stream = e.streams[0];
          return [...otherUsers];
        });
      };

      setUsers((currentUsers) => [...currentUsers, { id }]);
    });

    socket.on('user left', async (id) => {
      delete peers.current[id];
      setUsers((currentUsers) => [...currentUsers.filter((u) => u.id !== id)]);
    });

    socket.on('request mute status', (requesterId) => {
      socket.emit(
        'report mute status',
        requesterId,
        socket.id,
        !stream.current.getAudioTracks()[0].enabled
      );
    });

    socket.on('report mute status', (senderId, status) => {
      setUsers((otherUsers) => {
        const user = otherUsers.find((u) => u.id === senderId);
        user.isMuted = status;
        return [...otherUsers];
      });
    });
  };

  const connectToRoom = async () => {
    stream.current = await getVideoStream();

    subscribeToMessages();
    pipeMyVideoToScreen();

    socket.emit('join room', roomId);
  };

  useEffect(() => {
    connectToRoom();
  }, []);

  return (
    <VideoContainer users={users.length + 1}>
      <Video ref={videoRef} autoPlay playsInline muted={true} />
      {users.map((user) => (
        <RemoteVideo
          key={user.id}
          id={user.id}
          stream={user.stream}
          isMuted={user.isMuted}
        />
      ))}
      <Controls
        stream={stream}
        isMuteRequested={isMuteRequested}
        setIsMuteRequested={setIsMuteRequested}
      />
    </VideoContainer>
  );
};

export default Room;
