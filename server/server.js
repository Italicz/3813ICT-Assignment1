var express = require('express');
var app = express();
const server = require('./listen.js');
const http = require('http').Server(app);

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const PORT=3000;
var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const mongoURL = 'mongodb://localhost:27017';

MongoClient.connect(mongoURL, {poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    if (err) {
        return console.log(err)
    }
    const db = client.db('assignment2')
    require('./routes/auth.js')(app,db);
    require('./routes/createuser.js')(app,db);
    require('./routes/deleteuser.js')(app,db,ObjectID);
    require('./routes/creategroup.js')(app,db);
    require('./routes/deletegroup.js')(app,db,ObjectID);
    require('./routes/createchannel.js')(app,db);
    require('./routes/deletechannel.js')(app,db,ObjectID);
    require('./routes/addusertogroup.js')(app,db);
    require('./routes/deleteusergroup.js')(app,db);
    require('./routes/addusertochannel.js')(app,db);
    require('./routes/deleteuserchannel.js')(app,db);
    require('./routes/getusersgroups.js')(app,db);
    require('./routes/getusers.js')(app,db);
    require('./routes/getgroups.js')(app,db);
    require('./routes/getchannels.js')(app,db);
    server.listen(http, PORT);
})
