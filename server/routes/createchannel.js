const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function (app, db) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createchannel', function (req, res) {
        console.log(req.body)

        var groupName = req.body.group;
        var channelName = req.body.name;

        let newChannel = {
            "name": req.body.name,
            "group": req.body.group,
            "Users": [],
        }

        const collection = db.collection('channels');
        collection.find({ 'name': channelName }).count((err, count) => {
            if (count == 0) {
                collection.insertOne(newChannel, (err, dbres) => {
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