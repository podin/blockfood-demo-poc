import React from 'react'
import {connect} from 'react-redux'
import {getRouteRestaurantOrder} from '../../../Routes'
import {RESTAURANT_BY_IDS} from '../../../data/Restaurants'
import ORDER_STATUS, {getStatus} from '../../../data/OrderStatus'

import './RestaurantOrders.scss'

class RestaurantOrders extends React.Component {
    constructor(props) {
        super(props)
        
        this.openOrder = this.openOrder.bind(this)
    }

    getRestaurant() {
        const {restaurantId} = this.props.match.params
        return RESTAURANT_BY_IDS[restaurantId]
    }

    openOrder(event) {
        const {demoId} = this.props.match.params
        const restaurant = this.getRestaurant()

        let target = event.target, orderId
        while (!orderId) {
            orderId = target.getAttribute('data-id')
            if (!orderId) {
                target = target.parentElement
            }
        }

        this.props.history.replace(getRouteRestaurantOrder(demoId, restaurant.id, orderId))
    }

    render() {
        const restaurant = this.getRestaurant()
        const {restaurantOrders} = this.props

        const isDone = order => order.status === ORDER_STATUS.DONE

        return (
            <div id="bf-demo-restaurant-orders" className="view">
                <div>
                    <div className="view-title">
                        <div className="label">List of orders for the restaurant: <span>{restaurant.name}</span></div>
                    </div>
                    <div className="list">
                        {restaurantOrders.map(order => (
                            <div key={order.id} data-id={order.id} className={`item${!isDone(order) ? ' active' : ''}`}
                                 onClick={this.openOrder}>
                                <div className="icon">
                                    <i className="fas fa-sticky-note"/>
                                </div>
                                <div className="properties">
                                    <div className="id"><b>Order id:</b> {order.id}</div>
                                    <div className="status">
                                        <b>Order status:</b> {getStatus(order)}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        restaurantOrders: state.restaurantOrders
    }
}

export default connect(mapStateToProps)(RestaurantOrders)