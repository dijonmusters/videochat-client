import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Room from './components/Room';
import Index from './components/Index';
import Unsupported from './components/Unsupported';

const Container = styled.div`
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
          <Route path='/unsupported'>
            <Unsupported />
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

// TODO: Add request to mute someone else
// TODO: Move peer mess to function
// TODO: Add analytics around room creation, destruction and how long it existed
