import React from 'react'
import {getStatus, isDone} from '../../data/OrderStatus'
import {RESTAURANT_BY_IDS} from '../../data/Restaurants'

import './OrdersList.scss'

class OrdersList extends React.Component {
    render() {
        const {title, orders, onGoBack, onSelect} = this.props
        const options = this.props.options || {}

        return (
            <div className="orders-list">
                {onGoBack && (
                    <div className="go-back" onClick={onGoBack}>
                        <i className="fas fa-arrow-left"/>Go back
                    </div>
                )}
                <div className="view-title">
                    <div className="label">{title}</div>
                </div>
                <div className="list">
                    {orders.map(order => (
                        <div key={order.id} data-id={order.id}
                             className={`item${onSelect ? ' selectable' : ''}${!isDone(order) ? ' active' : ''}`}
                             onClick={onSelect ? onSelect : null}>
                            <div className="icon">
                                <i className="far fa-sticky-note"/>
                            </div>
                            <div className="properties">
                                <div className="id"><b>Id:</b> {order.id}</div>
                                {options.showRestaurantName && (
                                    <div className="restaurant">
                                        <b>Restaurant:</b> {RESTAURANT_BY_IDS[order.details.restaurantId].name}
                                    </div>
                                )}
                                <div className="status">
                                    <b>Status:</b> <br/> {getStatus(order)}
                                </div>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && <div className="empty">No orders found...</div>}
                </div>
            </div>
        )
    }
}

export default OrdersList