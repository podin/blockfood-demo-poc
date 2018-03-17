const uuidv1 = require('uuid/v1')

const database = {}

module.exports = function (app) {

    app.get('/api/:demoId/step', function (req, res) {
        const {demoId} = req.params

        const db = database[demoId]

        if (!db) {
            res.sendStatus(403)
        }
        else {
            res.send('0')
        }
    })

    app.post('/api/start-demo', function (req, res) {
        const uuid = uuidv1()

        database[uuid] = {}

        res.send(uuid)
    })

}