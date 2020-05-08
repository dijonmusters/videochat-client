import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { v1 as uuid } from 'uuid';

const ButtonGroup = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  flex: 1;
  background: transparent;
  font-size: 2rem;
  border: 0;
  border-right: 1px solid #dfdfdf;
  color: inherit;

  &:last-child {
    border-right: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Index = () => {
  const history = useHistory();

  const createRoom = () => {
    const id = uuid();
    history.push(`/${id}`);
  };

  return (
    <ButtonGroup>
      <Button>Join</Button>
      <Button onClick={createRoom}>Create</Button>
    </ButtonGroup>
  );
};

export default Index;
