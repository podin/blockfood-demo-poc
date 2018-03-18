import React from 'react'
import {connect} from 'react-redux'
import ORDER_STATUS, {getStatus} from '../../../data/OrderStatus'

import './CourierOrders.scss'

class CourierOrders extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {orders} = this.props

        const isDone = order => order.status === ORDER_STATUS.DONE

        return (
            <div id="bf-demo-courier-orders" className="view">
                <div>
                    <div className="view-title">
                        <div className="label">List of available orders</div>
                    </div>
                    <div className="list">
                        {orders.map(order => (
                            <div key={order.id} data-id={order.id} className={`item${!isDone(order) ? ' active' : ''}`}>
                                <div className="icon">
                                    <i className="far fa-sticky-note"/>
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
        orders: state.orders
    }
}

export default connect(mapStateToProps)(CourierOrders)