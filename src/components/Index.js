import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { v1 as uuid } from 'uuid';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #666;
`;

const Url = styled.div`
  display: flex;
  line-height: 2;
  background: white;
  border: 1px solid #cbd8e3;
  align-items: center;
  padding: 0 2rem;
  border-radius: 4px;
  margin: 0 0.125rem;
`;

const Static = styled.div`
  flex: 0;
  border-radius: 4px 0 0 4px;
  font-size: 2rem;
`;

const Input = styled.input`
  flex: 1;
  font-size: 2rem;
  border: none;
  outline: none;
  box-sizing: border-box;
  color: inherit;
  padding-left: 0.25rem;
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex: 1;
  background: white;
  font-size: 1.5rem;
  padding: 1rem 0;
  border: none;
  color: inherit;
  margin: 0.125rem;

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
      <Url>
        <Static>converse.now.sh/</Static>
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleEnterSubmit}
        />
      </Url>
      <Buttons>
        <Button onClick={randomRoom}>Generate URL</Button>
        <Button onClick={createRoom}>Start conversation</Button>
      </Buttons>
    </Container>
  );
};

export default Index;
