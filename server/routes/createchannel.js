const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function (app, db) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createchannel', function (req, res) {
        console.log(req.body)

        var groupName = req.body.group;
        var channelName = req.body.name;
        //New channel object
        let newChannel = {
            "name": req.body.name,
            "group": req.body.group,
            "Users": [],
        }
        //Access the channels collection
        const collection = db.collection('channels');
        //Find channel by given name
        collection.find({ 'name': channelName }).count((err, count) => {
          //If channel doesnt exist..
            if (count == 0) {
              //Create channel with channel object
                collection.insertOne(newChannel, (err, dbres) => {
                    if (err) {
                        throw err;
                    }
                    let num = dbres.insertedCount;
                    res.send({ num: num, err: null, ok: true })
                });
                //Else send false for error handling
            } else {
                res.send({ ok: false });
            }
        })
    });
}