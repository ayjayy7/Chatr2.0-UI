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
    message: "",
    show: false
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    ////////////////////////////////////
  };
  addEmoji = e => {
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
                <div className=" btn float-right pull-right">
                  <img
                    id="ej"
                    src="https://cdn.shopify.com/s/files/1/1061/1924/files/Hugging_Face_Emoji_2028ce8b-c213-4d45-94aa-21e1a0842b4d_large.png?15202324258887420558"
                    onClick={() => this.setState({ show: !this.state.show })}
                  />
                  <span>
                    {this.state.show ? <Picker onSelect={this.addEmoji} /> : ""}
                  </span>
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
