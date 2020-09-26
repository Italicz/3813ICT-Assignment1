module.exports = function(app, db, ObjectID) {
    app.post('/api/deleteuser', function(req,res){
        
        user = req.body;

        var userID = new ObjectID(user.id);
        const collection = db.collection('users');
        collection.deleteOne({_id: userID}, (err, docs) => {
            if (err) {
                throw err;
            }
            collection.find({}).toArray((err, data) => {
                if (err) {
                    throw err;
                }
                res.send(data);
            })
        })
    })
}
