const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/createchannel', function(req, res){
        console.log(req.body)

        let newChannel = {
            "name": req.body.name,
            "Users": [],
        }
        fs.readFile('./data/groups.json', 'utf8', function(err, data) {
            if (err) throw err;
            let groups = JSON.parse(data);
            let x = groups.find(group => ((group.groupName == req.body.group)));
            let exists = x.Channels.find(channel => ((channel.name == req.body.name)));
            if (exists) {
                res.send({ok: false})
            } else {
                x.Channels.push(newChannel);
                channelsJSON = JSON.stringify(groups)
                fs.writeFile('./data/groups.json', channelsJSON, 'utf-8', function(err) {
                    if (err) throw err;
                
                });
                newChannel.ok = true
                res.send(newChannel)
            }
        });
    });
}