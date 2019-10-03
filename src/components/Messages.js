import React from "react";

const Messages = props => {
  return (
    <div className="card bg-transparent">
      <h4 className="card-header">
        {props.messageObject.username}
        <span className="text-right"></span>
      </h4>
      <div className="card-body">
        <h5 className="card-text">{props.messageObject.message}</h5>
        <p class="card-text"></p>
      </div>
    </div>
  );
};
export default Messages;
