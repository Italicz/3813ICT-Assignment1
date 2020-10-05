module.exports = function (app, db) {
  app.post('/api/addchat', function(req, res) {
    //New chat object
    newChat = {
      "channel": req.body.channelName,
      "message": req.body.message,
      "user": req.body.username
    }
    //Connect to chats collection
    const collection = db.collection('chats');
    //Insert new chat object into collection
    collection.insertOne(newChat, (err, dbres) => {
      if(err) {
        throw err;
      }
      let num = dbres.insertedCount;
      //Send num
      res.send({num: num, err:null, ok: true})
    });
  });
}