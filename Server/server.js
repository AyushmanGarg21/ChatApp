const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");
const socketIo = require('socket.io');
require('dotenv').config();


const connectDB = require('./models/database');


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);

connectDB();

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

/*
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  
    // Example event for handling incoming messages
    socket.on('sendMessage', (data) => {
      // Handle the incoming message (store in MongoDB, broadcast to other clients, etc.)
      console.log('Received message:', data);
      io.emit('newMessage', data); // Broadcast the message to all connected clients
    });
  });
*/
app.listen(process.env.PORT);

