import React, { PureComponent } from 'react';
import { Input, Button } from 'semantic-ui-react'

class SearchCity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            citySearchText: ""
        };
    }

    handleCityInputChange = (_event, data) => {
        this.setState({
            citySearchText: data.value
        });
    }

    render () {
        return (
            <>
                <Input placeholder='City...' onChange={this.handleCityInputChange} />
                <Button attached="right" >Search</Button>
            </>
        );
    }
}

export default SearchCity;
