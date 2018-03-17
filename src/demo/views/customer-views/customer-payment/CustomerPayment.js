import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getRouteCustomerOrder, getRouteCustomerAddress} from '../../../Routes'

import {setStep} from '../../../state/Actions'

import './CustomerPayment.scss'

class CustomerPayment extends React.Component {
    constructor(props) {
        super(props)

        this.demoId = this.props.match.params.demoId

        this.onGoBack = this.onGoBack.bind(this)
    }

    onGoBack() {
        const {restaurantId} = this.props.currentOrder
        this.props.history.push(getRouteCustomerOrder(this.demoId, restaurantId))
    }

    componentDidMount() {
        this.props.currentOrder && this.props.dispatch(setStep(4))
    }

    render() {
        const {currentOrder} = this.props

        if (!currentOrder) {
            return <Redirect to={getRouteCustomerAddress(this.demoId)}/>
        }
        else {
            return (
                <div id="bf-demo-customer-payment" className="view">
                    <div>
                        <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                        <div className="view-title">
                            <div className="label">Proceed to the payment of your order</div>
                        </div>
                        <div className="btn"><i className="fas fa-dollar-sign"/></div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentOrder: state.currentOrder
    }
}

export default connect(mapStateToProps)(CustomerPayment)
