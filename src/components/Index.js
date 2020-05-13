import React from 'react';
import styled from 'styled-components';
import { v1 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Form from './Form';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #666;
  background: linear-gradient(black, black),
    url('https://images.unsplash.com/photo-1554192833-a5cd504427dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  background-blend-mode: saturation;
`;

const Button = styled.button`
  align-self: center;
  background: #00d0c6;
  font-size: 1.5rem;
  padding: 1rem 3rem;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 800px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 100vw;
    padding: 2rem;
    font-size: 2rem;
  }
`;

const Index = () => {
  const history = useHistory();

  const randomRoom = () => {
    const id = uuid();
    history.push(`/${id}`);
  };

  return (
    <Container>
      <Header />
      <Button onClick={randomRoom}>Start conversation</Button>
      <Form />
    </Container>
  );
};

export default Index;
