import {getCustomerRouteIndex} from './Routes'
import Api from './api/Api'

export default (demoId, pathname) => {
    if (demoId) {
        return Api.getStep()
            .then(step => {
                if (step === 0) {
                    const routeIndex = getCustomerRouteIndex(pathname)
                    return Promise.resolve({step: routeIndex + 1})
                }
                else {
                    return Api.getOrders().then(orders => {
                        return Promise.resolve({step, orders})
                    })
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