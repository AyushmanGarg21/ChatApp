const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({ email : email, password: hashedPassword, messages: [{sender: "AI" , content: "Hello I am AI. How can i help you today?"}]});
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
// router.post('/sendMessage', async (req, res) => {
//     const { email, content } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         user.messages.push({ sender: 'USER', content });
//         const response = await generateAIResponse(content);
//         user.messages.push({ sender: 'AI', content: response });
//         await user.save();

//         io.emit('newMessage', { user, message: user.messages[user.messages.length - 1] });

//         res.status(200).json({ message: 'Chat history updated successfully', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });


module.exports = { router };