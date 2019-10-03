import React from "react";

const Messages = props => {
  return (
    <li>
      <div className=" ">
        <small className="card-body text-danger">
          <b>
            <h5 className="text-white bold" id="besh2">
              {props.messageObject.username}
            </h5>
          </b>
          <span className=" m-5 text-left"></span>
        </small>
        <br />
        <h3 className="speech-bubble bg-danger text-left card-text text-white d-inline-block  my-2  border-radius: 25px;">
          {props.messageObject.message}
        </h3>
        <p class="card-text"></p>
      </div>
    </li>
  );
};
export default Messages;
