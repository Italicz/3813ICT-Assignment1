module.exports = function (app, db) {
    app.post('/api/addusertochannel', function(req, res){
        //Connect to channels collection
        const collection = db.collection('channels');
        //Find channel name and its users
        collection.find({name: req.body.name, users: req.body.username}).count((err, count) => {
            if (err) {
                throw err;
            }
            if (count == 0) {
              //Update channel with new user
                collection.updateOne({"name": req.body.name}, {$push: {"Users": req.body.username}}, () => {
                    console.log(req.body.name, req.body.username);
                    res.send({ok:true});
                })
            } else {
                res.send({ok:false});
            }
        })
    });
}