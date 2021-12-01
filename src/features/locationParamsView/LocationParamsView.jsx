import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, Segment, Accordion, Label } from 'semantic-ui-react'

class LocationParamsView extends PureComponent {
    render() {
        return (
            <div>Placeholder</div>
        );
    }
}

LocationParamsView.propTypes = {
    location: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    measurements: PropTypes.arrayOf(PropTypes.shape({
        parameter: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired
    }))
};

export default LocationParamsView;
