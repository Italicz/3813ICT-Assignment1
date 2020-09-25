const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function(app, db) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createuser', function(req,res){
        let newUser = {
            "id": "",
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role,
        };

        const collection = db.collection('users');
        collection.find({'username':req.body.username}).count((err, count) => {
            if (count == 0) {
                collection.insertOne(newUser, (err, dbres) => {
                    if (err) {
                        throw err;
                    }
                    let num = dbres.insertedCount;
                    res.send({num: num, err: null, ok: true})
                });
            } else {
                res.send({ok: false});
            }
        }) ;
    })
}
