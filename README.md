# Chat App with OpenAI Integration
This application allows users to log in, engage in text-based conversations with an AI, utilize text-to-speech for AI responses, use speech-to-text for sending messages via voice input, and a live camera feature. The communication between the server and client is established using socket.

## Features

1. **Login Functionality:**
   - Users can log in securely to the application.
   - past users can get there chat history.
   - user email and password and chat history is stored in mongodb cloud.
   - password is encrpted to store in mongodb. 

2. **Text-to-Speech (TTS):**
   - Users can input text messages.
   - The OpenAI API generates responses based on the input.
   - The system speaks out the AI-generated responses using text-to-speech functionality.
   - a live camera feature for an enhanced user experience

3. **Speech-to-Text (STT):**
   - Users can send messages using voice input.
   - The application recognizes the user's voice and converts it to text for sending messages.
   - user get response of text.


## Technology Stack

- **Frontend: React**
- **Backend: Node.js**
- **Database: mongoDb Cloud**
- **Communication: Socket.io**
- **AI Integration: OpenAI API**

  
