import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel, sendMessage } from "../redux/actions";
import { Redirect } from "react-router-dom";
class Channel extends React.Component {
  state = {
    message: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.sendMessage(
      this.props.match.params.channelID,
      this.state,
      this.props.user
    );
    let text = document.messageForm.message;
    console.log("that", text);
    text.value = "";
  };

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.props.fetchChannel(channelID);
  }
  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchChannel(channelID);

      //   if (prevProps.channel !== this.props.channel) {
      //     const chat = document.getElementById("chat");
      //}
    }
  }

  render() {
    const channel = this.props.currentChannel;
    if (!!channel) {
      let ogChannel = this.props.channels.find(
        channel => channel.id == this.props.match.params.channelID
      );
      const messages = channel.map(messageObject => (
        <Messages
          key={`${messageObject.message} ${messageObject.id} ${messageObject.timestamp}`}
          messageObject={messageObject}
        />
      ));
      return (
        <div
          style={{
            backgroundImage: `url("${ogChannel.image_url}")`
          }}
        >
          {messages}
          <form name="messageForm" onSubmit={this.submitHandler}>
            <div className="row" id="scroller">
              <div className="col-12">
                <textarea
                  name="message"
                  placeholder="Type your message"
                  onChange={this.changeHandler}
                ></textarea>
              </div>
              <div className="col-2" style={{ padding: 0 }}>
                <input className="btn btn-warning" type="submit" value="Send" />
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <div> Not Found </div>;
    }
  }
}
const mapStateToProps = state => ({
  user: state.user,
  currentChannel: state.channels.currentChannel,
  channels: state.channels.channels
});
const mapDispatchToProps = dispatch => {
  console.log("Called");
  return {
    fetchChannel: channelID => dispatch(fetchChannel(channelID)),
    sendMessage: (channelID, message, user) =>
      dispatch(sendMessage(channelID, message, user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
