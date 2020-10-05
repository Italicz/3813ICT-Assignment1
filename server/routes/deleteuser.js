module.exports = function(app, db, ObjectID) {
    app.post('/api/deleteuser', function(req,res){
        
        user = req.body;
        //Set user id using ObjectID
        var userID = new ObjectID(user.id);
        //Access users collection
        const collection = db.collection('users');
        //Delete user with id
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
