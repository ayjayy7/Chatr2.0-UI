import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel, sendMessage } from "../redux/actions";
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
    this.interval = setInterval(
      () => {
        if (this.props.match.params.channelID !== undefined)
          this.props.fetchChannel(this.props.match.params.channelID);
      },
      1000
      // timeStamp
    );
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
            backgroundImage: `url(${ogChannel.image_url})`
          }}
        >
          {messages}
          <div className="col-12">
            <form name="messageForm" onSubmit={this.submitHandler}>
              <textarea
                className=" col-11 rounded-pill shadow"
                name="message"
                placeholder="Type your message"
                onChange={this.changeHandler}
              ></textarea>
              <input
                className="col-1 btn btn-outline-secondary btn-lg float-right"
                type="submit"
                value="Send"
              />
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
