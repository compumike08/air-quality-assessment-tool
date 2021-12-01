import React, { PureComponent } from 'react';
import { Container, Header } from 'semantic-ui-react'
import SearchCity from '../searchCity/SearchCity';

class CityView extends PureComponent {

    render() {
        return (
            <SearchCity />
        );
    }
}

export default CityView;
