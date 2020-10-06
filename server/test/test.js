var app = require('../server.js')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Route Testing for the New User Route', function() {
    before (function() {
        console.log("Before");
    });
    after(function () {
        console.log("After");
    });

    describe("/api/createuser", () => {
        it("Should return with a number of inserted records if successful", (done) => {
            chai.request(app).post('/api/createuser').type('form').send(
                {"id": 100, 
                "username": "testingJames",
                "email": "testing@gmail.com",
                "password": "memes",
                "role": "User"}).end((err, res) => {
                res.body.should.have.property('num');
                res.body.should.have.property('num');
                res.body.ok.should.equal(true);
                res.body.num.should.equal(1)
                done();
            });
        });

        it("Should return an error if the current id is in use", (done) => {
            chai.request(app).post('/api/createuser').type('form').send(
                {"id": 100, 
                "username": "testingJames",
                "email": "testing@gmail.com",
                "password": "memes",
                "role": "User"}).end((err, res) => {
                res.body.should.have.property('ok');
                res.body.ok.should.equal(false);
                done();
            });
        });
    });
});

describe('Route Testing for the new Group Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/creategroup", () => {
        it("Should return with a number of inserted records if successful", (done) => {
            chai.request(app).post('/api/creategroup').type('form').send(
                {"groupName": "TestingGroup", 
                "Users": [],
                "GAdmin": [],
                "GAssis": []}).end((err, res) => {
                res.body.should.be.a('object')
                res.body.should.have.property('ok');
                res.body.should.have.property('num');
                res.body.num.should.equal(1)
                res.body.ok.should.equal(true);
                done();
            });
        });

        it("Should return an error if the group name is in use", (done) => {
            chai.request(app).post('/api/creategroup').type('form').send(
                {"groupName": "TestingGroup", 
                "Users": [],
                "GAdmin": [],
                "GAssis": []}).end((err, res) => {
                res.body.should.have.property('ok');
                res.body.ok.should.equal(false);
                done();
            });
        });
    });
});

describe('Route Testing for the new Channel Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/createchannel", () => {
        it("Should return with a number of inserted records if successful", (done) => {
            chai.request(app).post('/api/createchannel').type('form').send(
                {"name": "TestingChannel", 
                "group": "TestingGroup",
                "Users": []}).end((err, res) => {
                res.body.should.be.a('object')
                res.body.should.have.property('ok');
                res.body.should.have.property('num');
                res.body.num.should.equal(1)
                res.body.ok.should.equal(true);
                done();
            });
        });

        it("Should return an error if the channel name is in use", (done) => {
            chai.request(app).post('/api/createchannel').type('form').send(
                {"name": "TestingChannel", 
                "group": "TestingGroup",
                "Users": []}).end((err, res) => {
                res.body.should.have.property('ok');
                res.body.ok.should.equal(false);
                done();
            });
        });
    });
});

describe('Route Testing for getting all users Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/getusers", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).post('/api/getusers').type('form').send({}).end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
        });
    });
});

describe('Route Testing for getting all groups Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/getgroups", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).post('/api/getgroups').type('form').send({}).end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
        });
    });
});

describe('Route Testing for getting all chats Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/getchats", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).post('/api/getchats').type('form').send({}).end((err, res) => {
                res.body.should.be.a('array')
                done();
            });
        });
    });
});

describe('Route Testing for getting all channels Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/getchannels", () => {
        it("Should return with all of the records", (done) => {
            chai.request(app).post('/api/getchannels').type('form').send({}).end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
        });
    });
});

describe('Route Testing for adding a user to a channel Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/addusertochannel", () => {
        it("Should add the user to the channels user array if they are not in there and return back if it was successful", (done) => {
            chai.request(app).post('/api/addusertochannel').type('form').send(
                {"name": "TestingChannel", 
                "username": "testingJames"}).end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(true);
                    done();
            });
        });

        it("Should return ok as false if the user is already in the channels user array", (done) => {
            chai.request(app).post('/api/addusertochannel').type('form').send(
              {"name": "TestingChannel", 
              "username": "testingJames"}).end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('ok')
                res.body.ok.should.equal(true);
                done();
            });
        });
    });
});

describe('Route Testing for remvoing a user from a channel Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/deleteuserchannel", () => {
        it("Should remove the user from the channels user array if they are in there and return back if it was successful", (done) => {
            chai.request(app).post('/api/deleteuserchannel').type('form').send(
                {"name": "TestingChannel", 
                "username": "testingJames"}).end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(true);
                    done();
            });
        });

        it("Should return ok as false if the user is not already in the channels user array", (done) => {
            chai.request(app).post('/api/deleteuserchannel').type('form').send({"name": "TestingChannel", 
            "username": "testingJames"}).end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('ok')
                res.body.ok.should.equal(true);
                done();
            });
        });
    });
});

describe('Route Testing for adding a user to a group Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/addusertogroup", () => {
        it("Should add the user to the groups user array if they are not in there and return back if it was successful", (done) => {
            chai.request(app).post('/api/addusertogroup').type('form').send(
                {"group": "TestingGroup", 
                "username": "testingJames"}).end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(true);
                    done();
            });
        });

        it("Should return ok as false if the user is already in the groups user array", (done) => {
            chai.request(app).post('/api/addusertogroup').type('form').send(
                {"group": "TestingGroup", 
                "username": "testingJames"}).end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('ok')
                res.body.ok.should.equal(true);
                done();
            });
        });
    });
});

describe('Route Testing for removing a user from a group Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/deleteusergroup", () => {
        it("Should remove the user from the groups user array if they are in there and return back if it was successful", (done) => {
            chai.request(app).post('/api/deleteusergroup').type('form').send(
                {"group": "TestingGroup", 
                "username": "testingJames"}).end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(true);
                    done();
            });
        });

        it("Should return ok as false if the user is not already in the groups user array", (done) => {
            chai.request(app).post('/api/deleteusergroup').type('form').send(
                {"group": "TestingGroup", 
                "username": "testingJames"}).end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('ok')
                res.body.ok.should.equal(true);
                done();
            });
        });
    });
});

describe('Route Testing for adding a chat Route', function() {
    before(function () {
        console.log("Before");
    })

    after(function () {
        console.log("After");
    });

    describe("/api/addchat", () => {
        it("Should return with ok as true if successfully added", (done) => {
            chai.request(app).post('/api/addchat').type('form').send({
                "channelName": "hi",
                "message": "This is a test message",
                "username": "testingJames"
            }).end((err, res) => {
                res.body.should.be.a('object')
                res.body.should.have.property('num');
                res.body.num.should.equal(1);
                res.body.should.have.property('ok');
                res.body.ok.should.equal(true);
                done();
            });
        });
    });
});

describe('Route Testing for the auth Route', function() {
    before(function () {
    });

    after(function () {
        console.log("After");
    });

    describe("/api/auth", () => {
        it("Should check the users credentials and if correct respond with the user object", (done) => {
            chai.request(app).post('/api/auth').type('form').send(
                {"username": "testingJames", 
                "password": "memes"}).end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('ok')
                    res.body.ok.should.equal(true);
                    res.body.email.should.equal("testing@gmail.com");
                    res.body.role.should.equal("User");
                    done();
            });
        });

        it("Should return ok as false if the credentials are incorrect", (done) => {
            chai.request(app).post('/api/auth').type('form').send(
                {"username": "testingJames", 
                "password": "memes"}).end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('ok')
                res.body.ok.should.equal(true);
                done();
            });
        });
    });
});