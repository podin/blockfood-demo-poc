import React from 'react'
import {connect} from 'react-redux'
import {getRouteCourierOrder} from '../../../Routes'
import OrdersList from '../../../components/orders-list/OrdersList'

import {selectOrdersForCourier} from '../../../state/Selectors'

class CourierOrders extends React.Component {
    constructor(props) {
        super(props)

        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(event) {
        let target = event.target, orderId
        while (!orderId) {
            orderId = target.getAttribute('data-id')
            if (!orderId) {
                target = target.parentElement
            }
        }

        this.props.history.replace(getRouteCourierOrder(orderId))
    }

    render() {
        const {orders} = this.props

        const options = {
            showRestaurantName: true
        }

        return (
            <div id="bf-demo-courier-orders" className="view">
                <OrdersList title="List of available orders" orders={orders} onSelect={this.onSelect} options={options}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: selectOrdersForCourier(state.orders)
    }
}

export default connect(mapStateToProps)(CourierOrders)