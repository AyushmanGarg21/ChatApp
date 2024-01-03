import React, { useState } from 'react';

const Volume = (props) => {
    const [volume, setVolume] = useState(50); // Initial volume value, adjust as needed

    const handleVolumeChange = (event) => {
        const boundingRect = event.currentTarget.getBoundingClientRect();
        const mouseY = event.clientY - boundingRect.top;
        const newVolume = Math.max(0, Math.min(100, ((boundingRect.height - mouseY) / boundingRect.height) * 100));
        setVolume(newVolume);
        // You can perform additional actions here, such as updating the system volume or other components
    };

    return (
        <div className="button-div">
            <div className="volume" onClick={handleVolumeChange}>
                <div className="volume-meter">
                    <div className="fill-meter" style={{ height: `${volume}%` }}></div>
                </div>

                <img className="volume-icon" alt="VolumeIcon" src=".\images\volume.png" />
            </div>
            <p>Volume</p>
        </div>
    );
}

export default Volume;
