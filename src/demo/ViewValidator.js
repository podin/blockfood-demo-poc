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
        const {step, customerAddress, orderInProgress, orders} = this.props

        if (this.getRouteMatch(Routes.CUSTOMER_ADDRESS_ROUTE)) {
            return step >= 1 && step <= 4
        }
        else if (this.getRouteMatch(Routes.CUSTOMER_RESTAURANTS_ROUTE)) {
            return step >= 1 && step <= 4 && !!customerAddress
        }
        else if (this.getRouteMatch(Routes.CUSTOMER_RESTAURANT_ORDER_ROUTE)) {
            const {restaurantId} = this.getRouteMatch(Routes.CUSTOMER_RESTAURANT_ORDER_ROUTE).params
            return step >= 1 && step <= 4 && !!customerAddress && !!RESTAURANT_BY_IDS[restaurantId]
        }
        else if (this.getRouteMatch(Routes.CUSTOMER_PAYMENT_ROUTE)) {
            return step >= 1 && step <= 4 && !!customerAddress && !!orderInProgress
        }
        else if (this.getRouteMatch(Routes.RESTAURANT_ORDERS_ROUTE)) {
            const {restaurantId} = this.getRouteMatch(Routes.RESTAURANT_ORDERS_ROUTE).params
            return step >= 5 && step <= 6 && !!RESTAURANT_BY_IDS[restaurantId]
        }
        else if (this.getRouteMatch(Routes.RESTAURANT_ORDER_ROUTE)) {
            const {restaurantId, orderId} = this.getRouteMatch(Routes.RESTAURANT_ORDER_ROUTE).params
            const orderExists = !!_.find(orders, ({id, details}) => id === orderId && details.restaurantId === restaurantId)
            return step >= 5 && step <= 6 && orderExists
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

const mapStateToProps = (state) => state

export default withRouter(connect(mapStateToProps)(ViewValidator))