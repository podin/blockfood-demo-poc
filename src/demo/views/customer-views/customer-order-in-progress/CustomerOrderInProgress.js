import * as _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerRestaurants, getRouteCustomerPayment} from '../../../Routes'
import {RESTAURANT_BY_IDS} from '../../../data/Restaurants'

import {setStep, setOrderInProgress} from '../../../state/Actions'

import './CustomerOrderInProgress.scss'

class CustomerOrderInProgress extends React.Component {
    constructor(props) {
        super(props)

        const {orderInProgress} = this.props

        this.state = {
            itemIds: orderInProgress ? orderInProgress.itemIds : [],
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
        this.props.history.replace(getRouteCustomerRestaurants())
    }

    getOrderInProgress() {
        const restaurant = this.getRestaurant()
        const {itemIds, price} = this.state

        if (itemIds.length > 0) {
            return {
                restaurantId: restaurant.id,
                itemIds: itemIds,
                price
            }
        }
        else {
            return null
        }
    }

    onChoose(event) {
        const restaurant = this.getRestaurant()
        const {itemIds} = this.state

        let target = event.target, menuId
        while (!menuId) {
            menuId = target.getAttribute('data-id')
            if (!menuId) {
                target = target.parentElement
            }
        }

        let newOrderIds
        if (itemIds.includes(menuId)) {
            newOrderIds = _.without(itemIds, menuId)
        }
        else {
            newOrderIds = [...itemIds, menuId]
        }

        const newPrice = _.reduce(restaurant.menus, (total, menu) => {
            if (newOrderIds.includes(menu.id)) {
                total += menu.price
            }

            return total
        }, 0)

        this.setState({itemIds: newOrderIds, price: newPrice})
    }

    onValidate() {
        const orderInProgress = this.getOrderInProgress()

        if (orderInProgress) {
            this.props.dispatch(setStep(4))
            this.props.dispatch(setOrderInProgress(orderInProgress))
            this.props.history.replace(getRouteCustomerPayment())
        }
    }

    render() {
        const restaurant = this.getRestaurant()
        const {itemIds, price} = this.state

        return (
            <div id="bf-demo-customer-order-in-progress" className="view">
                <div>
                    <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                    <div className="view-title">
                        <div className="label">Welcome to <span>{restaurant.name}</span>!</div>
                    </div>
                    <div className="list">
                        {restaurant.menus.map(menu => (
                            <div key={menu.id} data-id={menu.id}
                                 className={`item${itemIds.includes(menu.id) ? ' selected' : ''}`}
                                 onClick={this.onChoose}>
                                <i className="fas fa-check"/>
                                <div className="name">{menu.name} ({menu.price}$)</div>
                            </div>
                        ))}
                    </div>
                    <div className="validate">
                        <div>{price}$</div>
                        <button onClick={this.onValidate} disabled={itemIds.length === 0}>VALIDATE</button>
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

export default connect(mapStateToProps)(CustomerOrderInProgress)
