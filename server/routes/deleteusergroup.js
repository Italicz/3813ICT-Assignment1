module.exports = function (app, db) {
    app.post('/api/deleteusergroup', function(req, res) {

        const collection = db.collection('groups');
        collection.find({users: req.body.username}).count((err, count) => {
            if (err) {
                throw err;
            }
            if (count == 0) {
                collection.updateOne({"groupName": req.body.group}, {$pull: {"Users": req.body.username}}, () => {
                    console.log(req.body.group, req.body.username);
                    res.send({ok:true});
                })
            } else {
                res.send({ok:false});
            }
        })
    })
}