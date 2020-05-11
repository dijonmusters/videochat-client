import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { v1 as uuid } from 'uuid';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #666;
  background: linear-gradient(black, black),
    url('https://images.unsplash.com/photo-1554192833-a5cd504427dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  background-blend-mode: saturation;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 6rem;
    margin: 0;
  }

  p {
    margin: 1rem;
  }

  button {
    margin-top: 2rem;
  }
`;

const Form = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 4rem;
`;

const Url = styled.div`
  display: flex;
  background: transparent;
  border: 1px solid #cbd8e3;
  line-height: 2;
`;

const Static = styled.div`
  flex: 0;
  font-size: 2rem;
  border-right: 1px solid #afafaf;
  color: white;
  padding: 0 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  font-size: 2rem;
  border: none;
  outline: none;
  box-sizing: border-box;
  color: inherit;
  padding: 0 1.5rem;
`;

const Button = styled.button`
  flex: 0;
  background: transparent;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  border: 1px solid white;
  color: white;

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const PrimaryButton = styled.button`
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

const Index = () => {
  const [input, setInput] = useState('');
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => {
    inputRef && inputRef.current.focus();
  }, []);

  const createRoom = () => {
    const id = input || uuid();
    history.push(`/${id}`);
  };

  const randomRoom = () => {
    const id = uuid();
    history.push(`/${id}`);
  };

  const handleEnterSubmit = (e) => {
    e.key === 'Enter' && createRoom();
  };

  return (
    <Container>
      <Title>
        <h1>Converse</h1>
        <p>The open source video chat platform that doesn't suck!</p>
        <PrimaryButton onClick={randomRoom} primary>
          Start a conversation
        </PrimaryButton>
      </Title>
      <Form>
        <Url>
          <Static>/</Static>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleEnterSubmit}
          />
          <Button onClick={createRoom}>Create</Button>
        </Url>
      </Form>
    </Container>
  );
};

export default Index;
