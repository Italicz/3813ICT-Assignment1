 module.exports = function (app, db, ObjectID) {
    app.post('/api/deletechannel', function(req, res){

        channel = req.body;

        var channelID = new ObjectID(channel.id);
        const collection = db.collection('channels');
        collection.deleteOne({_id: channelID}, (err, docs) => {
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

    });
}