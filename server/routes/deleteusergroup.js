module.exports = function (app, db) {
    app.post('/api/deleteusergroup', function(req, res) {
        //Access groups collection
        const collection = db.collection('groups');
        //Find user in a group using username
        collection.find({users: req.body.username}).count((err, count) => {
            if (err) {
                throw err;
            }
            //If user exists..
            if (count == 0) {
              //Update group by removing user
                collection.updateOne({"groupName": req.body.group}, {$pull: {"Users": req.body.username}}, () => {
                    console.log(req.body.group, req.body.username);
                    res.send({ok:true});
                })
                //Else send false for error handling
            } else {
                res.send({ok:false});
            }
        })
    })
}