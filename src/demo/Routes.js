export const CUSTOMER_ROUTES = 'customer-view'
export const RESTAURANT_ROUTES = 'restaurant-view'
export const COURIER_ROUTES = 'courier-view'

export const CUSTOMER_ADDRESS_ROUTE = `/:demoId/${CUSTOMER_ROUTES}/`
export const CUSTOMER_RESTAURANTS_ROUTE = `/:demoId/${CUSTOMER_ROUTES}/restaurants/`
export const CUSTOMER_RESTAURANT_ORDER_ROUTE = `/:demoId/${CUSTOMER_ROUTES}/restaurant/:restaurantId/`
export const CUSTOMER_PAYMENT_ROUTE = `/:demoId/${CUSTOMER_ROUTES}/payment/`

export const CUSTOMER_ROUTES_LIST = [
    CUSTOMER_ADDRESS_ROUTE,
    CUSTOMER_RESTAURANTS_ROUTE,
    CUSTOMER_RESTAURANT_ORDER_ROUTE,
    CUSTOMER_PAYMENT_ROUTE
]

export const RESTAURANT_ORDERS_ROUTE = `/:demoId/${RESTAURANT_ROUTES}/:restaurantId/`
export const RESTAURANT_ORDER_ROUTE = `/:demoId/${RESTAURANT_ROUTES}/:restaurantId/order/:orderId`

export const RESTAURANT_ROUTES_LIST = [
    RESTAURANT_ORDERS_ROUTE,
    RESTAURANT_ORDER_ROUTE
]

export const COURIER_ORDERS_ROUTE = `/:demoId/${COURIER_ROUTES}/`
export const COURIER_ORDER_ROUTE = `/:demoId/${COURIER_ROUTES}/order/:orderId`

export const getRouteCustomerAddress = (demoId) => {
    return CUSTOMER_ADDRESS_ROUTE.replace(':demoId', demoId)
}

export const getRouteCustomerRestaurants = (demoId) => {
    return CUSTOMER_RESTAURANTS_ROUTE.replace(':demoId', demoId)
}

export const getRouteCustomerOrder = (demoId, restaurantId) => {
    return CUSTOMER_RESTAURANT_ORDER_ROUTE.replace(':demoId', demoId).replace(':restaurantId', restaurantId)
}

export const getRouteCustomerPayment = (demoId) => {
    return CUSTOMER_PAYMENT_ROUTE.replace(':demoId', demoId)
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