const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const axios = require('axios');
const OpenAI = require('openai');
const socketIo = require('socket.io');

const io = socketIo();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user not found, create a new user
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hashedPassword });
      io.emit('newUser', user);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Send chat history for the user
    return res.status(200).json({ user, messages: user.messages });
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
    user.messages.push({ sender:'USER', content });
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

// Helper function to generate AI response
async function generateAIResponse(input) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You will be provided with a block of text, and your task is to generate a human like answer or reply for it."
            },
          {
            "role": "user",
            "content": input
          }
        ],
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1,
      });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Sorry, an error occurred while generating the AI response.';
  }
}
module.exports = { router, io };
