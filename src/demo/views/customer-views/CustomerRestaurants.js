import React from 'react';
import Template from '../../components/template/Template'

class CustomerRestaurants extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Template type="customer">
                <div id="bf-demo-customer-restaurants"></div>
            </Template>
        )
    }
}

export default CustomerRestaurants
