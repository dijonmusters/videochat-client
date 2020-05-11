import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Room from './components/Room';
import Index from './components/Index';

const Container = styled.div`
  background: linear-gradient(to right, #fbd3e9, #bb377d);

  min-height: 100vh;
  display: flex;
  color: #444;
`;

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Index />
          </Route>
          <Route path='/:roomId'>
            <Room />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;

// TODO: checvk this workedStop feedback - maybe mute microphone from coming through speakers
// TODO: Implement hold space to unmute
// TODO: Add favicon
