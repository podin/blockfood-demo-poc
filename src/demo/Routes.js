import * as _ from 'lodash'
import {matchPath} from 'react-router-dom'
import Api from './api/Api'

export const CUSTOMER_PREFIX = 'customer-view'
export const RESTAURANT_PREFIX = 'restaurant-view'
export const COURIER_PREFIX = 'courier-view'

export const CUSTOMER_ADDRESS_ROUTE = `/:demoId/${CUSTOMER_PREFIX}/`
export const CUSTOMER_RESTAURANTS_ROUTE = `/:demoId/${CUSTOMER_PREFIX}/restaurants/`
export const CUSTOMER_ORDER_IN_PROGRESS_ROUTE = `/:demoId/${CUSTOMER_PREFIX}/order-in-progress/:restaurantId/`
export const CUSTOMER_PAYMENT_ROUTE = `/:demoId/${CUSTOMER_PREFIX}/payment/`
export const CUSTOMER_ORDERS_ROUTE = `/:demoId/${CUSTOMER_PREFIX}/orders/`

export const CUSTOMER_ROUTES_LIST = [
    CUSTOMER_ADDRESS_ROUTE,
    CUSTOMER_RESTAURANTS_ROUTE,
    CUSTOMER_ORDER_IN_PROGRESS_ROUTE,
    CUSTOMER_PAYMENT_ROUTE
]

export const RESTAURANT_ORDERS_ROUTE = `/:demoId/${RESTAURANT_PREFIX}/:restaurantId/`
export const RESTAURANT_ORDER_ROUTE = `/:demoId/${RESTAURANT_PREFIX}/:restaurantId/order/:orderId`

export const RESTAURANT_ROUTES_LIST = [
    RESTAURANT_ORDERS_ROUTE,
    RESTAURANT_ORDER_ROUTE
]

export const COURIER_ORDERS_ROUTE = `/:demoId/${COURIER_PREFIX}/`
export const COURIER_ORDER_ROUTE = `/:demoId/${COURIER_PREFIX}/order/:orderId`

const getRouteWithDemoId = (route) => {
    return route.replace(':demoId', Api.getDemoId())
}

export const getRouteCustomerAddress = () => {
    return getRouteWithDemoId(CUSTOMER_ADDRESS_ROUTE)
}

export const getRouteCustomerRestaurants = () => {
    return getRouteWithDemoId(CUSTOMER_RESTAURANTS_ROUTE)
}

export const getRouteCustomerOrderInProgress = (restaurantId) => {
    return getRouteWithDemoId(CUSTOMER_ORDER_IN_PROGRESS_ROUTE).replace(':restaurantId', restaurantId)
}

export const getRouteCustomerPayment = () => {
    return getRouteWithDemoId(CUSTOMER_PAYMENT_ROUTE)
}

export const getRouteCustomerOrders = () => {
    return getRouteWithDemoId(CUSTOMER_ORDERS_ROUTE)
}

export const getRouteRestaurantOrders = (restaurantId) => {
    return getRouteWithDemoId(RESTAURANT_ORDERS_ROUTE).replace(':restaurantId', restaurantId)
}

export const getRouteRestaurantOrder = (restaurantId, orderId) => {
    return getRouteWithDemoId(RESTAURANT_ORDER_ROUTE).replace(':restaurantId', restaurantId).replace(':orderId', orderId)
}

export const getRouteCourierOrders = () => {
    return getRouteWithDemoId(COURIER_ORDERS_ROUTE)
}

export const getRouteCourierOrder = (orderId) => {
    return getRouteWithDemoId(COURIER_ORDER_ROUTE).replace(':orderId', orderId)
}

export const getCustomerRouteIndex = (pathname) => {
    return _.findIndex(CUSTOMER_ROUTES_LIST, path => matchPath(pathname, {path, exact: true}))
}

export const getRestaurantIdFromPathname = (pathname) => {
    let restaurantId = null

    _.find(RESTAURANT_ROUTES_LIST, path => {
        const match = matchPath(pathname, {path})

        if (match) {
            restaurantId = match.params.restaurantId
            return true
        }
        else {
            return false
        }
    })

    return restaurantId
}