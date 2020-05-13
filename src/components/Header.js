import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  position: relative;
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
  line-height: 1;

  @media only screen and (max-width: 800px) {
    font-size: 5rem;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 1.5rem;

  @media only screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

const Header = () => {
  return (
    <Container>
      <Title>Converse</Title>
      <Subtitle>
        The open source video chat platform that doesn't suck!
      </Subtitle>
    </Container>
  );
};

export default Header;
