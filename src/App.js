import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Grid, Message, Button } from 'semantic-ui-react'
import { ERROR_STATUS, CITY_SIDE_A, CITY_SIDE_B } from './constants/general';
import CityView from './features/cityView/CityView';
import { fetchAllParameters } from './features/parameters/parametersSlice';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isRawData: true
    };
  }

  componentDidMount() {
    this.props.actions.fetchAllParameters();
  }

  handleToggleViewMode = isRawData => {
    this.setState({
      isRawData
    });
  };

  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center'>Air Quality Assessment Tool</Header>
        {this.props.parametersLoadingStatus === ERROR_STATUS && (
          <Message negative>
            <Message.Header>Unable to load sensor parameters list</Message.Header>
          </Message>
        )}
        <Grid textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Button.Group>
                <Button positive={this.state.isRawData} onClick={()=> this.handleToggleViewMode(true)} >Raw Data</Button>
                <Button.Or />
                <Button positive={!this.state.isRawData} onClick={() => this.handleToggleViewMode(false)} >Averages</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <CityView isRawDataView={this.state.isRawData} citySide={CITY_SIDE_A} />
            </Grid.Column>
            <Grid.Column width={8}>
              <CityView isRawDataView={this.state.isRawData} citySide={CITY_SIDE_B} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    parametersLoadingStatus: state.parametersData.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAllParameters }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
