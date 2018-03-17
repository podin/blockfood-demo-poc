import * as _ from 'lodash'
import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import RESTAURANTS from '../../../data/Restaurants'
import {getRouteCustomerRestaurants, getRouteCustomerPayment, getRouteCustomerAddress} from '../../../Routes'

import {setStep, setCurrentOrder} from '../../../state/Actions'

import './CustomerOrder.scss'

class CustomerOrder extends React.Component {
    constructor(props) {
        super(props)

        const {demoId, restaurantId} = this.props.match.params

        this.demoId = demoId
        this.restaurant = _.find(RESTAURANTS, ({id}) => id === restaurantId)

        this.state = {
            orderIds: [],
            price: 0
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onChoose = this.onChoose.bind(this)
        this.onValidate = this.onValidate.bind(this)
    }

    onGoBack() {
        this.props.history.push(getRouteCustomerRestaurants(this.demoId))
    }

    onChoose(event) {
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

        const newPrice = _.reduce(this.restaurant.menu, (total, menu) => {
            if (newOrderIds.includes(menu.id)) {
                total += menu.price
            }

            return total
        }, 0)

        this.setState({orderIds: newOrderIds, price: newPrice})
    }

    onValidate() {

        const {orderIds, price} = this.state

        if (orderIds.length > 0) {
            const currentOrder = {
                demoId: this.demoId,
                customerId: this.demoId,
                restaurantId: this.restaurant.id,
                orderIds,
                price
            }

            this.props.dispatch(setCurrentOrder(currentOrder))

            this.props.history.push(getRouteCustomerPayment(this.demoId))
        }
    }

    componentDidMount() {
        this.restaurant && this.props.dispatch(setStep(3))
    }

    render() {
        if (!this.restaurant) {
            return <Redirect to={getRouteCustomerAddress(this.demoId)}/>
        }
        else {
            const {orderIds, price} = this.state

            return (
                <div id="bf-demo-customer-order" className="view">
                    <div>
                        <div className="go-back" onClick={this.onGoBack}><i className="fas fa-arrow-left"/>Go back</div>
                        <div className="view-title">
                            <div className="label">Welcome to <span>{this.restaurant.name}</span>!</div>
                        </div>
                        <div className="list">
                            {this.restaurant.menu.map(menu => (
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
}

export default connect()(CustomerOrder)
