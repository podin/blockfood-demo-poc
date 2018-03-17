import React from 'react'
import {withRouter, matchPath, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Routes from './Routes'
import {RESTAURANT_BY_IDS} from './data/Restaurants'

class ViewValidator extends React.Component {
    match(path) {
        return matchPath(this.props.location.pathname, {path, exact: true})
    }

    isValid() {
        const match = matchPath('/users/123', {
            path: '/users/:id',
            exact: true,
            strict: false
        })

        const {step, customerAddress, currentOrder} = this.props

        if (!match.isExact) {
            return true
        }
        else if (this.match(Routes.CUSTOMER_ADDRESS_ROUTE)) {
            return step >= 1 && step <= 4
        }
        else if (this.match(Routes.CUSTOMER_RESTAURANTS_ROUTE)) {
            return step >= 1 && step <= 4 && !!customerAddress
        }
        else if (this.match(Routes.CUSTOMER_RESTAURANT_ORDER_ROUTE)) {
            const {restaurantId} = this.match(Routes.CUSTOMER_RESTAURANT_ORDER_ROUTE).params
            return step >= 1 && step <= 4 && !!customerAddress && !!RESTAURANT_BY_IDS[restaurantId]
        }
        else if (this.match(Routes.CUSTOMER_PAYMENT_ROUTE)) {
            return step >= 1 && step <= 4 && !!customerAddress && !!currentOrder
        }
        else if (this.match(Routes.RESTAURANT_ORDERS_ROUTE)) {
            return step >= 5
        }
        else {
            return true
        }
    }

    render() {
        if (this.isValid()) {
            return this.props.children
        }
        else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.step,
        customerAddress: state.customerAddress,
        currentOrder: state.currentOrder
    }
}

export default withRouter(connect(mapStateToProps)(ViewValidator))