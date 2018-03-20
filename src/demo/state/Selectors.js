import * as _ from 'lodash'
import ORDER_STATUS from '../data/OrderStatus'

export const selectOrdersByRestaurantId = (orders, restaurantId) => {
    return _.filter(orders, order => order.details.restaurantId === restaurantId)
}

export const selectOrdersForCourier = (orders) => {
    return _.filter(orders, order => [
        ORDER_STATUS.WAITING_COURIER,
        ORDER_STATUS.PICKING,
        ORDER_STATUS.DELIVERING,
        ORDER_STATUS.DONE
    ].includes(order.status))
}