import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {getRouteCustomerRestaurants} from '../../../Routes'

import {setStep, setCustomerAddress} from '../../../state/Actions'

import './CustomerAddress.scss'

class CustomerAddress extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.customerAddress
        }

        this.onChange = this.onChange.bind(this)
        this.clear = this.clear.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.submitAll = this.submitAll.bind(this)
    }

    onChange(event) {
        this.setState({value: event.target.value})
    }

    clear() {
        this.refocusInput = true
        this.setState({value: ''})
    }

    onSubmit(event) {
        event.preventDefault()

        const {value} = this.state

        if (value.length > 0) {
            this.props.dispatch(setStep(2))
            this.props.dispatch(setCustomerAddress(value))
            this.props.history.replace(getRouteCustomerRestaurants())
        }
    }

    submitAll() {
        this.props.dispatch(setStep(2))
        this.props.dispatch(setCustomerAddress(''))
        this.props.history.replace(getRouteCustomerRestaurants())
    }

    componentDidUpdate() {
        if (this.refocusInput) {
            this.inputElement.focus()
            this.refocusInput = false
        }
    }

    componentDidMount() {
        this.inputElement = ReactDOM.findDOMNode(this).querySelector('input')
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
                        <div>
                            <input type="text" placeholder="Where are you?" value={value} onChange={this.onChange}/>
                            {value.length > 0 && <div className="clear" onClick={this.clear}><i className="fas fa-times"/></div>}
                        </div>
                        <button type="submit" disabled={value.length === 0}>
                            <i className="fas fa-search"/>
                        </button>
                    </form>
                    <div className="all" onClick={this.submitAll}>Browse all restaurants</div>
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
