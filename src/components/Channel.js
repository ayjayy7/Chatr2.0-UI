import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel, sendMessage } from "../redux/actions";
import { Redirect } from "react-router-dom";

//////////////////
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class Channel extends React.Component {
  state = {
    message: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    ////////////////////////////////////
  };
  addEmoji = e => {
    // let emoji = e.native;
    // this.setState({
    //   text: this.state.text + emoji
    // })
    this.setState({ message: this.state.message + ` ${e.native}` });
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
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined)
        this.props.fetchChannel(this.props.match.params.channelID);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchChannel(channelID);
    }
    if (this.props.match.params.channelID !== undefined) {
      if (
        this.props.match.params.channelID !== prevProps.match.params.channelID
      ) {
        this.props.fetchChannel(this.props.match.params.channelID);
      } else {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.props.fetchChannel(this.props.match.params.channelID);
        }, 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // onEmojiClick = (diversities, object);

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
          className="pic"
          style={{
            backgroundImage: `url("${ogChannel.image_url}")`
          }}
        >
          <ul style={{ listStyle: "none" }}>{messages}</ul>

          <div className="fixed-bottom">
            <form name="messageForm" onSubmit={this.submitHandler}>
              <div className=" col-12">
                <img src="data:image/png;base64,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" />
                <div className=" btn float-right pull-right">
                  <input
                    className=" btn btn-warning btn-block "
                    type="submit"
                    value="Send"
                  />
                </div>
                <textarea
                  className=" col-9 rounded-pill shadow  float-right pull-right"
                  name="message"
                  placeholder="Type your message"
                  onChange={this.changeHandler}
                  value={this.state.message}
                ></textarea>
                <span>{/* <Picker onSelect={this.addEmoji} /> */}</span>
              </div>
            </form>
          </div>
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
