import React, { useEffect, useRef, useState } from "react";
import "../../styles/SpeechToText.css";
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import ChatBox from "../../components/chatbox";
import Background from "../../components/background";
import PauseButton from "../../components/pauseButton";
import Video from "../../components/video";
import ToggleButton from "../../components/videoToChat";
import Volume from "./volume";
import Mic from "./mic";

const SpeechToText = (props) => {
  const socket = props.socket;
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  
  useEffect(() => {
    if (transcript && socket) {
      socket.emit("sendMessage", {email: props.user, content: transcript})
      const newList = [...props.messages, { sender: "USER", content: transcript }];
      props.setMessages(newList);
      setListening(false);
    }
  }, [transcript]);

  useEffect(() => {
    if (!socket) {
      navigate("/");
    }
  }, []);

  const recognition = new window.webkitSpeechRecognition(); // SpeechRecognition API
  recognition.continous = true;
  recognition.onresult = (event) => {
    console.log("Start recognition")
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    setTranscript(text);
    console.log(text);
  };

  const startListening = () => {
    console.log("startListen")
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    console.log("stopListen")
    recognition.stop();
    setListening(false);
  };

  const Handle_listening = () => {
    if(listening){ 
      stopListening(); 
    }
    else{ 
      startListening(); 
    }
  };
  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <div className="chat">
      <Header />
      <Background />
      <div className="outer-box">
        <div className="big-box">
          <div className="inner-box" />
          <div className="big-video">
            <Video/>
          </div>
          <Mic Handle_listening = {Handle_listening} listening = {listening}/>
          <Volume/>
        </div>
        <div className="lower-box">
          <div className="text-box">
          <div className="chats" ref={chatContainerRef}>
            <ChatBox messages={props.messages} />
          </div>
            <ToggleButton setpage={false}/>
          </div>
         <PauseButton/>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;