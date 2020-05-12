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

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const Panel = styled.div`
  background: rgba(0, 0, 0, 0.4);
  padding: 3rem;

  @media only screen and (max-width: 800px) {
    padding: 0;
    background: transparent;
  }
`;

const Url = styled.div`
  display: flex;
  background: transparent;
  border: 1px solid #cbd8e3;
  line-height: 2;
`;

const Static = styled.div`
  @media only screen and (max-width: 800px) {
    display: none;
  }

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
  padding: 0.75rem 1.5rem;
`;

const InlineButton = styled.button`
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

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const BlockButton = styled.button`
  display: none;

  @media only screen and (max-width: 800px) {
    display: block;
    margin-top: 0.5rem;
    width: 100%;
    background: transparent;
    font-size: 1.5rem;
    padding: 1rem 1.5rem;
    border: 1px solid white;
    color: white;

    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.2);
    }
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
          <InlineButton onClick={createRoom}>Create</InlineButton>
        </Url>
        <BlockButton onClick={createRoom}>Create</BlockButton>
      </Panel>
    </Container>
  );
};

export default Form;
