import React from 'react'
import {connect} from 'react-redux'
import {RESTAURANT_BY_IDS} from '../../../data/Restaurants'

import './RestaurantOrders.scss'

const ORDER_STATUS = {
    WAITING_RESTAURANT_VALIDATION: 'WAITING_RESTAURANT_VALIDATION',
    COOKING: 'COOKING',
    WAITING_COURIER: 'WAITING_COURIER',
    DELIVERING: 'DELIVERING',
    DONE: 'DONE'
}

class RestaurantOrders extends React.Component {
    constructor(props) {
        super(props)

        const {demoId, restaurantId} = this.props.match.params

        this.demoId = demoId
        this.restaurant = RESTAURANT_BY_IDS[restaurantId]
    }

    render() {
        const {restaurantOrders} = this.props

        const isDone = order => order.status === ORDER_STATUS.DONE

        const getStatus = order => {
            return {
                [ORDER_STATUS.WAITING_RESTAURANT_VALIDATION]: 'Waiting restaurant validation',
                [ORDER_STATUS.COOKING]: 'In preparation',
                [ORDER_STATUS.WAITING_COURIER]: 'Waiting an available courier',
                [ORDER_STATUS.DELIVERING]: 'Delivering',
                [ORDER_STATUS.DONE]: 'Done'
            }[order.status]
        }
        
        return (
            <div id="bf-demo-restaurant-orders" className="view">
                <div>
                    <div className="view-title">
                        <div className="label">List of orders for the restaurant: <span>{this.restaurant.name}</span></div>
                    </div>
                    <div className="list">
                        {restaurantOrders.map(order => (
                            <div key={order.id} className={`item${!isDone(order) ? ' active' : ''}`}>
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