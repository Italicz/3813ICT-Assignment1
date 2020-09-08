const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deletechannel', function(req, res){

        fs.readFile('./data/channels.json', 'utf8', function(err, data) {
            if (err) throw err;
            channels = JSON.parse(data)

            let index = channels.findIndex(channel => ((channel.name == req.body.name)));
            console.log(index)
            if (index == -1) {
                res.send({ok: false})
            } else {
                channels.splice(index, 1)
                channelsJSON = JSON.stringify(channels)
                fs.writeFile('./data/channels.json', channelsJSON, 'utf-8', function(err) {
                    if (err) throw err;
                
                });
                res.send({ok : true})
            }
        });
    });
}