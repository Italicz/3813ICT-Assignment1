module.exports = function(app, path){
    app.post('/api/auth', function(req,res) {
        //var u = req.body.username;
        //var p = req.body.password;
        //console.log(p);
        let accounts = [
            {"username":"James", "password":"abc123", "email": "james@angier.co.uk"},
            {"username":"David", "password":"123", "email": "david@angier.co.uk"},
            {"username":"Alison", "password":"123abc", "email": "alison@angier.co.uk"}
          ]
          if (!req.body) {
              return res.sendStatus(400)
          }
          var user = {};
          user.valid = false;
          user.email = '';
          user.password = '';
          user.username = '';

        for (var i = 0; i < accounts.length; i++) {
            if (req.body.username == accounts[i].username && req.body.password == accounts[i].password) {
                user.valid = true;
                user.email = accounts[i].email;
                user.username = accounts[i].username;
            }
        }
        res.send(user);
        console.log(user);
    })
}