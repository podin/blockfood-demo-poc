const _ = require('lodash')
const uuidv1 = require('uuid/v1')
const bodyParser = require('body-parser')
const database = {}

const ORDER_STATUS = {
    WAITING_RESTAURANT_VALIDATION: 'WAITING_RESTAURANT_VALIDATION',
    COOKING: 'COOKING',
    WAITING_COURIER: 'WAITING_COURIER',
    DELIVERING: 'DELIVERING',
    DONE: 'DONE'
}

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    app.get('/api/:demoId/step', function (req, res) {
        const {demoId} = req.params

        const data = database[demoId]

        if (!data) {
            res.sendStatus(403)
        }
        else if (data.length === 0) {
            res.send('0')
        }
        else if (data.length > 1) {
            res.send('14')
        }
        else if (data[0].status === ORDER_STATUS.WAITING_RESTAURANT_VALIDATION) {
            res.send('5')
        }
        else if (data[0].status === ORDER_STATUS.COOKING) {
            res.send('6')
        }
        else if (data[0].status === ORDER_STATUS.WAITING_COURIER) {
            res.send('7')
        }
        else {
            res.sendStatus(500)
        }
    })

    const getRestaurantOrders = (data, restaurantId) => {
        return _.filter(data, ({details}) => details.restaurantId === restaurantId)
    }

    app.get('/api/:demoId/restaurant-orders/:restaurantId', function (req, res) {
        const {demoId, restaurantId} = req.params
        const data = database[demoId]

        if (!data) {
            res.sendStatus(403)
        }

        const restaurantOrders = getRestaurantOrders(data, restaurantId)

        if (restaurantOrders.length === 0){
            res.sendStatus(403)
        }
        else {
            res.send(restaurantOrders)
        }
    })

    app.post('/api/start-demo', function (req, res) {
        const uuid = uuidv1()

        database[uuid] = []

        res.send(uuid)
    })

    app.post('/api/:demoId/order', function (req, res) {
        const {demoId} = req.params
        const details = req.body

        if (!database[demoId]) {
            res.sendStatus(403)
        }

        const uuid = uuidv1()

        const order = {
            id: uuid,
            status: ORDER_STATUS.WAITING_RESTAURANT_VALIDATION,
            details
        }

        database[demoId].push(order)

        res.send(getRestaurantOrders(database[demoId], details.restaurantId))
    })

    app.put('/api/:demoId/order/:orderId', function (req, res) {
        const {demoId, orderId} = req.params
        const {status} = req.body

        if (!database[demoId] || _.values(ORDER_STATUS).indexOf(status) === -1) {
            res.sendStatus(403)
        }

        let findOrder = null
        database[demoId] = _.map(database[demoId], order => {
            if (order.id === orderId) {
                findOrder = order
                const newOrder = {}
                _.assign(newOrder, order, {status})
                return newOrder
            }
            else {
                return order
            }
        })

        if (!findOrder) {
            res.sendStatus(403)
        }

        res.send(getRestaurantOrders(database[demoId], findOrder.details.restaurantId))
    })

}