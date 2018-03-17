import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteRestaurantOrders} from '../../../Routes'
import ORDER_STATUS, {getStatus} from '../../../data/OrderStatus'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {setStep, setRestaurantOrders} from '../../../state/Actions'

import './RestaurantOrder.scss'

class RestaurantOrder extends React.Component {
    constructor(props) {
        super(props)

        const {demoId, restaurantId} = this.props.match.params

        this.demoId = demoId
        this.restaurantId = restaurantId

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
        const {match, restaurantOrders} = (props || this.props)
        const {orderId} = match.params
        return _.find(restaurantOrders, ({id}) => id === orderId)
    }

    isDone(order) {
        return ![ORDER_STATUS.WAITING_RESTAURANT_VALIDATION, ORDER_STATUS.COOKING].includes(order.status)
    }

    onGoBack() {
        this.props.history.replace(getRouteRestaurantOrders(this.demoId, this.restaurantId))
    }

    onSubmit() {
        const {loading, order} = this.state

        if (!loading && !this.isDone(order)) {
            const newStatus = {
                [ORDER_STATUS.WAITING_RESTAURANT_VALIDATION]: ORDER_STATUS.COOKING,
                [ORDER_STATUS.COOKING]: ORDER_STATUS.WAITING_COURIER
            }[order.status]

            const onSuccess = (restaurantOrders) => {
                this.props.dispatch(setRestaurantOrders(restaurantOrders))

                if (newStatus === ORDER_STATUS.COOKING) {
                    this.setState({loading: false})
                    this.props.dispatch(setStep(this.props.step + 1))
                }
                else {
                    this.setState({success: true})
                    // TODO: open next modal
                }
            }

            this.setState({loading: true})
            doWithMinTime(() => Api.updateOrderStatus(this.demoId, order.id, newStatus)).then(onSuccess)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.restaurantOrders, nextProps.restaurantOrders)) {
            this.setState({order: this.getOrder(nextProps)})
        }
    }

    render() {
        const {loading, success, order} = this.state

        return (
            <div id="bf-demo-restaurant-order" className="view">
                <div>
                    <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                    <div className="view-title">
                        <div className="label">Order <span>{order.id}</span></div>
                    </div>
                    <div className="view-title view-title-status">
                        <div className="label">Status: <span>{getStatus(order)}</span></div>
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        restaurantOrders: state.restaurantOrders
    }
}

export default connect(mapStateToProps)(RestaurantOrder)