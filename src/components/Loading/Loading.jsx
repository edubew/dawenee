import React from "react";
import "./Loading.scss";

function Loading({ text = "Loading...", fullScreen = false }) {
  return (
    <div className={`loading ${fullScreen ? "loading--fullscreen" : ""}`}>
      <div className="loading__spinner"></div>
      <p className="loading__text">{text}</p>
    </div>
  );
}

export default Loading;
