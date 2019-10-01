import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel } from "../redux/actions";
import { Redirect } from "react-router-dom";
class Channel extends React.Component {
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
      const messages = channel.map(messageObject => (
        <Messages key={messageObject.id} messageObject={messageObject} />
      ));
      return <div>{messages}</div>;
    } else {
      return <div> Chat Not Found </div>;
    }
  }
}
const mapStateToProps = state => ({
  user: state.user,
  currentChannel: state.channels.currentChannel
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
