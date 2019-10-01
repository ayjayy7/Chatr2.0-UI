import React from "react";
const Messages = props => {
  return (
    <div className="card">
      <h4 className="card-header">
        {props.messageObject.username}
        <span className="text-right"></span>
      </h4>
      <div
        className="card-body"
        style={{
          backgroundImage: `url(require(${props.messageObject.image_url}))`
        }}
      >
        <p className="card-text">{props.messageObject.message}</p>
      </div>
    </div>
  );
};
export default Messages;
