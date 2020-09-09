const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deletechannel', function(req, res){

        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            if (err) throw err;
            groups = JSON.parse(data)

            let x = groups.find(group => ((group.groupName == req.body.group)));
            let index = x.Channels.findIndex(channel => ((channel.name == req.body.name)));
            console.log(index)
            if (index == -1) {
                res.send({ok: false})
            } else {
                x.Channels.splice(index, 1)
                groupsJSON = JSON.stringify(groups)
                fs.writeFile('./data/groups.json', groupsJSON, 'utf-8', function(err) {
                    if (err) throw err;
                
                });
                res.send({ok : true})
            }
        });
    });
}