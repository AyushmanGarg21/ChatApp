const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");


require('dotenv').config();
const app = express();
const socket = require("socket.io");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const connectDB = require('./models/database');

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const server  = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join", (userId) => {
        console.log("user joined", userId);
        global.onlineUsers.set(userId, socket.id);
        console.log(global.onlineUsers);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log("message sent");
        const receiverSocket = global.onlineUsers.get(receiverId);
        io.to(receiverSocket).emit("getMessage", {
            senderId,
            text,
        });
    });
});





