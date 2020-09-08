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
            "users": [],
        }
        fs.readFile('./data/channels.json', 'utf8', function(err, data) {
            if (err) throw err;
            let channels = JSON.parse(data);
            let exists = channels.find(channel => ((channel.name == req.body.name)));
            if (exists) {
                res.send({ok: false})
            } else {
                channels.push(newChannel);
                channelsJSON = JSON.stringify(channels)
                fs.writeFile('./data/channels.json', channelsJSON, 'utf-8', function(err) {
                    if (err) throw err;
                
                });
                newChannel.ok = true
                res.send(newChannel)
            }
        });
    });
}