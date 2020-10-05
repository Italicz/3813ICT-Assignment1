module.exports = function (app, db) {
  app.post('/api/addchat', function(req, res) {
    newChat = {
      "channel": req.body.channelName,
      "message": req.body.message,
      "user": req.body.username
    }
    const collection = db.collection('chats');
    collection.insertOne(newChat, (err, dbres) => {
      if(err) {
        throw err;
      }
      let num = dbres.insertedCount;
      res.send({num: num, err:null, ok: true})
    });
  });
}