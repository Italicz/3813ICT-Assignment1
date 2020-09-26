module.exports = function (app, db, ObjectID) {
    app.post('/api/deletegroup', function(req, res){

        group = req.body;

        var groupid = new ObjectID(group.id);
        const collection = db.collection('groups');
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