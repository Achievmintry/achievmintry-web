import React from "react";
import ReactPlayer from "react-player";

export const VideoPlayer = ({ url, mute, play }) => {
  return (
    <>
      <ReactPlayer
        url={url}
        style={{ margin: "0 auto" }}
        playing={play}
        loop={true}
        controls={false}
        muted={mute}
        volume={null}
      />
    </>
  );
};
