const express = require('express') // API - Express is used to create the backend server and API routes
const cors = require('cors') // Different Address Data Sharing - Allows frontend and backend running on different ports to communicate
const mongoose = require('mongoose') // Backend - Database - Used to connect Node.js with MongoDB
const bcrypt = require('bcrypt') // Hash the sensitive data - Used to securely hash passwords

const app = express()

// Middleware
// Middleware functions run between the request and the response
app.use(cors()) // Enable CORS so frontend can communicate with backend
app.use(express.json()) // Convert JSON data from frontend into JavaScript object


// 1. BACKEND - DATABASE CONNECTION

// A. mongoose.connect('Database Address')
// Connect Node.js backend with MongoDB database

mongoose.connect("mongodb://localhost:27017/JuneUserAuth")

    .then(() => console.log("MongoDB Connected"))

    .catch((err) => console.log(err))


// B. Schema - Blueprint of Data which you want to store in the Database/Collection
// Schema defines what fields and data types a user will have

const UserSchema = new mongoose.Schema({

    // Key : Value Pair

    username: String,

    email: {
        type: String,
        unique: true // No two users can have the same email
    },

    password: String

})


// C. Collection - Model
// Model is used to create, read, update and delete data from the MongoDB collection

const User = mongoose.model('User', UserSchema)


// API - Route
// Frontend <----> Backend
// app.methodName('route', function)
// GET is generally used to get/read data
// POST is generally used to send/create data


app.get('/', (req, res) => {
    res.send('API Running')
})


// REGISTER
// POST request is used because we are sending user data to the backend

app.post('/register', async (req, res) => {

    // Get username, email and password sent by the frontend
    const { username, email, password } = req.body


    // Validation
    // Check whether all required fields are filled

    if (!username || !email || !password) {

        return res.json({
            message: 'All fields are required'
        })

    }


    // Check Existing User
    // Search MongoDB to see whether the email already exists

    const existingUser = await User.findOne({ email })


    if (existingUser) {

        return res.json({
            message: 'User Already Exists'
        })

    }


    // Hash Password
    // Password is converted into a secure hashed value before storing it
    // 10 = number of salt rounds

    const hashpassword = await bcrypt.hash(password, 10)


    // Save The Data in MongoDB Collection
    // Create a new User object with the received data

    const newUser = new User({

        username,
        email,
        password: hashpassword

    })


    // Store the Data
    // save() stores the new user inside MongoDB

    await newUser.save()


    // Send response back to frontend

    res.json({
        message: 'User Created Successfully'
    })

})


// LOGIN
// POST request is used because the user is sending email and password

app.post('/login', async (req, res) => {

    // Get email and password from frontend

    const { email, password } = req.body


    // 1. Find User
    // Search MongoDB using the email

    const user = await User.findOne({ email })


    // If no user is found

    if (!user) {

        return res.json({
            message: 'User Not Found - register again'
        })

    }


    // Compare Password
    // Compare the password entered by the user
    // with the hashed password stored in MongoDB

    const valid = await bcrypt.compare(password, user.password)


    // If password is correct

    if (valid) {

        res.json({
            message: 'Login Successful'
        })

    } else {

        // If password is incorrect

        res.json({
            message: 'Invalid Credentials'
        })

    }

})


// Start The Server
// Server will run on port 3000

app.listen(3000, () => {

    console.log('Server running http://localhost:3000')

})