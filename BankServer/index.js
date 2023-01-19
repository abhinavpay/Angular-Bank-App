//server creation


//1 import express

const express = require('express');


//import json webtoken(last class topic)
const jwt = require('jsonwebtoken')

//import cors (12-1-2023)

const cors = require('cors')



const req = require('express/lib/request');
const { json } = require('express/lib/response');
const res = require('express/lib/response');

const dataService = require('./services/dataService')


//2 create an app using express

const app = express()
app.use(express.json())


// cors (12-1-2023)

app.use(cors({
    origin:['http://localhost:4200','http://192.168.0.138:8080']
}))

//3 create a port number

app.listen(3000,()=>{
    console.log('listening on port 3000');
})


//application specific middleware

const appMiddleware = (req,res,next)=>{
    console.log('application specific middleware');
    next();

}

app.use(appMiddleware)


//router specific middleware

const jwtRouterMiddleware = (req,res,next)=>{

    try{
        console.log('router specific middleware');
        const token=req.headers['x-access-token']
        console.log(token)
        const data = jwt.verify(token,'secretkey')
        console.log(data)
        next()
    }
    //422 unprocessable entitiy
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"please login first"
        })
    }
    



}

// app.get('/',(req,res)=>{
//     res.send('Get http request')

// })

// app.post('/',(req,res)=>{
//     res.send('post http request')

// })

// app.put('/',(req,res)=>{
//     res.send('put http request')

// })

// app.patch('/',(req,res)=>{
//     res.send('patch http request')

// })

// app.delete('/',(req,res)=>{
//     res.send('delete http request')

// })



// api calls

//reesolving http request 

app.post('/register',(req,res)=>{

     dataService.register(req.body.acno,req.body.username,req.body.password).then(
        result =>{
            res.status(result.statusCode).json(result)
        }
     )
   

})


//login request

app.post('/login',(req,res)=>{

     dataService.login(req.body.acno,req.body.password).then(
        result =>{
            res.status(result.statusCode).json(result)
        }
     )
    

})

//deposit request

app.post('/deposit',jwtRouterMiddleware,(req,res)=>{

     dataService.deposit(req.body.acno,req.body.password,req.body.amount).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
     )
    


})


//withdraw request

app.post('/withdraw',jwtRouterMiddleware,(req,res)=>{

    dataService.withdraw(req.body.acno,req.body.password,req.body.amount).then(
        result=>{
            res.status(result.statusCode).json(result)

        }
    )
    

})


//transaction request

app.post('/transaction',jwtRouterMiddleware,(req,res)=>{

     dataService.getTransaction(req.body.acno).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
     )
   

})

//delete api

app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})


