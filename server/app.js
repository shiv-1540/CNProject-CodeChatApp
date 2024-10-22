import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';  // Use import for mongoose
import bodyparser from 'body-parser';
import http from 'http';
import User from './models/userSchema.js';  // ESM uses full path with .js
import connectDB from './database.js';

const app = express();
const server = http.createServer(app);
//const bcrypt = require('bcryptjs');  // Use bcrypt for password hashing
const port = process.env.PORT || 3000;  // Use PORT from environment variables



app.use(cors({
     credentials: true
 }
));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();  // This will establish the connection


app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World</h1>');
});

// Registration route
app.post('/registration', async (req, res) => {
    const { Name,username, email, password} = req.body;

    // Validate email and password
    if (!email || !password || !Name ||!username) {
        return res.status(400).json({ message: 'Name, email, username and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
       // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            Name,
            username,
            email,
            password
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Registration successful', user: savedUser });
    } catch (err) {
        res.status(500).send(`Error occurred: ${err.message}`);
    }
});



// Sign-in route
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username: username });
         console.log("From sigIn:",user);
        // Check if user exists
        if (user) {
             // Compare the provided password with the stored hashed password
        //const isMatch = await bcrypt.compare(password, user.password);
        
        // If the password doesn't match
        if (password!==user.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If credentials are valid, return success response
        res.status(200).json({ message: 'Sign-in successful', userId: user._id });
    } 
    else{
        return res.status(401).json({ message: 'Invalid username or password' });
    }
   
    } catch (err) {
        res.status(500).send(`Error occurred: ${err.message}`);
    }
       

       
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
