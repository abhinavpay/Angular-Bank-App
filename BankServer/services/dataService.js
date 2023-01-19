
//import json webtoken
const jwt = require('jsonwebtoken')


//import db.js

const db = require("./db")


// userDetails={
//     1000:{acno:1000, username:'abhinav', password:1000, balance:1000,transaction:[]},
//     1001:{acno:1001, username:'manu', password:1001, balance:2000,transaction:[]},
//     1002:{acno:1002, username:'rahul', password:1002, balance:3000,transaction:[]},
//     1003:{acno:1003, username:'Ajay', password:1003, balance:4000,transaction:[]},
//   }



  const register = (acno, username, password)=>{
    

    return db.User.findOne({acno}).then( //asynchronous call

      user =>{
        if(user){
          return{
            status:false,
          statusCode:401,
          message:"user already registered"

          }
        }
    
        else{
          const newUser=new db.User({
            acno:acno,
          username:username,
          password:password,
          balance:0,
          transaction:[]
          })

          newUser.save() //to save data to mongodb

          return{
            status:true,
            statusCode:200,
            message:"register sucessfull"
          }
        }

      }

    )
  }

      //old condition before mongodb
  //   if(acno in userDetails){
  //     return {
  //       status:false,
  //       statusCode:401,
  //       message:"already exist"
  //     }
  //   }
  //   else{
  //     userDetails[acno]={
  //       acno:acno,
  //       username:username,
  //       password:password,
  //       balance:0,
  //       transaction:[]
  //     }
      
  //     return {
  //       status:true,
  //       statusCode:200,
  //       message:"register sucessfull"
  //     }
  //   }
  // }



  //login

  const login = (acno,password) => {

    return db.User.findOne({acno,password}).then(
      user =>{
        if(user){
          currentUser=user.username;
        currentAcno=acno
        //token generation

        const token = jwt.sign({currentAcno:acno},'secretkey')

        //secretkey will generate a number eg se125efE2ffEfr5b2b

        return{
          status:true,
          statusCode:200,
          message:"login successful",
          token:token,
          currentUser:user.username,
          currentAcno:acno
        }

        }
        else{
          return {
            status:false,
            statusCode:401,
            message:"invalid userdetails"
          }

        }
      }
    )
    
    }
  
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //       currentUser=userDetails[acno]['username'];
  //       currentAcno=acno
  //       //token generation

  //       const token = jwt.sign({currentAcno:acno},'secretkey')

  //       //secretkey will generate a number eg se125efE2ffEfr5b2b

  //       return {
  //         status:true,
  //         statusCode:200,
  //         message:"login successful;",
  //         token:token
  //       }
  //     }
  //     else{

  //       return {
  //         status:false,
  //         statusCode:401,
  //         message:"invalid password"
  //       }
  //     }
  //   }
  //   else{
  //     return {
  //       status:false,
  //       statusCode:401,
  //       message:"invalid userdetails"
  //     }
  //   }
  // 



  //deposit


  const deposit=(acno,password,amt)=>{

    var amount=parseInt(amt)
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          if(password==user.password){
            user.balance += amount;
            user.transaction.push({
              type:'Credit',
               amount
               
            })
             
            user.save();//save to mongodb

           
            return{
              status:true,
          statusCode:200,
          

          message:`${amount} is credited and balance is ${user.balance}`
            }
          }
          else{
            return{
              status:false,
          statusCode:401,
          message:"Invalid password"
            }
          }
        }
      }
    )
  }
    
    
    
  
  

  //   if(acno in userDetails){

  //     if(pswd == userDetails[acno]['password']){

  //       userDetails[acno]['balance'] +=amount;
  //       //
  //       userDetails[acno]['transaction'].push({
  //        //
  //         acno:acno,
  //         type:'credit',
  //         amount
  //       })
        
       

  //     }
  //     
  //     }

  //   }
   

  // }


  //withdraw



  const withdraw = (acno,password,amt)=>{

    var amount=parseInt(amt)

    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          if(password==user.password){
            user.balance -=amount;
            user.transaction.push({
              type:"Debit",
              amount
            })
            user.save();
            return {
              status:true,
              statusCode:200,
              message:`${amount} is debited and balance is ${user.balance}` 
            }

          }
          else{
      
            return {
              status:false,
              statusCode:401,
              message:"invalid userdetails"
            }
          }
          
        }
      }
    )
    if(acno in userDetails){

      if(pswd == userDetails[acno]['password']){
        if(userDetails[acno]['balance'] > amount){
          userDetails[acno]['balance'] -=amount;
          //
          userDetails[acno]['transaction'].push({
            //
            acno:acno,
            type:'debit',
            amount
          })
          
        
          
        }


      }
      else{
        
        return {
          status:false,
          statusCode:401,
          message:"invalid password"
        }
      }

    }
    

  }



  const getTransaction = (acno)=>{
    
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return {
            status:true,
            statusCode:200,
            transaction:user.transaction
          }

        }
        else{
          return{
            status:false,
            statusCode:401,
            message:"user not found"
          }
        }
      }
    )

   
  
  }



  //delete acc

  const deleteAcc = (acno) =>{


    return db.User.findOneAndDelete({acno}).then(
      user=>{
        if(user){
          return {
            status:true,
            statusCode:200,
            message:"user deleted successfully"
          }
        }

        else{
          return{
            status:false,
            statusCode:401,
            message:"user not found"
          }
        }
      }
    )


  }



//   for accessing file

  module.exports={

    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }











