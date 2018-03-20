import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteCourierOrders} from '../../../Routes'
import ORDER_STATUS, {getStatus, isDone} from '../../../data/OrderStatus'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'

import {selectOrdersForCourier} from '../../../state/Selectors'
import {setStep, setModal, setOrders} from '../../../state/Actions'

import './CourierOrder.scss'

class RestaurantOrder extends React.Component {
    constructor(props) {
        super(props)

        const order = this.getOrder()

        this.state = {
            loading: false,
            freeze: false,
            order
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    getOrder(props) {
        const {match, orders} = (props || this.props)
        const {orderId} = match.params
        return _.find(orders, ({id}) => id === orderId)
    }

    onGoBack() {
        if (!this.state.freeze) {
            const {demoId} = this.props.match.params
            this.props.history.replace(getRouteCourierOrders(demoId))
        }
    }

    onSubmit() {
        const {demoId} = this.props.match.params
        const {step} = this.props
        const {loading, order} = this.state

        if (!loading && !isDone(order)) {
            const newStatus = {
                [ORDER_STATUS.WAITING_COURIER]: ORDER_STATUS.PICKING,
                [ORDER_STATUS.PICKING]: ORDER_STATUS.DELIVERING,
                [ORDER_STATUS.DELIVERING]: ORDER_STATUS.DONE
            }[order.status]

            const onSuccess = (orders) => {
                this.setState({loading: false})
                this.props.dispatch(setOrders(orders))

                if (newStatus === ORDER_STATUS.PICKING || newStatus === ORDER_STATUS.DELIVERING) {
                    this.setState({freeze: false})
                    this.props.dispatch(setStep(step + 1))
                }
                else {
                    const onModalClose = () => {
                        this.setState({freeze: false})
                        this.props.dispatch(setStep(10))
                    }

                    setTimeout(() => this.props.dispatch(setModal(4, onModalClose)), 200)
                }
            }

            const onFreeModeSuccess = (orders) => {
                this.setState({loading: false, freeze: false})
                this.props.dispatch(setOrders(orders))
            }

            this.setState({loading: true, freeze: true})
            doWithMinTime(() => Api.updateOrderStatus(demoId, order.id, newStatus)).then(response => {
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
        const {loading, freeze, order} = this.state

        return (
            <div id="bf-demo-courier-order" className="view">
                <div>
                    <div className="content">
                        <div className={`go-back${freeze ? ' disabled' : ''}`} onClick={this.onGoBack}>
                            <i className="fas fa-arrow-left"/>Go back
                        </div>
                        <div className="view-title">
                            <div className="label">Id: <span>{order.id}</span></div>
                        </div>
                        <div className={`btn-remote-action${(loading || isDone(order)) ? ' not-a-btn' : ''}`} onClick={this.onSubmit}>
                            {isDone(order) ? (
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
                    <div className="map">
                        <i className="icon-restaurant"/>
                        <i className="icon-client"/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        orders: selectOrdersForCourier(state.orders)
    }
}

export default connect(mapStateToProps)(RestaurantOrder)