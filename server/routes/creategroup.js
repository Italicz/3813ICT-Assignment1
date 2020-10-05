const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function (app, db) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/creategroup', function (req, res) {

        var groupName = req.body.groupName;
        //New group object
        let newGroup = {
            'groupName': groupName,
            'GAssis': [],
            'GAdmin': [],
            'Users': [],
            'Channels': []
        }
        //Access groups collection
        const collection = db.collection('groups');
        //Find group by given name
        collection.find({ 'groupName': groupName }).count((err, count) => {
          //If group doesnt exist..
            if (count == 0) {
              //Create new group with group object
                collection.insertOne(newGroup, (err, dbres) => {
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
