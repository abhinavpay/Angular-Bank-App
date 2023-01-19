//server - mongodb integration

//1 import mongoose

const mongoose = require('mongoose')

//2 state connection string in via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',{

    useNewUrlParser:true  //avoid unwanted warnings



})


// 3 define bank model

const User = mongoose.model('User',{ //model creation -User

    //schema creation

    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]

})


//4 export

module.exports={
    User
}


//5 import db.js in dataservice


