import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import CityView from './features/cityView/CityView';

function App() {
  return (
    <Container>
      <Header as='h1' textAlign='center'>Air Quality Assessment Tool</Header>
      <Grid textAlign="center">
        <Grid.Row>
          <Grid.Column width={8}>
            <CityView />
          </Grid.Column>
          <Grid.Column width={8}>
            <CityView />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
