import React, { useEffect, useRef, useState  } from "react";
import "../../styles/TextToSpeech.css";
import Header from "../../components/Header";
import { Button ,Input } from "@mui/base";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../components/chatbox";
import Background from "../../components/background";
import PauseButton from "../../components/pauseButton";
import Video from "../../components/video";
import ToggleButton from "../../components/videoToChat";
import SpeakText from "./speakText";

const TextToSpeech = (props) => {
  const [text, setText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");
  const socket = props.socket;
  const navigate = useNavigate();

  if (socket) {
    socket.on("initialMessages", (data) => {
      const messages = data.messages;
      props.setMessages(messages);
    });

    socket.on("newMessage", (data) => {
      const messages = data.messages;
      props.setMessages(messages);
      setTextToSpeak(messages[messages.length-1].content);
    });
    
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  }

  const handleSubmit = () => {
    props.setMessages([...props.messages, {sender:"User",content:text}]);
    if (socket) { 
      socket.emit("sendMessage", {
        email: props.user,
        content: text
      });
    }
    setText("");
  };

  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    SpeakText(textToSpeak);
  }, [textToSpeak]);

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  useEffect(() => {
    if (!socket) {
      navigate("/");
    }
  }, [socket,navigate]);


  return (
    <div className="textToSpeech">
      <Header />
      <Background />
      <div className="outer-box">

        <div className="big-box">
          <div className="inner-box" />
          <div className="chats" ref={chatContainerRef}>
            <ChatBox messages={props.messages} />
          </div>
          <div className="text-input">
            <div className="text-area">
              <Input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <div className="icons">
              <Button>
                <img className="inner-icons" src=".\images\fileIcon.png" alt="" />
              </Button>

              <Button onClick={handleSubmit}>
                <img className="inner-icons" src=".\images\send.png" alt="" />
              </Button>
            </div>
          </div>
        </div>
        <div className="lower-box">
          <div className="text-box">
            <div className="small-video"><Video/></div>
            <ToggleButton setPage = {true}/>
          </div>
          <PauseButton/>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;