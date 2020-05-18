import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Room from './components/Room';
import Index from './components/Index';
import Unsupported from './components/Unsupported';
import SocketProvider from './context/Socket';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  color: #444;
`;

const App = () => {
  return (
    <SocketProvider>
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <Index />
            </Route>
            <Route path='/unsupported'>
              <Unsupported />
            </Route>
            <Route path='/:roomId'>
              <Room />
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </SocketProvider>
  );
};

export default App;

// TODO: Show animation on mute requested and received side
// TODO: Fix video sizing issue
// TODO: Deploy front

// TODO: Add screen share
// TODO: Add drag and drop to video page
