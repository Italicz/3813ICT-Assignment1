module.exports = function (app, db) {
    app.get('/api/getchannels', function(req, res){
        const collection = db.collection('channels');
        collection.find({}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        })
    });
}