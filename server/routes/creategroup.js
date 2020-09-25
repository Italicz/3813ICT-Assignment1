const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function (app, db) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/creategroup', function (req, res) {

        var groupName = req.body.groupName;

        let newGroup = {
            'groupName': groupName,
            'GAssis': [],
            'GAdmin': [],
            'Users': [],
            'Channels': []
        }

        const collection = db.collection('groups');
        collection.find({ 'groupName': groupName }).count((err, count) => {
            if (count == 0) {
                collection.insertOne(newGroup, (err, dbres) => {
                    if (err) {
                        throw err;
                    }
                    let num = dbres.insertedCount;
                    res.send({ num: num, err: null, ok: true })
                });
            } else {
                res.send({ ok: false });
            }
        })
    });
}
