import React from 'react'
import {connect} from 'react-redux'
import {CUSTOMER_RESTAURANTS_ROUTE} from '../../Routes'

import {setCustomerAddress} from '../../state/Actions'

import './CustomerAddress.scss'

class CustomerAddress extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.customerAddress
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({value: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault()

        const {value} = this.state

        if (value.length > 0) {
            this.props.dispatch(setCustomerAddress(value))

            const {demoId} = this.props.match.params
            this.props.history.push(`/${demoId}/${CUSTOMER_RESTAURANTS_ROUTE}`)
        }
    }

    render() {
        const {value} = this.state

        return (
            <div id="bf-demo-customer-address" className="view">
                <div>
                    <div className="view-title">
                        <div className="label">Find some restaurants</div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Where are you?" value={value} onChange={this.onChange}/>
                        <button type="submit" disabled={value.length === 0}><i className="fas fa-search"/></button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customerAddress: state.customerAddress
    }
}

export default connect(mapStateToProps)(CustomerAddress)
