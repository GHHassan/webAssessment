// VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <iframe className='video-player'
        width="560"
        height="315"
        src={videoUrl}
        allowFullScreen
        title="Embedded YouTube Video"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
