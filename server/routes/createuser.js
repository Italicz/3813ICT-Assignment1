const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function(app, db) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createuser', function(req,res){
      //New user object
        let newUser = {
            "id": "",
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role,
        };
        //Access the users collection
        const collection = db.collection('users');
        //Find user by given username
        collection.find({'username':req.body.username}).count((err, count) => {
          //If user doesnt exist..
            if (count == 0) {
              //Create new user with user object
                collection.insertOne(newUser, (err, dbres) => {
                    if (err) {
                        throw err;
                    }
                    let num = dbres.insertedCount;
                    res.send({num: num, err: null, ok: true})
                });
                //Else send false for error handling
            } else {
                res.send({ok: false});
            }
        }) ;
    })
}
