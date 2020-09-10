import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiMic, FiMicOff } from 'react-icons/fi';
import { useSocket } from '../context/Socket';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const Video = styled.video`
  transform: scaleX(-1);
  height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
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

  & > svg {
    display: flex;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
`;

const ToastContainer = styled.div`
  position: relative;
`;

const ToastMessage = styled.span`
  opacity: ${({ show }) => (show ? '1' : '0')};
  position: absolute;
  pointer-events: none;
  font-size: 0.75rem;
  top: -2rem;
  left: 50%;
  transform: ${({ show }) =>
    show ? 'translate(-50%, 3rem)' : 'translate(-50%, 0)'};
  transition: all 0.3s ease-in-out;
`;

const RemoteVideo = ({ id, stream, isMuted }) => {
  const [showToast, setShowToast] = useState(false);
  const { socket } = useSocket();
  const videoRef = useRef();

  const displayToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleRequestMute = (id) => () => {
    socket.emit('request mute', id);
    !showToast && displayToast();
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
        <ToastContainer>
          <ToastMessage show={showToast}>Request sent</ToastMessage>
        </ToastContainer>
      </RequestMute>
    </Container>
  );
};

export default RemoteVideo;
