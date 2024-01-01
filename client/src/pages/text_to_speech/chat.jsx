import React, { useEffect, useRef, useState  } from "react";
import "../../styles/TextToSpeech.css";
import Header from "../../components/Header";
import { Button, Input } from "@mui/base";
import { Link } from "react-router-dom";
import BlueBubble from "../../components/blueBubble";
import WhiteBubble from "../../components/whiteBubble";

const TextToSpeech = (props) => {
  const [text, setText] = useState("");
  const [sentText, setSentText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");
  const socket = props.socket;

  

  useEffect(() => {
    if (socket) {
      // Listen for initial messages
      socket.on("initialMessages", (data) => {
        const messages = data.messages;
        props.setMessages(messages);
      });

      // Listen for new messages
      socket.on("newMessage", (data) => {
        const user = data.user;
        const message = data.message;
        // Handle new messages received from the server
        console.log("New Message:", message);
        props.setMessages([...props.messages, message]);
      });
      
      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
    }
  }, [socket, props]);


  const handleSubmit = () => {
    setSentText(text);
    setTextToSpeak(text);
    setText("");
  };
  
  const speak = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      synth.cancel(); // Clear any existing utterances
      synth.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };
  
  useEffect(() => {
    if (textToSpeak !== '') {
      speak(); // Start speech synthesis when text is available
    }
  }, [textToSpeak]);


  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    }
  }, []);


  return (
    <div className="textToSpeech">
      <Header />
      <video
        autoPlay
        loop
        muted="false"
        className="background-icon"
        alt="BackgroundImage"
        src=".\images\back-video.mp4"
      />
      <div className="outer-box">
        <div className="big-box">
          <div className="inner-box" />
          <div className="chats">
          {props.messages.map((message) => (
             message.sender === 'AI'? <WhiteBubble user={"AI"} text={message.content}/>:<BlueBubble text={message.content}/>
          ))}
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
            <div className="small-video">
            <video className="video" ref={videoRef} autoPlay playsInline />
            </div>
            <div className="button-div">
              <Link to="/speechToText">
                <Button className="chat-button">
                  <img
                    className="mute-button"
                    alt="ChatButton"
                    src=".\images\video logo.png"
                  />
                </Button>
              </Link>
              <p>Video</p>
            </div>
          </div>
          <div className="pause-button-div">
            <Button className="pause-box">
              <img
                className="outer-circle"
                alt="ChatButton"
                src=".\images\Pause.png"
              />
              <img className="inner-circle" src=".\images\Pause.png" alt="" />
              <img className="pause-btn" src="./images/Pause.png" alt="" />
              <p>Pause</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;