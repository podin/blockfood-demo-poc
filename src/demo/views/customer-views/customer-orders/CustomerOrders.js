import React from 'react'
import {connect} from 'react-redux'
import {getRouteCustomerAddress} from '../../../Routes'
import OrdersList from '../../../components/orders-list/OrdersList'

import {setOrderInProgress} from '../../../state/Actions'

class CourierOrders extends React.Component {
    constructor(props) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
    }

    onGoBack() {
        this.props.history.replace(getRouteCustomerAddress())
    }

    componentDidMount() {
        this.props.orderInProgress && this.props.dispatch(setOrderInProgress(null))
    }

    render() {
        const {orders} = this.props

        const options = {
            showRestaurantName: true
        }

        return (
            <div id="bf-demo-customer-orders" className="view">
                <OrdersList title="List of orders" orders={orders} onGoBack={this.onGoBack} options={options}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        orderInProgress: state.orderInProgress
    }
}

export default connect(mapStateToProps)(CourierOrders)