import React from 'react'
import {connect} from 'react-redux'
import OrdersList from '../../../components/orders-list/OrdersList'

class CourierOrders extends React.Component {
    constructor(props) {
        super(props)

        this.onSelect = this.onSelect.bind(this)
    }

    onSelect() {
        console.log('selected!')
    }

    render() {
        const {orders} = this.props

        return (
            <div id="bf-demo-courier-orders" className="view">
                <OrdersList title="List of available orders" orders={orders} onSelect={this.onSelect}/>
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