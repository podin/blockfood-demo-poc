import * as _ from 'lodash'
import {matchPath} from 'react-router-dom'

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

export const getRouteCustomerAddress = (demoId) => {
    return CUSTOMER_ADDRESS_ROUTE.replace(':demoId', demoId)
}

export const getRouteCustomerRestaurants = (demoId) => {
    return CUSTOMER_RESTAURANTS_ROUTE.replace(':demoId', demoId)
}

export const getRouteCustomerOrder = (demoId, restaurantId) => {
    return CUSTOMER_ORDER_IN_PROGRESS_ROUTE.replace(':demoId', demoId).replace(':restaurantId', restaurantId)
}

export const getRouteCustomerPayment = (demoId) => {
    return CUSTOMER_PAYMENT_ROUTE.replace(':demoId', demoId)
}

export const getRouteCustomerOrders = (demoId) => {
    return CUSTOMER_ORDERS_ROUTE.replace(':demoId', demoId)
}

export const getRouteRestaurantOrders = (demoId, restaurantId) => {
    return RESTAURANT_ORDERS_ROUTE.replace(':demoId', demoId).replace(':restaurantId', restaurantId)
}

export const getRouteRestaurantOrder = (demoId, restaurantId, orderId) => {
    return RESTAURANT_ORDER_ROUTE.replace(':demoId', demoId).replace(':restaurantId', restaurantId).replace(':orderId', orderId)
}

export const getRouteCourierOrders = (demoId) => {
    return COURIER_ORDERS_ROUTE.replace(':demoId', demoId)
}

export const getRouteCourierOrder = (demoId, orderId) => {
    return COURIER_ORDER_ROUTE.replace(':demoId', demoId).replace(':orderId', orderId)
}

export const getDemoIdFromPathname = (pathname) => {
    const match = matchPath(pathname, {path: '/:demoId'})
    return match ? match.params.demoId : null
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