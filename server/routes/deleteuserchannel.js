module.exports = function (app, db) {
    app.post('/api/deleteuserchannel', function(req, res){
        //Access channel collection
        const collection = db.collection('channels');
        //Find user in a channel by username
        collection.find({name: req.body.name, users: req.body.username}).count((err, count) => {
            if (err) {
                throw err;
            }
            //If user exists in channel
            if (count == 0) {
              //Update channel by removing user from channel
                collection.updateOne({"name": req.body.name}, {$pull: {"Users": req.body.username}}, () => {
                    console.log(req.body.name, req.body.username);
                    res.send({ok:true});
                })
                //Else send false for error handling
            } else {
                res.send({ok:false});
            }
        })
    });
}