module.exports = function (app, db) {
    const fs = require("fs");
    app.post('/api/auth', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        //User object
        var user = {};
        user.valid = false;
        user.id = 0;
        user.role = '';
        user.email = '';
        user.password = '';
        user.username = '';

        //Access the users collection
        const collection = db.collection('users');
        //Find user by username and password, if true send user, if false send false
        collection.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
            if (err) {
                throw err;
            }
            if (user) {
                console.log(user)
                user.ok = true;
                res.send(user)
            } else {
                res.send({ok: false})
            }
        })
    })
}