const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function(app, path) {
    const fs = require("fs");
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/creategroup', function(req,res){

    var createGroupObj;
    var createGroupName = req.body.groupName;
    var groupCreated = 0;

    fs.readFile('./data/groups.json', function(err,data) {
        if (err) {
            throw err;
        } else {
            createGroupObj = JSON.parse(data);
            for (let i = 0; i < createGroupObj.length; i++) {
                if(createGroupObj[i].groupName == createGroupName) {
                    groupCreated = 1;
                }
            }

            if(groupCreated > 0) {
                res.send({'groupName': '', 'success': false});
            } else {
                createGroupObj.push({'groupName': createGroupName});
            }

            var newGroup = JSON.stringify(createGroupObj);
            fs.writeFile('./data/groups.json', newGroup, function(err) {
                if(err) throw err;
                res.send({'groupName': createGroupName, 'success': true});
            })

        }
    })

    })
}
