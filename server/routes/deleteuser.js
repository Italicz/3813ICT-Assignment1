const bodyParser = require("body-parser");
const cors = require('cors');
module.exports = function(app, path) {
    const fs = require("fs");
    app.use(bodyParser.json());
    app.use(cors());
    app.post('/api/deleteuser', function(req,res){
        
        var deleteUserObj;
        var deleteUsername = req.body.username;

        fs.readFile('./data/users.json', function(err,data) {
            if (err) throw err;

            deleteUserObj = JSON.parse(data);

            for(let i = 0; i < deleteUserObj.length; i++) {
                if(deleteUserObj[i].username == deleteUsername) {
                    delete deleteUserObj[i];
                    break;
                }
            }

            var deleteUserData = deleteUserObj.filter(j => Object.keys(j).length);
            var deletedData = JSON.stringify(deleteUserData);

            fs.writeFile('./data/users.json', deletedData, function(err, data) {
                if(err) throw err;
                res.send({'username': deleteUsername, 'success': true});
            });
        })
    })
}
