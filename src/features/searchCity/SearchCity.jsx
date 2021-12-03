import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Message, Search, Grid, Label } from 'semantic-ui-react'
import { ERROR_STATUS, CITY_SIDE_A, CITY_SIDE_B } from '../../constants/general';
import { fetchCityAMeasurements, fetchCityBMeasurements } from '../cityView/cityViewSlice';

import "./searchCity.css";

class SearchCity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            countrySearchResults: [],
            countrySearchText: "",
            citySearchText: "",
            isError: false,
            selectedCountryData: null
        };
    }

    handleCityInputChange = (_event, data) => {
        this.setState({
            citySearchText: data.value
        });
    };

    handleCountrySearchChange = (_event, data) => {
        const searchTerm = data.value;
        this.setState({
            countrySearchText: searchTerm
        });

        const results = this.props.countries.filter(country => country.name.includes(searchTerm));

        this.setState({
            countrySearchResults: results.map(result => ({ title: result.name})),
            selectedCountryData: null
        });
    };

    handleCountrySearchResultSelect = (_event, data) => {
        const selectedCountryName = data.result.title;
        this.setState({
            countrySearchText: selectedCountryName,
            selectedCountryData: this.props.countries.find(country => country.name === selectedCountryName)
        });
    };

    handleCitySearchSubmit = () => {
        this.setState({
            isError: false
        });

        if (this.state.selectedCountryData && this.state.citySearchText.length > 0 && this.props.citySide === CITY_SIDE_A) {
            this.props.actions.fetchCityAMeasurements({
                citySearchText: this.state.citySearchText,
                countryCode: this.state.selectedCountryData.code
            });
        } else if (this.state.selectedCountryData && this.state.citySearchText.length > 0 && this.props.citySide === CITY_SIDE_B) {
            this.props.actions.fetchCityBMeasurements({
                citySearchText: this.state.citySearchText,
                countryCode: this.state.selectedCountryData.code
            });
        } else {
            this.setState({
                isError: true
            });
        }
    };

    render () {
        const isBackendError = (this.props.cityAStatus === ERROR_STATUS && this.props.citySide === CITY_SIDE_A) ||
            (this.props.cityBStatus === ERROR_STATUS && this.props.citySide === CITY_SIDE_B);

        return (
            <Grid textAlign="center">
                <Grid.Row>
                    <Grid.Column>
                        <Search
                            placeholder={`Search Country ${this.props.citySide}`}
                            results={this.state.countrySearchResults}
                            value={this.state.countrySearchText}
                            onSearchChange={this.handleCountrySearchChange}
                            onResultSelect={this.handleCountrySearchResultSelect}
                        />
                        {this.state.selectedCountryData && (
                            <Label className="selected-country-label">{this.state.selectedCountryData.name}</Label>
                        )}
                    </Grid.Column>                
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            disabled={!this.state.selectedCountryData}
                            error={this.state.isError || isBackendError ? true : false}
                            placeholder={`Enter City ${this.props.citySide}`}
                            onChange={this.handleCityInputChange}
                        />
                        <Button disabled={!this.state.selectedCountryData} attached="right" onClick={this.handleCitySearchSubmit} >Search</Button>
                    </Grid.Column>
                </Grid.Row>
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
            </Grid>
        );
    }
}

SearchCity.propTypes = {
    citySide: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        cityAStatus: state.cityView.cityAStatus,
        cityBStatus: state.cityView.cityBStatus,
        countries: state.countriesData.countries
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
