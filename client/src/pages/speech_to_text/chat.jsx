import React, { useEffect, useRef, useState } from "react";
import "../../styles/SpeechToText.css";
import Header from "../../components/Header";
import { Button, Input } from "@mui/base";
import { Link, useNavigate } from "react-router-dom";
import ChatBox from "../../components/chatbox";

const SpeechToText = (props) => {
  const videoRef = useRef(null);
  const socket = props.socket;
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  
  useEffect(() => {
    if (transcript) {
      socket.emit("sendMessage", {email: props.user, content: transcript})
      const newList = [...props.messages, { sender: "USER", content: transcript }];
      props.setMessages(newList);
    }
  }, [transcript]);

  useEffect(() => {
    if (socket===null) {
      navigate("/");
    }
  }, []);

  socket.on("newMessage", (data) => {
    const messages = data.messages;
    props.setMessages(messages);
  });

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
          <div className="big-video">
            <video className="video" ref={videoRef} autoPlay playsInline/>
          </div>
          <div className="mute-btn button-div">
            <Button onClick={listening ? stopListening : startListening}>
              <img className="mute-button" alt="MuteButton" src=".\images\mike.png" />
            </Button>
            <p>{listening ? "Listening" : "Mute"}</p>
          </div>
          <div className="button-div">
            <div className="volume ">
              <div className="volume-meter">
                <div className="fill-meter"></div>
              </div>

              <img className="volume-icon" alt="VolumeIcon" src="" />
            </div>
            <p>Volume</p>
          </div>
        </div>
        <div className="lower-box">
          <div className="text-box">
          <div className="chats" ref={chatContainerRef}>
            <ChatBox messages={props.messages} />
          </div>
            <div className="button-div">
              <Link to="/textToSpeech">
                <Button className="chat-button">
                  <img
                    className="mute-button"
                    alt="ChatButton"
                    src=".\images\chaticon.png"
                  />
                </Button>
              </Link>
              <p>Chat</p>
            </div>
          </div>
          <div className="pause-button-div">
            <Button className="pause-box">
              
              <img className="pause-btn" src=".\images\pause.png" alt="" />
          <p>Pause</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;