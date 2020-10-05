 module.exports = function (app, db, ObjectID) {
    app.post('/api/deletechannel', function(req, res){

        channel = req.body;
        //Set channelID using ObjectID
        var channelID = new ObjectID(channel.id);
        //Access channels collection
        const collection = db.collection('channels');
        //Delete channel using id
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