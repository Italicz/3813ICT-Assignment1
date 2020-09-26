module.exports = function (app, db) {
    app.post('/api/addusertochannel', function(req, res){
        
        const collection = db.collection('channels');
        collection.find({name: req.body.name, users: req.body.username}).count((err, count) => {
            if (err) {
                throw err;
            }
            if (count == 0) {
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