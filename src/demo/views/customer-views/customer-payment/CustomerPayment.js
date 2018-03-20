import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerOrderInProgress, getRouteRestaurantOrders, getRouteCustomerOrders} from '../../../Routes'
import {STEP_INFOS} from '../../../data/Steps'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {setStep, setStepInfo, setOrders} from '../../../state/Actions'

import './CustomerPayment.scss'

class CustomerPayment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            freeze: false,
            isDone: false
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onGoBack() {
        if (!this.state.freeze) {
            const {restaurantId} = this.props.orderInProgress
            this.props.history.replace(getRouteCustomerOrderInProgress(restaurantId))
        }
    }

    onSubmit() {
        if (!this.state.loading) {
            const {step} = this.props
            const {orderInProgress} = this.props

            const onSuccess = (orders) => {
                this.setState({loading: false, isDone: true})
                this.props.dispatch(setOrders(orders))

                const onStepInfoClose = () => {
                    this.props.dispatch(setStep(5))
                    this.props.history.replace(getRouteRestaurantOrders(orderInProgress.restaurantId))
                }

                setTimeout(() => this.props.dispatch(setStepInfo(STEP_INFOS.START_AS_RESTAURANT, onStepInfoClose)), 200)
            }

            const onFreeModeSuccess = (orders) => {
                this.setState({loading: false, freeze: false, isDone: true})
                this.props.dispatch(setOrders(orders))
                this.props.history.replace(getRouteCustomerOrders())
            }

            this.setState({loading: true, freeze: false})
            doWithMinTime(() => Api.createNewOrder(orderInProgress)).then(response => {
                if (step === 10) {
                    return onFreeModeSuccess(response)
                }
                else {
                    return onSuccess(response)
                }
            })
        }
    }

    render() {
        const {loading, freeze, isDone} = this.state

        return (
            <div id="bf-demo-customer-payment" className="view">
                <div>
                    <div className={`go-back${freeze ? ' disabled' : ''}`} onClick={this.onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                    <div className="view-title">
                        <div className="label">Proceed to the payment of your order</div>
                    </div>
                    <div className={`btn-remote-action${(loading || isDone) ? ' not-a-btn' : ''}`} onClick={this.onSubmit}>
                        {isDone ? (
                            <i className="fas fa-check"/>
                        ) : loading ? (
                            <i className="fas fa-circle-notch fa-spin"/>
                        ) : (
                            <i className="fas fa-dollar-sign"/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        orderInProgress: state.orderInProgress
    }
}

export default connect(mapStateToProps)(CustomerPayment)
