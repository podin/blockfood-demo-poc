import Http from 'axios'

class Api {
    init(onError) {
        this.onError = onError
    }

    startDemo() {
        return Http.post('/api/start-demo').then(({data}) => data).catch(this.onError)
    }

    getStep(demoId) {
        return Http.get(`/api/${demoId}/step`).then(({data}) => +data)
    }

    getOrders(demoId) {
        return Http.get(`/api/${demoId}/orders`).then(({data}) => data)
    }
    
    getOrdersForRestaurant(demoId, restaurantId) {
        return Http.get(`/api/${demoId}/restaurant-orders/${restaurantId}`).then(({data}) => data)
    }

    getOrdersForCourier(demoId) {
        return Http.get(`/api/${demoId}/courier-orders`).then(({data}) => data)
    }

    createNewOrder(demoId, order) {
        return Http.post(`/api/${demoId}/order`, order).then(({data}) => data).catch(this.onError)
    }

    updateOrderStatus(demoId, orderId, status) {
        return Http.put(`/api/${demoId}/order/${orderId}`, {status}).then(({data}) => data).catch(this.onError)
    }
}

export default new Api()