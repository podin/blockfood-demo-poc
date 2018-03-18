import * as _ from 'lodash'
import {matchPath} from 'react-router-dom'
import Api from './api/Api'
import {
    CUSTOMER_ROUTES, RESTAURANT_ROUTES, COURIER_ROUTES,
    CUSTOMER_ROUTES_LIST, RESTAURANT_ROUTES_LIST
} from './Routes'

const getRouteMatch = (props, path) => {
    return matchPath(props.location.pathname, {path, exact: true})
}

const getOrdersForRestaurant = (props, demoId) => {
    const routeIndex = _.findIndex(RESTAURANT_ROUTES_LIST, route => getRouteMatch(props, route))
    const {restaurantId} = getRouteMatch(props, RESTAURANT_ROUTES_LIST[routeIndex]).params

    return Api.getOrdersForRestaurant(demoId, restaurantId)
}

export default (props) => {
    const {pathname} = props.location

    if (pathname !== '/') {
        const demoId = pathname.split('/')[1]

        return Api.getStep(demoId)
            .then(step => {
                if (step === 0) {
                    const routeIndex = _.findIndex(CUSTOMER_ROUTES_LIST, route => getRouteMatch(props, route))
                    return Promise.resolve({step: routeIndex + 1, orders: []})
                }
                else if (step >= 5 && step <= 6) {
                    return getOrdersForRestaurant(props, demoId).then(orders => {
                        return Promise.resolve({step, orders})
                    })
                }
                else if (step >= 7 && step <= 9) {
                    return Api.getOrdersForCourier(demoId).then(orders => {
                        return Promise.resolve({step, orders})
                    })
                }
                else if (step === 10){
                    const type = _.find([CUSTOMER_ROUTES, RESTAURANT_ROUTES, COURIER_ROUTES], route => pathname.indexOf(route) !== -1)

                    if (type === CUSTOMER_ROUTES) {
                        return Api.getOrders(demoId).then(orders => {
                            return Promise.resolve({step, orders})
                        })
                    }
                    else if (type === RESTAURANT_ROUTES) {
                        return getOrdersForRestaurant(props, demoId).then(orders => {
                            return Promise.resolve({step, orders})
                        })
                    }
                    else if (type === COURIER_ROUTES) {
                        return Api.getOrdersForCourier(demoId).then(orders => {
                            return Promise.resolve({step, orders})
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
                return Promise.resolve({pathname: '/', step: 0, orders: []})
            })
    }
    else {
        return Promise.resolve({step: 0, orders: []})
    }
}