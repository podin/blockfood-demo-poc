import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteCourierOrders} from '../../../Routes'
import ORDER_STATUS, {getStatus, isDone} from '../../../data/OrderStatus'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {setStep, setModal, setOrders} from '../../../state/Actions'

import './CourierOrder.scss'

class RestaurantOrder extends React.Component {
    constructor(props) {
        super(props)

        const order = this.getOrder()
        const _isDone = isDone(order)

        this.state = {
            loading: _isDone,
            success: _isDone,
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

    onGoBack() {
        if (!this.state.loading) {
            const {demoId} = this.props.match.params
            this.props.history.replace(getRouteCourierOrders(demoId))
        }
    }

    onSubmit() {
        const {demoId} = this.props.match.params
        const {loading, order} = this.state

        if (!loading && !isDone(order)) {
            const newStatus = {
                [ORDER_STATUS.WAITING_COURIER]: ORDER_STATUS.PICKING,
                [ORDER_STATUS.PICKING]: ORDER_STATUS.DELIVERING,
                [ORDER_STATUS.DELIVERING]: ORDER_STATUS.DONE
            }[order.status]

            const onSuccess = ({ordersForCourier}) => {
                this.props.dispatch(setOrders(ordersForCourier))

                if (newStatus === ORDER_STATUS.PICKING || newStatus === ORDER_STATUS.DELIVERING) {
                    this.setState({loading: false})
                    this.props.dispatch(setStep(this.props.step + 1))
                }
                else {
                    this.setState({success: true})

                    const onModalClose = () => {
                        this.props.dispatch(setStep(10))
                    }

                    setTimeout(() => this.props.dispatch(setModal(4, onModalClose)), 200)
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
            <div id="bf-demo-courier-order" className="view">
                <div>
                    <div className={`go-back${loading ? ' disabled' : ''}`} onClick={this.onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                    <div className="view-title">
                        <div className="label">Id: <span>{order.id}</span></div>
                    </div>
                    <div className={`btn-remote-action${loading ? ' loading' : ''}`} onClick={this.onSubmit}>
                        {success ? (
                            <i className="fas fa-check"/>
                        ) : loading ? (
                            <i className="fas fa-circle-notch fa-spin"/>
                        ) : order.status === ORDER_STATUS.WAITING_COURIER ? (
                            <i className="fas fa-check"/>
                        ) : order.status === ORDER_STATUS.PICKING ? (
                            <i className="fas fa-hand-rock"/>
                        ) : (
                            <i className="fas fa-flag-checkered"/>
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