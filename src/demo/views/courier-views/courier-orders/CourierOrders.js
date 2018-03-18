import React from 'react'
import {connect} from 'react-redux'
import {COURIER_PREFIX, getRouteCourierOrder} from '../../../Routes'
import OrdersList from '../../../components/orders-list/OrdersList'

class CourierOrders extends React.Component {
    constructor(props) {
        super(props)

        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(event) {
        const {demoId} = this.props.match.params

        let target = event.target, orderId
        while (!orderId) {
            orderId = target.getAttribute('data-id')
            if (!orderId) {
                target = target.parentElement
            }
        }

        this.props.history.replace(getRouteCourierOrder(demoId, orderId))
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
        orders: state.orders[COURIER_PREFIX]
    }
}

export default connect(mapStateToProps)(CourierOrders)