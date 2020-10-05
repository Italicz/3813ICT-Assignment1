module.exports = function (app, db) {
    app.get('/api/getusers', function(req, res){
      //Access users collection
        const collection = db.collection('users');
        //Find all users
        collection.find({}).toArray((err, data) => {
            if (err) {
                throw err;
            }
            res.send(data);
        })
    });
}