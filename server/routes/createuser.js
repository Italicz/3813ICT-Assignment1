const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function(app, path) {
    const fs = require("fs");
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createuser', function(req,res){
        let newUser = {
            "id": "",
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "role": req.body.role,
        }
        fs.readFile('./data/users.json', function(err,data) {
            if (err) throw err;
            accounts = JSON.parse(data);

            let user = accounts.find(use => ((use.username == newUser.user)));
            if (user) {
                newUser.ok = false
                console.log("Error: User already exists");
            } else {
                newUser.id = accounts[accounts.length -1].id + 1;
                accounts.push(newUser);
                accountsJSON = JSON.stringify(accounts);

                fs.writeFile('./data/users.json', accountsJSON, function(err, data) {
                    if (err) throw err;
                });
                newUser.ok = true;

            }
            res.send(newUser);
        })
    })
}
