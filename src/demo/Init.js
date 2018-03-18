import * as _ from 'lodash'
import {getCustomerRouteIndex, getRestaurantIdFromPathname} from './Routes'
import Api from './api/Api'
import {CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX} from './Routes'

const getOrdersForRestaurant = (props, demoId) => {
    const restaurantId = getRestaurantIdFromPathname(props.location.pathname)
    return Api.getOrdersForRestaurant(demoId, restaurantId)
}

export default (props) => {
    const {pathname} = props.location

    if (pathname !== '/') {
        const demoId = pathname.split('/')[1]

        return Api.getStep(demoId)
            .then(step => {
                if (step === 0) {
                    const routeIndex = getCustomerRouteIndex(props.location.pathname)
                    return Promise.resolve({step: routeIndex + 1})
                }
                else if (step >= 5 && step <= 6) {
                    return getOrdersForRestaurant(props, demoId).then(orders => {
                        return Promise.resolve({step, orders, orderType: RESTAURANT_PREFIX})
                    })
                }
                else if (step >= 7 && step <= 9) {
                    return Api.getOrdersForCourier(demoId).then(orders => {
                        return Promise.resolve({step, orders, orderType: COURIER_PREFIX})
                    })
                }
                else if (step === 10){
                    const type = _.find([CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX], route => pathname.indexOf(route) !== -1)

                    if (type === CUSTOMER_PREFIX) {
                        return Api.getOrders(demoId).then(orders => {
                            return Promise.resolve({step, orders, orderType: CUSTOMER_PREFIX})
                        })
                    }
                    else if (type === RESTAURANT_PREFIX) {
                        return getOrdersForRestaurant(props, demoId).then(orders => {
                            return Promise.resolve({step, orders, orderType: RESTAURANT_PREFIX})
                        })
                    }
                    else if (type === COURIER_PREFIX) {
                        return Api.getOrdersForCourier(demoId).then(orders => {
                            return Promise.resolve({step, orders, orderType: COURIER_PREFIX})
                        })
                    }
                    else {
                        throw new Error()
                    }
                }
                else {
                    throw new Error()
                }
            })
            .catch((err) => {
                // TODO: redirect to the first non breaking step
                if (!err || !err.response || !err.response.status || err.response.status !== 403) {
                    console.error(err)
                }
                return Promise.resolve({pathname: '/'})
            })
    }
    else {
        return Promise.resolve({})
    }
}