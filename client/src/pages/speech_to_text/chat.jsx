import React, { useEffect, useRef, useState } from "react";
import "../../styles/SpeechToText.css";
import Header from "../../components/Header";
import { Button, Input } from "@mui/base";
import { Link } from "react-router-dom";
import BlueBubble from "../../components/blueBubble";
import WhiteBubble from "../../components/whiteBubble";

const SpeechToText = (props) => {
  const videoRef = useRef(null);

  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  let recognition = null;

  recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition
  recognition.lang = 'en-US'; // Set language
  recognition.continuous = true; // Continuous listening
  const startListening = () => {
    console.log('Speech recognition Entered...');

    recognition.onstart = () => {
      setListening(true);
      console.log('Speech recognition started...');
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[event.results.length - 1][0].transcript;
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      setListening(false);
      console.log('Speech recognition ended.');
    };

    recognition.start();
  };

  const stopListening = () => {
    console.log(transcript);
    console.log('Speech recognition Exit...');

    if (recognition) {
      recognition.stop();
      setListening(false);
      console.log('Speech recognition stopped.');
    }
    setTranscript("");
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
            <p>Mute</p>
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
            <div className="chats">
              <BlueBubble text={transcript}/>
              <WhiteBubble user='user1' text='text'/>
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