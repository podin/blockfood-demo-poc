import Http from 'axios'

class Api {
    init(demoId, onError) {
        this.onError = onError

        this.demoId = demoId
    }

    getDemoId() {
        return this.demoId
    }

    startDemo() {
        return Http.post('/api/start-demo').then(({data: demoId}) => {
            this.demoId = demoId
        }).catch(this.onError)
    }

    getStep() {
        return Http.get(`/api/${this.demoId}/step`).then(({data: step}) => +step)
    }

    getOrders() {
        return Http.get(`/api/${this.demoId}/orders`).then(({data: orders}) => orders)
    }

    createNewOrder(order) {
        return Http.post(`/api/${this.demoId}/order`, order).then(({data: orders}) => orders).catch(this.onError)
    }

    updateOrderStatus(orderId, status) {
        return Http.put(`/api/${this.demoId}/order/${orderId}`, {status}).then(({data}) => data).catch(this.onError)
    }
}

export default new Api()