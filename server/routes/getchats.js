module.exports = function (app, db) {
  app.post('/api/getchats', function(req, res) {
    const collection = db.collection('chats');
    collection.find({channel: req.body.channelName}).toArray((err, data) => {
      if (err) {
        throw err;
      }
      res.send(data);
    })
  })
}