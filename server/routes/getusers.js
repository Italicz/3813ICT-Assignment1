module.exports = function (app, db) {
    app.get('/api/getusers', function(req, res){
        const collection = db.collection('users');
        collection.find({}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        })
    });
}