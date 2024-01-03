import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";

const ToggleButton = ({setPage}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(setPage) {
            navigate("/speechToText");
        }else{
            navigate("/textToSpeech");
        }
    }
    return (
        <div className="button-div">
        <Button className="chat-button" onClick={handleClick}>
            <img
              className="mute-button"
              alt="ChatButton"
              src={setPage?"./images/videologo.png":"./images/chaticon.png"}
            />
        </Button>
        {setPage? <p>Video</p> :<p> Chat</p>}
      </div>
    )
};

export default ToggleButton;