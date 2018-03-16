import Http from 'axios'

class Api {
    init(onError) {
        this.onError = onError
    }

    startDemo() {
        return Http.post('/api/start-demo').then(({data}) => data).catch(this.onError)
    }
}

export default new Api()