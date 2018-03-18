import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerRestaurants, getRouteCustomerPayment} from '../../../Routes'
import {RESTAURANT_BY_IDS} from '../../../data/Restaurants'

import {setStep, setOrderInProgress} from '../../../state/Actions'

import './CustomerOrder.scss'

class CustomerOrder extends React.Component {
    constructor(props) {
        super(props)

        const {orderInProgress} = this.props

        this.state = {
            orderIds: orderInProgress ? orderInProgress.orderIds : [],
            price: orderInProgress ? orderInProgress.price : 0
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onChoose = this.onChoose.bind(this)
        this.onValidate = this.onValidate.bind(this)
    }

    getRestaurant() {
        const {restaurantId} = this.props.match.params
        return RESTAURANT_BY_IDS[restaurantId]
    }

    onGoBack() {
        const {demoId} = this.props.match.params
        this.props.history.replace(getRouteCustomerRestaurants(demoId))
    }

    onChoose(event) {
        const restaurant = this.getRestaurant()
        const {orderIds} = this.state

        let target = event.target, menuId
        while (!menuId) {
            menuId = target.getAttribute('data-id')
            if (!menuId) {
                target = target.parentElement
            }
        }

        let newOrderIds
        if (orderIds.includes(menuId)) {
            newOrderIds = _.without(orderIds, menuId)
        }
        else {
            newOrderIds = [...orderIds, menuId]
        }

        const newPrice = _.reduce(restaurant.menu, (total, menu) => {
            if (newOrderIds.includes(menu.id)) {
                total += menu.price
            }

            return total
        }, 0)

        this.setState({orderIds: newOrderIds, price: newPrice})
    }

    onValidate() {
        const {demoId} = this.props.match.params
        const restaurant = this.getRestaurant()
        const {orderIds, price} = this.state

        if (orderIds.length > 0) {
            const orderInProgress = {
                customerId: demoId,
                restaurantId: restaurant.id,
                orderIds,
                price
            }

            this.props.dispatch(setStep(4))
            this.props.dispatch(setOrderInProgress(orderInProgress))
            this.props.history.replace(getRouteCustomerPayment(demoId))
        }
    }

    render() {
        const restaurant = this.getRestaurant()
        const {orderIds, price} = this.state

        return (
            <div id="bf-demo-customer-order" className="view">
                <div>
                    <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                    <div className="view-title">
                        <div className="label">Welcome to <span>{restaurant.name}</span>!</div>
                    </div>
                    <div className="list">
                        {restaurant.menu.map(menu => (
                            <div key={menu.id} data-id={menu.id}
                                 className={`item${orderIds.includes(menu.id) ? ' selected' : ''}`}
                                 onClick={this.onChoose}>
                                <i className="fas fa-check"/>
                                <div className="name">{menu.name} ({menu.price}$)</div>
                            </div>
                        ))}
                    </div>
                    <div className="validate">
                        <div>{price}$</div>
                        <button onClick={this.onValidate} disabled={orderIds.length === 0}>VALIDATE</button>
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

export default connect(mapStateToProps)(CustomerOrder)
