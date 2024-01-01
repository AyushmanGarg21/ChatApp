const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const OpenAI = require('openai');
const socketIo = require('socket.io');
require('dotenv').config();
const io = socketIo();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({ email, password: hashedPassword });
            res.status(200).json();
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: 'Invalid password' });
        }
        //io.emit('userLoggedIn', user);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for updating chat history and generating AI response
router.post('/sendMessage', async (req, res) => {
    const { email, content } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.messages.push({ sender: 'USER', content });
        const response = await generateAIResponse(content);
        user.messages.push({ sender: 'AI', content: response });
        await user.save();

        io.emit('newMessage', { user, message: user.messages[user.messages.length - 1] });

        res.status(200).json({ message: 'Chat history updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Listen for AI processing result
io.on('processMessage', async (data) => {
    const { email, content } = data;
    user.messages.push({ sender: 'USER', content });
    try {
        const response = await generateAIResponse(content);
        const user = await User.findOne({ email });

        // Update user's messages with AI response
        user.messages.push({ sender: 'AI', content: response });
        await user.save();

        // Emit the updated message to the user
        io.emit('newMessage', { user, message: user.messages[user.messages.length - 1] });
    } catch (error) {
        console.error(error);
    }
});

// Helper function to generate AI response
async function generateAIResponse(input) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You will be provided with a block of text, and your task is to generate a human-like answer or reply for it."
                },
                {
                    "role": "user",
                    "content": input
                }
            ],
            max_tokens: 64,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating AI response:', error);
        return 'Sorry, an error occurred while generating the AI response.';
    }
}

module.exports = { router, io };