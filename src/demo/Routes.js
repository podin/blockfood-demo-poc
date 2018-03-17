export const CUSTOMER_ROUTES = 'customer'
export const RESTAURANT_ROUTES = 'restaurant'
export const COURIER_ROUTES = 'courier'

export const CUSTOMER_ADDRESS_ROUTE = `/:demoId/${CUSTOMER_ROUTES}-home/`
export const CUSTOMER_RESTAURANTS_ROUTE = `/:demoId/${CUSTOMER_ROUTES}-restaurants/`
export const CUSTOMER_RESTAURANT_ORDER_ROUTE = `/:demoId/${CUSTOMER_ROUTES}-restaurant/:restaurantId/`
export const CUSTOMER_PAYMENT_ROUTE = `/:demoId/${CUSTOMER_ROUTES}-payment/`

export const RESTAURANT_ORDERS_ROUTE = `/:demoId/${RESTAURANT_ROUTES}-orders/`

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

export const getRouteRestaurantOrders = (demoId) => {
    return RESTAURANT_ORDERS_ROUTE.replace(':demoId', demoId)
}