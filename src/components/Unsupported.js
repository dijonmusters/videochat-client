import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Unsupported = () => (
  <Message>
    <h1>Oh no! Unsupported!</h1>
    <span>
      Unfortunately it looks like this feature is not supported in your browser.
      Try making sure that video and audio access are not entirely blocked in
      settings.
    </span>
    <p>
      We are actively working on native Android and iOS apps which will
      hopefully fix this issue!
    </p>
  </Message>
);

export default Unsupported;
