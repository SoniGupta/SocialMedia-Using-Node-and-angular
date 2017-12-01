var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser=require('body-parser');
var Sequelize = require('sequelize');

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
    timestamps: false
});

Users.sync().then(function(){
    console.log("success")
});

app.post('/users',function(req,res){
console.log("test",req.body.userInfo);
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
       // console.log(user);
        console.log("test----");
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