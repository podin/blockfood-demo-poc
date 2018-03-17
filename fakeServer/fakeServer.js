const _ = require('lodash')
const uuidv1 = require('uuid/v1')
const bodyParser = require('body-parser')
const database = {}

const ORDER_STATUS = {WAITING_RESTAURANT_VALIDATION: 'WAITING_RESTAURANT_VALIDATION'}

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
        else {
            res.sendStatus(500)
        }
    })

    const getRestaurantOrders = (data, restaurantId) => {
        return _.filter(data, ({order}) => order.restaurantId === restaurantId)
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
        const order = req.body

        if (!database[demoId]) {
            res.sendStatus(403)
        }

        const uuid = uuidv1()

        const entry = {
            orderId: uuid,
            status: ORDER_STATUS.WAITING_RESTAURANT_VALIDATION,
            order: order
        }

        database[demoId].push(entry)

        res.send(getRestaurantOrders(database[demoId], order.restaurantId))
    })

}