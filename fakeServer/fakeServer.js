const uuidv1 = require('uuid/v1')

const database = {}

module.exports = function (app) {

    app.post('/api/start-demo', function (req, res) {
        const uuid = uuidv1()

        database[uuid] = {}

        res.send(uuid)
    })

}