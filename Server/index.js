var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser=require('body-parser');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var db_Connection = new Sequelize('socialmedia', 'root', 'root', {
    host: 'localhost',
	dialect: 'mysql'

})

db_Connection.authenticate().then(function(){
	console.log('connection established successfully');
}).catch(function(error){
	console.log(error);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var Users = db_Connection.define('user',{
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobileno: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    tableName:'Users',
    timestamps: true
});
var Login = db_Connection.define('login',{
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    tableName:'Login',
    timestamps: true
});


Users.sync().then(function(){

});
Login.sync().then(function(){

});
//middleware function
function encrypt(req, res, next)
{


    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.loginInfo.password, salt, function(err, hash) {
            // Store hash in your password DB.
            var hashedPassword=hash;
            req.body.loginInfo.password=hashedPassword;
            next();
        });
    });
}

app.post('/login', encrypt ,function(req,res){

    debugger
    Login.create(req.body.loginInfo).then(function(){
        res.json({
            "status": 200,
            "message":"user logged in successfully. ",
            "isSuccess":true
        })
    })
})
app.post('/users',function(req,res){
Users.create(req.body.userInfo).then(function(){
    res.json({
        "status": 200,
        "message":"user added successfully",
        "isSuccess":true
    })
})
})

app.get('/getusers/:userid',function(req,res)
{
    var id=req.params.userid;
    Users.findById(id).then(function(user){

        res.json({
            "status": 200,
            "message":"user added successfully",
            "isSuccess":true,
            "data":user
        })

    })
})

app.listen(8002, function(){
	console.log('Server started');
});