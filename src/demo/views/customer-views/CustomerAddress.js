import React from 'react';
import {CUSTOMER_RESTAURANT_ROUTE} from '../../Routes'

import './CustomerAddress.scss'

class CustomerAddress extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({value: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()

        if (this.state.value.length > 0) {
            const {demoId} = this.props.match.params
            this.props.history.push(`/${demoId}/${CUSTOMER_RESTAURANT_ROUTE}`)
        }
    }

    render() {
        const {value} = this.state

        return (
            <div id="bf-demo-customer-address" className="view">

                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Where..." value={value} onChange={this.onChange}/>
                    <button type="submit" disabled={value.length === 0}><i className="fas fa-search"/></button>
                </form>

            </div>
        )
    }
}

export default CustomerAddress
