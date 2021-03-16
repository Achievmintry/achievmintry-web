import React from "react";
import ReactPlayer from "react-player";

export const VideoPlayer = ({ url }) => {
  return (
    <>
      <ReactPlayer url={url} style={{ margin: "0 auto" }} playing={true} loop={true} />
    </>
  );
};
