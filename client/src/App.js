import React from "react";
import LoginPage from "./pages/main/loginpage";
import SpeechToText from "./pages/speech_to_text/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextToSpeech from './pages/text_to_speech/chat';

function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/speechToText" element={<SpeechToText/>}/>
              <Route path="/textToSpeech" element={<TextToSpeech/>}/>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
