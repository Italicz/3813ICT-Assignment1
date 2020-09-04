module.exports = function(app, path){
    const fs  = require("fs");
    app.post('/api/auth', function(req,res) {
        
        //var u = req.body.username;
        //var p = req.body.password;
        //console.log(p);
        //let accounts = [
          //  {"id":0, "username":"James", "password":"abc123", "email": "james@angier.co.uk", "role":"SAdmin"},
            //{"id":1, "username":"David", "password":"123", "email": "david@angier.co.uk", "role":"GAdmin"},
            //{"id":2, "username":"Alison", "password":"123abc", "email": "alison@angier.co.uk", "role":"GAssis"},
            //{"id":3, "username":"Jye", "password":"cba", "email": "jye@jrobi.co", "role":"User"}
          //]
          if (!req.body) {
              return res.sendStatus(400)
          }
          var user = {};
          user.valid = false;
          user.id = 0;
          user.role = '';
          user.email = '';
          user.password = '';
          user.username = '';

        fs.readFile('./data/users.json', function read(err, data){
            if (err) {
                throw err;
            }
            accounts = JSON.parse(data);

            let user = accounts.find(use => ((use.username == req.body.username) && (use.password == req.body.password)));

            if (user) {
                user.ok = true;
                user.password = "";
                res.send(user);
                console.log(user);
            } else {
                res.send({"ok":false});
            }
        })
        /*
        })
        for (var i = 0; i < accounts.length; i++) {
            if (req.body.username == accounts[i].username && req.body.password == accounts[i].password) {
                user.valid = true;
                user.id = accounts[i].id;
                user.email = accounts[i].email;
                user.username = accounts[i].username;
                user.role = accounts[i].role;
            }
        }
        res.send(user);
        console.log(user);*/
    })
}