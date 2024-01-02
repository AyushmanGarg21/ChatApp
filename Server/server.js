const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
const cors = require("cors");
const User = require('./models/User');
const OpenAI = require('openai');
const socketIo = require('socket.io');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const connectDB = require('./models/database');
const { router } = require('./routes/auth');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/auth', router);

const server = http.createServer(app);
const socketIoServer = socketIo(server,{
  path: "/api/socket.io",
  cors: {
    origin: true,
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

    socket.on('sendMessage', async (data) => {
        const { email, content } = data;
        try {
          const response = await generateAIResponse(content);
          const user = await User.findOne({ email });
          user.messages.push({ sender: 'USER', content : content });
          user.messages.push({ sender: 'AI', content: response });
          await user.save();
          socket.emit('newMessage', {messages: user.messages });
      } catch (error) {
          console.error(error);
      }
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

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        activeSockets = activeSockets.filter((id) => id !== socket.id);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('route error');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
