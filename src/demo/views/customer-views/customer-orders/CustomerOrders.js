import React from 'react'
import {connect} from 'react-redux'
import {CUSTOMER_PREFIX, getRouteCustomerAddress} from '../../../Routes'
import OrdersList from '../../../components/orders-list/OrdersList'

class CourierOrders extends React.Component {
    constructor(props) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
    }

    onGoBack() {
        const {demoId} = this.props.match.params
        this.props.history.replace(getRouteCustomerAddress(demoId))
    }

    render() {
        const {orders} = this.props

        return (
            <div id="bf-demo-customer-orders" className="view">
                <OrdersList title="List of orders" orders={orders} onGoBack={this.onGoBack}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders[CUSTOMER_PREFIX]
    }
}

export default connect(mapStateToProps)(CourierOrders)