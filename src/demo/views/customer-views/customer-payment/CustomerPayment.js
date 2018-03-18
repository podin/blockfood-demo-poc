import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerOrder, getRouteRestaurantOrders} from '../../../Routes'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {setStep, setModal, setOrders} from '../../../state/Actions'

import './CustomerPayment.scss'

class CustomerPayment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            success: false
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onGoBack() {
        if (!this.state.loading) {
            const {demoId} = this.props.match.params
            const {restaurantId} = this.props.orderInProgress
            this.props.history.replace(getRouteCustomerOrder(demoId, restaurantId))
        }
    }

    onSubmit() {
        if (!this.state.loading) {
            const {demoId} = this.props.match.params
            const {orderInProgress} = this.props

            const onSuccess = (orders) => {
                this.setState({success: true})

                this.props.dispatch(setOrders(orders))

                const onModalClose = () => {
                    this.props.dispatch(setStep(5))
                    this.props.history.replace(getRouteRestaurantOrders(demoId, orderInProgress.restaurantId))
                }

                setTimeout(() => this.props.dispatch(setModal(2, onModalClose)), 200)
            }

            this.setState({loading: true})
            doWithMinTime(() => Api.createNewOrder(demoId, orderInProgress)).then(onSuccess)
        }
    }

    render() {
        const {loading, success} = this.state

        return (
            <div id="bf-demo-customer-payment" className="view">
                <div>
                    <div className={`go-back${loading ? ' disabled' : ''}`} onClick={this.onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                    <div className="view-title">
                        <div className="label">Proceed to the payment of your order</div>
                    </div>
                    <div className={`btn-remote-action${loading ? ' loading' : ''}`} onClick={this.onSubmit}>
                        {success ? (
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
        orderInProgress: state.orderInProgress
    }
}

export default connect(mapStateToProps)(CustomerPayment)
