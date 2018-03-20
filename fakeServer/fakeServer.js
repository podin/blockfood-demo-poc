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

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    app.get('/api/:demoId/step', function (req, res) {
        const {demoId} = req.params

        const orders = database[demoId]

        if (!orders) {
            res.sendStatus(403)
        }
        else if (orders.length === 0) {
            res.send('0')
        }
        else if (orders.length > 1) {
            res.send('10')
        }
        else {
            const step = _.findIndex(_.values(ORDER_STATUS), status => status === orders[0].status)
            res.send((step + 5) + '')
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

        const orders = database[demoId]

        if (!orders) {
            res.sendStatus(403)
        }
        else {
            const newOrder = {
                id: uuidv1(),
                status: ORDER_STATUS.WAITING_RESTAURANT_VALIDATION,
                details
            }

            const newOrders = database[demoId] = [...orders, newOrder]

            res.send(newOrders)
        }
    })

    app.put('/api/:demoId/order/:orderId', function (req, res) {
        const {demoId, orderId} = req.params

        const {status} = req.body
        const isStatusValid = _.values(ORDER_STATUS).indexOf(status) !== -1

        const orders = database[demoId]

        if (!orders || !isStatusValid) {
            res.sendStatus(403)
        }
        else {
            let orderFound = null
            const newOrders = _.map(orders, order => {
                if (order.id === orderId) {
                    orderFound = order
                    const newOrder = {}
                    _.assign(newOrder, order, {status})
                    return newOrder
                }
                else {
                    return order
                }
            })

            if (!orderFound) {
                res.sendStatus(403)
            }
            else {
                database[demoId] = newOrders
                res.send(newOrders)
            }
        }
    })

    app.get('/api/:demoId/orders', function (req, res) {
        const {demoId} = req.params
        const orders = database[demoId]

        if (!orders || orders.length === 0) {
            res.sendStatus(403)
        }
        else {
            res.send(orders)
        }
    })

}