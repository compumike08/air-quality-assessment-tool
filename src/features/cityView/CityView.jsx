import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Segment, Accordion, Label } from 'semantic-ui-react'
import { CITY_SIDE_A } from '../../constants/general';
import SearchCity from '../searchCity/SearchCity';
import LocationParamsView from '../locationParamsView/LocationParamsView';

class CityView extends PureComponent {
    render() {
        const panels = this.props.cityData.map(data => ({
            key: `panel-${data.location}`,
            title: `TEST ${data.location}`,
            content: {
                content: (
                    <LocationParamsView
                        location={data.location}
                        city={data.city}
                        measurements={data.measurements}
                    />
                )
            }
        }));
        return (
            <>
                <SearchCity citySide={this.props.citySide} />
                <Divider />
                {this.props.cityData.length > 0 && (
                    <Segment textAlign='left'>
                        <Label size="large" attached="top">{`${this.props.cityData[0].city}, ${this.props.cityData[0].country} Air Quality By Location`}</Label>
                        <Accordion
                            fluid
                            styled
                            exclusive={false}
                            panels={panels}
                        />
                    </Segment>
                )}
            </>
        );
    }
}

CityView.propTypes = {
    citySide: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
      parameters: state.parametersData.parameters,
      cityData: ownProps.citySide === CITY_SIDE_A ? state.cityView.cityAResults : state.cityView.cityBResults
    };
  }

export default connect(mapStateToProps)(CityView);
