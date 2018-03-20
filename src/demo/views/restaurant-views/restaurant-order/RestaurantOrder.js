import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteRestaurantOrders, getRouteCourierOrders} from '../../../Routes'
import ORDER_STATUS, {getStatus} from '../../../data/OrderStatus'
import {RESTAURANT_BY_IDS} from '../../../data/Restaurants'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {selectOrdersByRestaurantId} from '../../../state/Selectors'
import {setStep, setModal, setOrders} from '../../../state/Actions'

import './RestaurantOrder.scss'

class RestaurantOrder extends React.Component {
    constructor(props) {
        super(props)

        const order = this.getOrder()

        this.state = {
            loading: false,
            freeze: false,
            order
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onGoBack = this.onGoBack.bind(this)
    }

    getRestaurant() {
        const {restaurantId} = this.props.match.params
        return RESTAURANT_BY_IDS[restaurantId]
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
        if (!this.state.freeze) {
            const {restaurantId} = this.props.match.params
            this.props.history.replace(getRouteRestaurantOrders(restaurantId))
        }
    }

    onSubmit() {
        const {step} = this.props
        const {loading, order} = this.state

        if (!loading && !this.isDone(order)) {
            const newStatus = {
                [ORDER_STATUS.WAITING_RESTAURANT_VALIDATION]: ORDER_STATUS.COOKING,
                [ORDER_STATUS.COOKING]: ORDER_STATUS.WAITING_COURIER
            }[order.status]

            const onSuccess = (orders) => {
                this.setState({loading: false})
                this.props.dispatch(setOrders(orders))

                if (newStatus === ORDER_STATUS.COOKING) {
                    this.setState({freeze: false})
                    this.props.dispatch(setStep(step + 1))
                }
                else {
                    const onModalClose = () => {
                        this.props.dispatch(setStep(7))
                        this.props.history.replace(getRouteCourierOrders())
                    }

                    setTimeout(() => this.props.dispatch(setModal(3, onModalClose)), 200)
                }
            }

            const onFreeModeSuccess = (orders) => {
                this.setState({loading: false, freeze: false})
                this.props.dispatch(setOrders(orders))
            }

            this.setState({loading: true, freeze: true})
            doWithMinTime(() => Api.updateOrderStatus(order.id, newStatus)).then(response => {
                if (step === 10) {
                    return onFreeModeSuccess(response)
                }
                else {
                    return onSuccess(response)
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.orders, nextProps.orders)) {
            this.setState({order: this.getOrder(nextProps)})
        }
    }

    render() {
        const restaurant = this.getRestaurant()
        const {loading, freeze, order} = this.state

        const menus = _.map(order.details.itemIds, (itemId) => restaurant.menuByIds[itemId])

        return (
            <div id="bf-demo-restaurant-order" className="view">
                <div>
                    <div className={`go-back${freeze ? ' disabled' : ''}`} onClick={this.onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                    <div className="view-title">
                        <div className="label">Id: <span>{order.id}</span></div>
                    </div>
                    <div className="view-title details">
                        <div className="label">Detail:</div>
                        <div className="menu-list">
                            {menus.map(menu => (
                                <div key={menu.id} className="menu">{menu.name}</div>
                            ))}
                        </div>
                    </div>
                    <div className={`btn-remote-action${loading || this.isDone(order) ? ' not-a-btn' : ''}`} onClick={this.onSubmit}>
                        {this.isDone(order) ? (
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

const mapStateToProps = (state, props) => {
    const {restaurantId} = props.match.params

    return {
        step: state.step,
        orders: selectOrdersByRestaurantId(state.orders, restaurantId)
    }
}

export default connect(mapStateToProps)(RestaurantOrder)