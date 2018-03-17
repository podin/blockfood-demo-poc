const uuidv1 = require('uuid/v1')
const bodyParser = require('body-parser');
const database = {}

const ORDER_STATUS = {WAITING_RESTAURANT_VALIDATION: 'WAITING_RESTAURANT_VALIDATION'}

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    app.get('/api/:demoId/step', function (req, res) {
        const {demoId} = req.params

        const db = database[demoId]

        if (!db) {
            res.sendStatus(403)
        }
        else if (db.length === 0) {
            res.send('0')
        }
        else if (db.length > 1) {
            res.send('14')
        }
        else if (db[0].status === ORDER_STATUS.WAITING_RESTAURANT_VALIDATION) {
            res.send('5')
        }
        else {
            res.sendStatus(500)
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

        const uuid = uuidv1()

        const entry = {
            orderId: uuid,
            status: ORDER_STATUS.WAITING_RESTAURANT_VALIDATION,
            order: order
        }

        database[demoId].push(entry)

        res.send(entry)
    })

}