const _ = require('lodash')
const uuidv1 = require('uuid/v1')
const bodyParser = require('body-parser')
const database = {}

const ORDER_STATUS = {
    WAITING_RESTAURANT_VALIDATION: 'WAITING_RESTAURANT_VALIDATION',
    COOKING: 'COOKING',
    WAITING_COURIER: 'WAITING_COURIER',
    PICKING: 'PICKING',
    DELIVERING: 'DELIVERING',
    DONE: 'DONE'
}

const getOrdersForRestaurant = (data, restaurantId) => {
    return _.filter(data, ({details}) => details.restaurantId === restaurantId)
}

const getOrdersForCourier = (data) => {
    return _.filter(data, ({status}) => [
        ORDER_STATUS.WAITING_COURIER,
        ORDER_STATUS.PICKING,
        ORDER_STATUS.DELIVERING,
        ORDER_STATUS.DONE
    ].indexOf(status) !== -1)
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
            res.send('10')
        }
        else {
            const step = _.findIndex(_.values(ORDER_STATUS), status => status === data[0].status)
            res.send((step + 5) + '')
        }
    })

    app.get('/api/:demoId/restaurant-orders/:restaurantId', function (req, res) {
        const {demoId, restaurantId} = req.params
        const data = database[demoId]

        if (!data) {
            res.sendStatus(403)
        }

        const restaurantOrders = getOrdersForRestaurant(data, restaurantId)

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

        res.send(getOrdersForRestaurant(database[demoId], details.restaurantId))
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

        const ordersForRestaurant = getOrdersForRestaurant(database[demoId], findOrder.details.restaurantId)
        const ordersForCourier = getOrdersForCourier(database[demoId])

        res.send({ordersForRestaurant, ordersForCourier})
    })

    app.get('/api/:demoId/courier-orders', function (req, res) {
        const {demoId} = req.params
        const data = database[demoId]

        if (!data) {
            res.sendStatus(403)
        }

        const courierOrders = getOrdersForCourier(data)

        if (courierOrders.length === 0) {
            res.sendStatus(403)
        }
        else {
            res.send(courierOrders)
        }
    })

}