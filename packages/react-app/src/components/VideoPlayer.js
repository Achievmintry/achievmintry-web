import React, { useState } from "react";
import ReactPlayer from "react-player";

export const VideoPlayer = ({ url }) => {
  return (
    <>
      <ReactPlayer url={url} style={{ margin: "0 auto" }} />
    </>
  );
};
