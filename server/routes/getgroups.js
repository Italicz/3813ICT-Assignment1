module.exports = function (app, db) {
    app.get('/api/getgroups', function(req, res){
      //Access groups collection
        const collection = db.collection('groups');
        //Find all groups in collection
        collection.find({}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        })
    });
}