import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react'
import CityLocationView from './CityLocationView';
import CityAveragesView from './CityAveragesView';
import SearchCity from '../searchCity/SearchCity';

const CityView = ({ citySide, isRawDataView }) => {
    return (
        <>
            <SearchCity citySide={citySide} />
            <Divider />
            {isRawDataView && (
                <CityLocationView citySide={citySide} />
            )}
            {!isRawDataView && (
                <CityAveragesView citySide={citySide} />
            )}
        </>
    );
};

CityView.propTypes = {
    citySide: PropTypes.string.isRequired,
    isRawDataView: PropTypes.bool.isRequired
};

export default CityView;
