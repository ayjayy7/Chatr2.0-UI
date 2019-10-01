/*import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import { fetchChannel, sendMessage } from "../../redux/actions";
import { Redirect } from "react-router-dom";

class MessageBox extends React.Component {
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
    }
  }
  render() {
    const channel = this.props.currentChannel;
    if (!!channel) {
      return (
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
      );
    }
  }
}
const mapStateToProps = state => ({
  user: state.user,
  currentChannel: state.channels.currentChannel,
  channels: state.channels.channels
});
const mapDispatchToProps = dispatch => {
  return {
    fetchChannel: channelID => dispatch(fetchChannel(channelID)),
    sendMessage: (channelID, message, user) =>
      dispatch(sendMessage(channelID, message, user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);*/
