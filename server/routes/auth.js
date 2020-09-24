module.exports = function (app, db) {
    const fs = require("fs");
    app.post('/api/auth', function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        var user = {};
        user.valid = false;
        user.id = 0;
        user.role = '';
        user.email = '';
        user.password = '';
        user.username = '';

        const collection = db.collection('users');
        collection.find({username: req.body.username, password: req.body.password}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            if (data.length) {
                res.send({ok: false})
            } else {
                res.send(data)
            }
        })
    })
}