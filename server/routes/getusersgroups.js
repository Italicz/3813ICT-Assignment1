const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/getusersgroups', function(req, res){
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)
            usersGroups = groups.filter(group => group.Users.indexOf(req.body.username) !== -1);
            res.send(usersGroups);
        });
    });
}