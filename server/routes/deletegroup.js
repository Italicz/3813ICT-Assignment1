module.exports = function (app, db, ObjectID) {
    app.post('/api/deletegroup', function(req, res){

        group = req.body;
        //Set group id using ObjectID
        var groupid = new ObjectID(group.id);
        //Access groups collection
        const collection = db.collection('groups');
        //Delete group using id
        collection.deleteOne({_id: groupid}, (err) => {
            if (err) {
                throw err;
            }
            collection.find({}).toArray((err, data) => {
                if (err) {
                    throw err;
                }
                res.send(data);
            });
        });
    });
};