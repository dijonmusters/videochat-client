import React, { useState, useRef, useEffect } from 'react';
import { v1 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Panel = styled.div`
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

const Form = () => {
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

  const handleEnterSubmit = (e) => {
    e.key === 'Enter' && createRoom();
  };
  return (
    <Container>
      <Panel>
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
      </Panel>
    </Container>
  );
};

export default Form;
