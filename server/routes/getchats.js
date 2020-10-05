module.exports = function (app, db) {
  app.post('/api/getchats', function(req, res) {
    //Access chats collection
    const collection = db.collection('chats');
    //Find chats from channel name
    collection.find({channel: req.body.channelName}).toArray((err, data) => {
      if (err) {
        throw err;
      }
      res.send(data);
    })
  })
}