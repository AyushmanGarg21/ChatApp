import React, { useEffect, useRef } from "react";
import "../../styles/SpeechToText.css";
import Header from "../../components/Header";
import { Button, Input } from "@mui/base";
import { Link } from "react-router-dom";
import BlueBubble from "../../components/blueBubble";
import WhiteBubble from "../../components/whiteBubble";

const SpeechToText = () => {
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
            <video className="video" ref={videoRef} autoPlay playsInline />
          </div>
          <div className="mute-btn button-div">
            <Button>
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
              <BlueBubble text='text'/>
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