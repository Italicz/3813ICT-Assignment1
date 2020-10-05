module.exports = function (app, db) {
    app.post('/api/addusertogroup', function(req, res) {
        //Connect to groups collection
        const collection = db.collection('groups');
        //Find user
        collection.find({users: req.body.username}).count((err, count) => {
            if (err) {
                throw err;
            }
            if (count == 0) {
              //Update group with new user
                collection.updateOne({"groupName": req.body.group}, {$push: {"Users": req.body.username}}, () => {
                    console.log(req.body.group, req.body.username);
                    res.send({ok:true});
                })
            } else {
                res.send({ok:false});
            }
        })
    })
}