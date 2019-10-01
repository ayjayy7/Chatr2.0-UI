import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel } from "../redux/actions";
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
    Text.value = "";
  };

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.props.fetchChannel(channelID);
  }
  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchChannel(channelID);
    }
    if (prevProps.channel !== this.props.channel) {
      const chat = document.getElementById("chat");
    }
  }

  render() {
    const channel = this.props.currentChannel;
    if (!!channel) {
      console.log("Im a channel", channel);
      let ogChannel = this.props.channels.find(
        channel => channel.id == this.props.match.params.channelID
      );
      const messages = channel.map(messageObject => (
        <Messages key={messageObject.id} messageObject={messageObject} />
      ));
      return (
        <div
          style={{
            backgroundImage: `url("${ogChannel.image_url}")`
          }}
        >
          {messages}
          <form name="messageForm" onSubmit={this.submitHandler} />
        </div>
      );
    } else {
      return <div> Chat Not Found </div>;
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
    fetchChannel: channelID => dispatch(fetchChannel(channelID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
