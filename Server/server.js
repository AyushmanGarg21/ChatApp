const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");
const User = require('./models/User');
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

app.use('/auth', router);

const server = http.createServer(app);
const socketIoServer = socketIo(server,{
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});
let activeSockets = [];
socketIoServer.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    activeSockets.push(socket.id);
    socket.on('userLoggedIn', async ({email}) => {
        let user = await User.findOne({email});
        socket.emit('initialMessages', { messages: user.messages });
    });

    // Listen for user messages
    socket.on('sendMessage', (data) => {
        const { email, content } = data;
        // Additional logic if needed before saving the message

        // Emit message to AI for processing
        socketIoServer.emit('processMessage', { email, content });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        activeSockets = activeSockets.filter((id) => id !== socket.id);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('route error');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
