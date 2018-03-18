import * as _ from 'lodash'
import React from 'react'
import {withRouter, matchPath, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Routes from './Routes'
import {RESTAURANT_BY_IDS} from './data/Restaurants'

class ViewValidator extends React.Component {
    getRouteMatch(path) {
        return matchPath(this.props.location.pathname, {path, exact: true})
    }

    isValid() {
        const {step, orderInProgress, orders} = this.props

        if (this.getRouteMatch(Routes.CUSTOMER_ADDRESS_ROUTE)) {
            return (step === 10 || (step >= 1 && step <= 4))
        }
        else if (this.getRouteMatch(Routes.CUSTOMER_RESTAURANTS_ROUTE)) {
            return (step === 10 || (step >= 1 && step <= 4))
        }
        else if (this.getRouteMatch(Routes.CUSTOMER_ORDER_IN_PROGRESS_ROUTE)) {
            const {restaurantId} = this.getRouteMatch(Routes.CUSTOMER_ORDER_IN_PROGRESS_ROUTE).params
            return (step === 10 || (step >= 1 && step <= 4)) && !!RESTAURANT_BY_IDS[restaurantId]
        }
        else if (this.getRouteMatch(Routes.CUSTOMER_PAYMENT_ROUTE)) {
            return (step === 10 || (step >= 1 && step <= 4)) && !!orderInProgress
        }
        else if (this.getRouteMatch(Routes.RESTAURANT_ORDERS_ROUTE)) {
            const {restaurantId} = this.getRouteMatch(Routes.RESTAURANT_ORDERS_ROUTE).params
            return (step === 10 || (step >= 5 && step <= 6)) && !!RESTAURANT_BY_IDS[restaurantId]
        }
        else if (this.getRouteMatch(Routes.RESTAURANT_ORDER_ROUTE)) {
            const {restaurantId, orderId} = this.getRouteMatch(Routes.RESTAURANT_ORDER_ROUTE).params
            const orderExists = !!_.find(orders[Routes.RESTAURANT_PREFIX], ({id, details}) => id === orderId && details.restaurantId === restaurantId)
            return (step === 10 || (step >= 5 && step <= 6)) && orderExists
        }
        else if (this.getRouteMatch(Routes.COURIER_ORDERS_ROUTE)) {
            return (step === 10 || (step >= 7 && step <= 9))
        }
        else if (this.getRouteMatch(Routes.COURIER_ORDER_ROUTE)) {
            const {orderId} = this.getRouteMatch(Routes.COURIER_ORDER_ROUTE).params
            const orderExists = !!_.find(orders[Routes.COURIER_PREFIX], ({id, details}) => id === orderId)
            return (step === 10 || (step >= 7 && step <= 9)) && orderExists
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

export default withRouter(connect((state) => state)(ViewValidator))