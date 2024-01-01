import React, { useState } from "react";
import LoginPage from "./pages/main/loginpage";
import SpeechToText from "./pages/speech_to_text/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextToSpeech from './pages/text_to_speech/chat';

function App() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage setMessages = {setMessages} setSocket = {setSocket}/>}/>
              <Route path="/speechToText" element={<SpeechToText messages = {messages} setMessages = {setMessages} socket = {socket}/>}/>
              <Route path="/textToSpeech" element={<TextToSpeech messages = {messages} setMessages = {setMessages} socket = {socket}/>}/>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
