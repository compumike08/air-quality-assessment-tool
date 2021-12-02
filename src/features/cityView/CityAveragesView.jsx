import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Label, Loader } from 'semantic-ui-react'
import { CITY_SIDE_A, LOADING_STATUS } from '../../constants/general';
import LocationParamsView from '../locationParamsView/LocationParamsView';

class CityAveragesView extends PureComponent {
    render() {
        const isLoading = this.props.cityStatus === LOADING_STATUS;

        return (
            <Segment placeholder={this.props.cityData.length < 1} textAlign={this.props.cityData.length < 1 ? 'center' : 'left'}>
                {this.props.cityData.length < 1 && (
                    <div>No Results</div>
                )}
                {isLoading && (
                    <Loader active size="big" />
                )}
                {this.props.cityData.length > 0 && (
                    <>
                        <Label size="large" attached="top">{`${this.props.cityData[0].city}, ${this.props.cityData[0].country} Air Quality Averages Over All Locations In City`}</Label>
                        <LocationParamsView measurements={this.props.parametersMap} />
                    </>
                )}
            </Segment>
        );
    }
}

CityAveragesView.propTypes = {
    citySide: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    const cityData = ownProps.citySide === CITY_SIDE_A ? state.cityView.cityAResults : state.cityView.cityBResults;
    const cityStatus = ownProps.citySide === CITY_SIDE_A ? state.cityView.cityAStatus : state.cityView.cityBStatus;

    const parametersMap = state.parametersData.parameters.map(param => {
        const paramMeasurements = [];
        const locations = cityData;
        
        for (let location of locations) {
            const matchingMeasurement = location.measurements.find(measurement => measurement.parameter === param.name && measurement.unit === param.preferredUnit);
            if (matchingMeasurement) {
                paramMeasurements.push(matchingMeasurement.value);
            }
        }

        let averageValue = null;

        if (paramMeasurements.length > 0) {
            averageValue = paramMeasurements.reduce((a, b) => a + b) / paramMeasurements.length;
        }

        return {
            parameter: param.name,
            unit: param.preferredUnit,
            value: averageValue
        };
    });

    return {
      cityData,
      cityStatus,
      parametersMap
    };
}

export default connect(mapStateToProps)(CityAveragesView);
