const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");
const socketIo = require('socket.io');
require('dotenv').config();

const connectDB = require('./models/database');
const { router, io } = require('./routes/auth');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);

const server = http.createServer(app);
io.attach(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Additional socket.io logic can be added here
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });


app.listen(process.env.PORT);

