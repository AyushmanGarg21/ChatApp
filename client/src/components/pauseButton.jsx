import { Button } from "@mui/base";
import React, { useState } from "react";

const PauseButton = () => {

    const [pause,setPause] = useState(false);


    return (
        <div className="pause-button-div">
            <Button className="pause-box" onClick={()=>{setPause(!pause)}}>
              <img className="pause-btn" src={pause?"./images/Play.png":"./images/Pause.png"} alt="" />
              {pause?<p>Play</p>:<p>Pause</p>}
            </Button>
          </div>
    )
};

export default PauseButton;