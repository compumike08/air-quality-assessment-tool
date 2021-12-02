import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Popup, Icon } from 'semantic-ui-react'

class LocationParamsView extends PureComponent {
    render() {
        const parameterTableRows = this.props.measurements.map(measurement => {
            const parameterType = this.props.parameters.find(param => param.name === measurement.parameter);
            return (
                <Table.Row key={`table-row-${measurement.parameter}`}>
                    <Table.Cell>
                        <Popup content={parameterType.description} trigger={<span><Icon link name="info circle" />{parameterType.displayName}</span>} />
                    </Table.Cell>
                    <Table.Cell>{measurement.value}</Table.Cell>
                    <Table.Cell>{measurement.unit}</Table.Cell>
                </Table.Row>
            );
        });

        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Parameter Type</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {parameterTableRows}
                </Table.Body>
            </Table>
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

function mapStateToProps(state) {
    return {
        parameters: state.parametersData.parameters
    };
}

export default connect(mapStateToProps)(LocationParamsView);
