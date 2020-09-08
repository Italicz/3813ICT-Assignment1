const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function(app, path) {
    const fs = require("fs");
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deletegroup', function(req,res){

    var deleteGroupObj;
    var deleteGroupData = req.body.groupName;

    fs.readFile('./data/groups.json', function(err,data) {
        if (err) {
            throw err;
        } else {
            deleteGroupObj = JSON.parse(data);
            for (let i = 0; i < deleteGroupObj.length; i++) {
                if(deleteGroupObj[i].groupName == deleteGroupData) {
                    delete deleteGroupObj[i];
                    break
                }
            }

            var newDeleteGroupData = deleteGroupObj.filter(j => Object.keys(j).length);
            var newDeletedGroup = JSON.stringify(newDeleteGroupData);

            fs.writeFile('./data/groups.json', newDeletedGroup, function(err, data) {
                if(err) throw err;
                res.send({'groupName': deleteGroupData, 'success': true});
            })

        }
    })

    })
}
