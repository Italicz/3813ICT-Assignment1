module.exports = function (app, db) {
    app.get('/api/getgroups', function(req, res){
        const collection = db.collection('groups');
        collection.find({}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        })
    });
}