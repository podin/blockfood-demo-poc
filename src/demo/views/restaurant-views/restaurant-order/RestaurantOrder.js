import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteRestaurantOrders, getRouteCourierOrders} from '../../../Routes'
import ORDER_STATUS, {getStatus} from '../../../data/OrderStatus'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {setStep, setModal, setOrders} from '../../../state/Actions'

import './RestaurantOrder.scss'

class RestaurantOrder extends React.Component {
    constructor(props) {
        super(props)

        const order = this.getOrder()
        const isDone = this.isDone(order)

        this.state = {
            loading: isDone,
            success: isDone,
            order
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onGoBack = this.onGoBack.bind(this)
    }

    getOrder(props) {
        const {match, orders} = (props || this.props)
        const {orderId} = match.params
        return _.find(orders, ({id}) => id === orderId)
    }

    isDone(order) {
        return ![ORDER_STATUS.WAITING_RESTAURANT_VALIDATION, ORDER_STATUS.COOKING].includes(order.status)
    }

    onGoBack() {
        if (!this.state.loading) {
            const {demoId, restaurantId} = this.props.match.params
            this.props.history.replace(getRouteRestaurantOrders(demoId, restaurantId))
        }
    }

    onSubmit() {
        const {demoId} = this.props.match.params
        const {loading, order} = this.state

        if (!loading && !this.isDone(order)) {
            const newStatus = {
                [ORDER_STATUS.WAITING_RESTAURANT_VALIDATION]: ORDER_STATUS.COOKING,
                [ORDER_STATUS.COOKING]: ORDER_STATUS.WAITING_COURIER
            }[order.status]

            const onSuccess = ({ordersForRestaurant, ordersForCourier}) => {
                this.props.dispatch(setOrders(ordersForRestaurant))

                if (newStatus === ORDER_STATUS.COOKING) {
                    this.setState({loading: false})
                    this.props.dispatch(setStep(this.props.step + 1))
                }
                else {
                    this.setState({success: true})

                    const onModalClose = () => {
                        this.props.dispatch(setStep(7))
                        this.props.dispatch(setOrders(ordersForCourier))
                        this.props.history.replace(getRouteCourierOrders(demoId))
                    }

                    setTimeout(() => this.props.dispatch(setModal(3, onModalClose)), 500)
                }
            }

            this.setState({loading: true})
            doWithMinTime(() => Api.updateOrderStatus(demoId, order.id, newStatus)).then(onSuccess)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.orders, nextProps.orders)) {
            this.setState({order: this.getOrder(nextProps)})
        }
    }

    render() {
        const {loading, success, order} = this.state

        return (
            <div id="bf-demo-restaurant-order" className="view">
                <div>
                    <div className={`go-back${loading ? ' disabled' : ''}`} onClick={this.onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                    <div className="view-title">
                        <div className="label">Order <span>{order.id}</span></div>
                    </div>
                    <div className={`btn-remote-action${loading ? ' loading' : ''}`} onClick={this.onSubmit}>
                        {success ? (
                            <i className="fas fa-check"/>
                        ) : loading ? (
                            <i className="fas fa-circle-notch fa-spin"/>
                        ) : order.status === ORDER_STATUS.WAITING_RESTAURANT_VALIDATION ? (
                            <i className="fas fa-check"/>
                        ) : (
                            <i className="fas fa-utensils"/>
                        )}
                    </div>
                    <div className="view-title view-title-status">
                        <div className="label">Status: <span>{getStatus(order)}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        orders: state.orders
    }
}

export default connect(mapStateToProps)(RestaurantOrder)