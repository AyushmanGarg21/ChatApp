import React from "react";
import { Button } from "@mui/base";

const Mic = ({Handle_listening,listening}) => {

    return (
        <div className="mute-btn button-div">
            <Button onClick={Handle_listening}>
              <img className="mute-button" alt="MuteButton" src=".\images\mike.png" />
            </Button>
            <p>{listening ? "Listening.." : "Mute"}</p>
        </div>
    )
};

export default Mic;