const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const OpenAI = require('openai');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const Messages = require("./models/messageModel");

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
    path: "/api/socket.io",
    cors: {
      origin: true,
      credentials: true,
    },
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

global.onlineUsers = new Map();
onlineUsers.set(process.env.AI_ID, "ai");

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("join", (userId) => {
        console.log("user joined");
        onlineUsers.set(userId, socket.id);
        io.emit("onlineUsers", Array.from(global.onlineUsers.keys()));
        console.log(Array.from(global.onlineUsers.keys()));
    });
    socket.on("sendMessage", ({ to, from, text }) => {
        if(to === process.env.AI_ID){
            generateAIResponse(text).then( async (response) => {
                const data = await Messages.create({
                    message: { text: response },
                    users: [to, from],
                    sender: to,
                });
                if(data) socket.emit("getMessage",response);
            });
            return;
        }else{
            const receiverSocket = onlineUsers.get(to);
            if(!receiverSocket) return;
            socket.to(receiverSocket).emit("getMessage",text);
        }
    });

    socket.on("disconnect", () => {
        for (let [key, value] of onlineUsers.entries()) {
            if(value === socket.id){
                onlineUsers.delete(key);
                break;
            }
        }
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        console.log("user disconnected");
    });
});

async function generateAIResponse(input) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You will be provided with a block of text, and your task is to generate a human-like answer or reply for it within 50 words."
                },
                {
                    "role": "user",
                    "content": input
                }
            ],
            max_tokens: 50,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating AI response:', error);
        return 'Sorry, an error occurred while generating the AI response.';
    }
}




