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
    global.chatSocket = socket;
    socket.on("join", (userId) => {
        console.log("user joined", userId);
        onlineUsers.set(userId, socket.id);
        console.log(global.onlineUsers);
    });

    socket.on("sendMessage", ({ to, from, text }) => {
        console.log(`message sent ${to} ${from} ${text}`);
        const receiverSocket = onlineUsers.get(to);
        console.log(receiverSocket);
        socket.to(receiverSocket).emit("getMessage",text);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});





