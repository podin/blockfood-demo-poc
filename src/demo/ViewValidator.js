import React from 'react'
import {withRouter, matchPath, Redirect} from 'react-router-dom'
import * as Routes from './Routes'

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

        if (!match.isExact) {
            return true
        }
        else if (this.match(Routes.CUSTOMER_ADDRESS_ROUTE)) {
            return true
        }
        else if (this.match(Routes.CUSTOMER_RESTAURANTS_ROUTE)) {
            return true
        }
        else if (this.match(Routes.CUSTOMER_RESTAURANT_ORDER_ROUTE)) {
            return true
        }
        else if (this.match(Routes.CUSTOMER_PAYMENT_ROUTE)) {
            return true
        }
        else if (this.match(Routes.RESTAURANT_ORDERS_ROUTE)) {
            return true
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

export default withRouter(ViewValidator)