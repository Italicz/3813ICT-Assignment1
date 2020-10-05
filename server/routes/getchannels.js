module.exports = function (app, db) {
    app.get('/api/getchannels', function(req, res){
      //Access channels collection
        const collection = db.collection('channels');
        //Find all channels
        collection.find({}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        })
    });
}