import React from "react";

const Messages = props => {
  return (
    <li>
      <div className=" ">
        <small className="card-body text-danger">
          <h5 id="besh2">{props.messageObject.username}</h5>
          <span className=" m-5 text-left"></span>
        </small>
        <br />
        <h4
          className="speech-bubble text-left card-text text-white d-inline-block  my-2  border-radius: 25px;"
          id="besh"
        >
          {props.messageObject.message}
        </h4>
        <p class="card-text"></p>
      </div>
    </li>
  );
};
export default Messages;
