import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiMic, FiMicOff } from 'react-icons/fi';
import { useSocket } from '../context/Socket';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const Video = styled.video`
  transform: scaleX(-1);
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  position: relative;
`;

const RequestMute = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  color: white;
  font-size: 1.5rem;
  background: transparent;
  border: none;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
`;

const RemoteVideo = ({ id, stream, isMuted }) => {
  const { socket } = useSocket();
  const videoRef = useRef();

  const handleRequestMute = (id) => () => {
    socket.emit('request mute', id);
  };

  useEffect(() => {
    socket.emit('request mute status', socket.id, id);
  }, []);

  useEffect(() => {
    if (videoRef && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Container>
      <Video ref={videoRef} id={id} autoPlay playsInline muted={isIOS} />
      <RequestMute onClick={handleRequestMute(id)}>
        {isMuted ? <FiMicOff /> : <FiMic />}
      </RequestMute>
    </Container>
  );
};

export default RemoteVideo;
