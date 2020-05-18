import React, { useState, useEffect, useRef } from 'react';
import { FiVideo, FiMic, FiVideoOff, FiMicOff, FiPhone } from 'react-icons/fi';
import styled from 'styled-components';
import { useSocket } from '../context/Socket';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  color: white;
`;

const Button = styled.button`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  font-size: 1.5rem;
  border: none;
  color: inherit;
  padding: 1rem 0;
  transition: all ease-in-out 0.2s;
  & > svg {
    display: block;
    font-size: 2rem;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const PhoneIcon = styled(FiPhone)`
  transform: rotate(135deg);
`;

const PhoneCircle = styled.span`
  background: #dd4124;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
`;

const MuteDialog = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-200%);
  font-size: 1rem;
  display: flex;
  max-width: 200px;
  padding: 0.5rem 1rem;
  pointer-events: none;
  background: #dd4124;
`;

const MuteRequestDialog = () => <MuteDialog>Mute requested</MuteDialog>;

const Controls = ({ stream, isMuteRequested, setIsMuteRequested }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const tempUnmute = useRef(false);
  const { socket } = useSocket();

  const handleKeyDown = (e) => {
    if (isMuted && !tempUnmute.current && e.key === ' ') {
      tempUnmute.current = true;
      setIsMuted(false);
    }
  };

  const handleKeyUp = (e) => {
    if (tempUnmute.current && e.key === ' ') {
      tempUnmute.current = false;
      setIsMuted(true);
    }
  };

  const navigateHome = () => {
    window.location.href = '/';
  };

  const toggleMute = () => {
    setIsMuteRequested(false);
    stream.current.getAudioTracks()[0].enabled = !stream.current.getAudioTracks()[0]
      .enabled;
    setIsMuted(!stream.current.getAudioTracks()[0].enabled);
    socket.emit(
      'update mute status',
      socket.id,
      !stream.current.getAudioTracks()[0].enabled
    );
  };

  const toggleVideo = () => {
    stream.current.getVideoTracks()[0].enabled = !stream.current.getVideoTracks()[0]
      .enabled;
    setIsVideoActive(stream.current.getVideoTracks()[0].enabled);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  const requestMute = () => {
    socket.emit('request all mute statuses', socket.id);
  };

  return (
    <Container>
      <Button onClick={toggleMute}>
        {!isMuted && isMuteRequested && <MuteRequestDialog />}
        {isMuted ? <FiMicOff /> : <FiMic />}
        Mute
      </Button>
      <Button onClick={navigateHome}>
        <PhoneCircle>
          <PhoneIcon />
        </PhoneCircle>
      </Button>
      <Button onClick={toggleVideo}>
        {isVideoActive ? <FiVideo /> : <FiVideoOff />}
        Hide
      </Button>
      <Button onClick={requestMute}>Request Mute</Button>
    </Container>
  );
};

export default Controls;
