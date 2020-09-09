var express = require('express');
var app = express();
var path = require("path");

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist/assignment1'));
console.log(__dirname);

var http = require('http').Server(app);
var server = http.listen(3000, function(){
    console.log("Server listening on port: 3000");
});

require('./routes/auth.js')(app,path);
require('./routes/createuser.js')(app,path);
require('./routes/deleteuser.js')(app,path);
require('./routes/creategroup.js')(app,path);
require('./routes/deletegroup.js')(app,path);
require('./routes/createchannel.js')(app,path);
require('./routes/deletechannel.js')(app,path);
require('./routes/addusertogroup.js')(app,path);
require('./routes/deleteusergroup.js')(app,path);
require('./routes/addusertochannel.js')(app,path);
require('./routes/deleteuserchannel.js')(app,path);
require('./routes/getusersgroups.js')(app,path);
