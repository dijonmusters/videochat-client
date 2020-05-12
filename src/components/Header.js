import React from 'react';
import styled from 'styled-components';
import { v1 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';

const Container = styled.header`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 7rem;
  margin: 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 1.5rem;
`;

const PrimaryButton = styled.button`
  margin-top: 2rem;
  align-self: center;
  background: #00d0c6;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const history = useHistory();

  const randomRoom = () => {
    const id = uuid();
    history.push(`/${id}`);
  };

  return (
    <Container>
      <Title>Converse</Title>
      <Subtitle>
        The open source video chat platform that doesn't suck!
      </Subtitle>
      <PrimaryButton onClick={randomRoom}>Start a conversation</PrimaryButton>
    </Container>
  );
};

export default Header;
