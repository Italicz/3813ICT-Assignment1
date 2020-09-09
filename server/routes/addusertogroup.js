const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/addusertogroup', function(req, res) {
        fs.readFile('./data/users.json', 'utf8', function(err, userData) {
            if(err) throw err;
            userList = JSON.parse(userData);
            let user = userList.find(use =>((use.username == req.body.username)));
            if(!user) {
                res.send({ok: false});
            } else {
                fs.readFile('./data/groups.json', 'utf8', function(err, data) {
                    if(err) throw err;
                    groups = JSON.parse(data);
                    let x = groups.find(group => ((group.groupName == req.body.group)));
                    if(!x) {
                        res.send({ok: false});
                    } else {
                        let exists = x.Users.includes(user.username);
                        if (exists) {
                            res.send({ok: false});
                        } else {
                            x.Users.push(user.username);
                            groupsJSON = JSON.stringify(groups);
                            fs.writeFile('./data/groups.json', groupsJSON, 'utf8', function(err) {
                                if (err) throw err;
                            });
                            user.ok = true;
                            res.send(user);
                        }
                    }
                })
            }
        })
    })
}