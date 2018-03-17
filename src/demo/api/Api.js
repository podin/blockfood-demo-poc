import Http from 'axios'

class Api {
    init(onError) {
        this.onError = onError
    }

    getStep(demoId) {
        return Http.get(`/api/${demoId}/step`).then(({data}) => +data)
    }

    startDemo() {
        return Http.post('/api/start-demo').then(({data}) => data).catch(this.onError)
    }

    createNewOrder(demoId, order) {
        return Http.post(`/api/${demoId}/order`, order).then(({data}) => data).catch(this.onError)
    }
}

export default new Api()