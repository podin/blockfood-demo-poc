import React from 'react'
import {connect} from 'react-redux'
import {getRouteRestaurantOrder} from '../../../Routes'
import {RESTAURANT_BY_IDS} from '../../../data/Restaurants'
import OrdersList from '../../../components/orders-list/OrdersList'

import {selectOrdersByRestaurantId} from '../../../state/Selectors'

class RestaurantOrders extends React.Component {
    constructor(props) {
        super(props)
        
        this.onSelect = this.onSelect.bind(this)
    }

    getRestaurant() {
        const {restaurantId} = this.props.match.params
        return RESTAURANT_BY_IDS[restaurantId]
    }

    onSelect(event) {
        const restaurant = this.getRestaurant()

        let target = event.target, orderId
        while (!orderId) {
            orderId = target.getAttribute('data-id')
            if (!orderId) {
                target = target.parentElement
            }
        }

        this.props.history.replace(getRouteRestaurantOrder(restaurant.id, orderId))
    }

    render() {
        const restaurant = this.getRestaurant()
        const {orders} = this.props

        const title = (
            <React.Fragment>
                List of orders for the restaurant: <span>{restaurant.name}</span>
            </React.Fragment>
        )

        return (
            <div id="bf-demo-restaurant-orders" className="view">
                <OrdersList title={title} orders={orders} onSelect={this.onSelect}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {restaurantId} = props.match.params

    return {
        orders: selectOrdersByRestaurantId(state.orders, restaurantId)
    }
}

export default connect(mapStateToProps)(RestaurantOrders)