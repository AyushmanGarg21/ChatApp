import React from "react";

const Background = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        muted={true}
        className="background-icon"
        alt="BackgroundImage"
        src=".\images\back-video.mp4"
      />
    </div>
  )
};

export default Background;