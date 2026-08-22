// Backend Rules To Write Code

//Step 1: Importing(To Get) All required modules Whtaever we want to use in our Backend Application
//express , mongoose , cors , dotenv , bcrypt , jsonwebtoken etc

//syntax : require('module-name') Method help us to import modules

const express = require('express')

//Step 2: create express application (function)

const app = express()   //Task - Build APi 

//Step 3 : define Routes - API Endpoint 
//API methods of communications - GET , POST , PUT , DELETE

//Get : Get The data from server/backend
//Post : Send the data to server
//Put : update The Existing Data
//delete : Completely Delete The data

//syntax - app.methodname('path/API Address',(req,res)=>{ })

//Home Backend - testing
app.get('/',(req,res)=>{
    res.send('API Running')
})

app.get('/login' , (req , res)=>{

    res.send('Fill The Form To Login/Good Evening User')

})

app.get('/signup' , (req , res)=>{

    res.send('Fill The Signup To Login/Good Evening User')

})

//Step 4: Start the Backend
//Port : Port is Like Address on internet which Acts like backend Address so that Frontend can communicate with Backend using port 

//we have different free port like 3000,8000,8080: we can use any of the ports Start our server

//Synatx : app.listen{portNumber , function-Conformation Messsage}

app.listen(3000,()=>{
    console.log('server Running on http://localhost:3000')
})