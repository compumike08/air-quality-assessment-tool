import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Message } from 'semantic-ui-react'
import { ERROR_STATUS, CITY_SIDE_A, CITY_SIDE_B } from '../../constants/general';
import { fetchCityAMeasurements, fetchCityBMeasurements } from '../cityView/cityViewSlice';

class SearchCity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            citySearchText: "",
            isError: false
        };
    }

    handleCityInputChange = (_event, data) => {
        this.setState({
            citySearchText: data.value
        });
    }

    handleSearchSubmit = () => {
        this.setState({
            isError: false
        });

        if (this.state.citySearchText.length > 0 && this.props.citySide === CITY_SIDE_A) {
            this.props.actions.fetchCityAMeasurements(this.state.citySearchText);
        } else if (this.state.citySearchText.length > 0 && this.props.citySide === CITY_SIDE_B) {
            this.props.actions.fetchCityBMeasurements(this.state.citySearchText);
        } else {
            this.setState({
                isError: true
            });
        }
    }

    render () {
        const isBackendError = (this.props.cityAStatus === ERROR_STATUS && this.props.citySide === CITY_SIDE_A) ||
            (this.props.cityBStatus === ERROR_STATUS && this.props.citySide === CITY_SIDE_B);

        return (
            <>
                <div>
                    <Input
                        error={this.state.isError || isBackendError ? true : false}
                        placeholder='City...'
                        onChange={this.handleCityInputChange}
                    />
                    <Button attached="right" onClick={this.handleSearchSubmit} >Search</Button>
                </div>
                {this.state.isError && (
                    <Message negative>
                        <Message.Header>Invalid city search text</Message.Header>
                    </Message>
                )}
                {isBackendError && (
                    <Message negative>
                        <Message.Header>An error occurred while searching for city</Message.Header>
                    </Message>
                )}
            </>
        );
    }
}

SearchCity.propTypes = {
    citySide: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        cityAStatus: state.cityView.cityAStatus,
        cityBStatus: state.cityView.cityBStatus
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        fetchCityAMeasurements,
        fetchCityBMeasurements
      }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCity);
