import React from 'react';
import styled from 'styled-components';
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

const Index = () => {
  return (
    <Container>
      <Header />
      <Form />
    </Container>
  );
};

export default Index;
