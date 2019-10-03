import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../redux/actions";
import SearchBar from "./SearchBar";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import Loading from "../../Loading";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = this.props.filteredChannels.map(channel => (
      <ChannelNavLink
        key={channel.name}
        channel={channel}
        onClick={this.props.fetchChannel}
      />
    ));
    return (
      <div>
        {this.props.loading ? <Loading /> : ""}
        <ul
          className="navbar-nav navbar-sidenav bg-danger overflow-hidden"
          id="exampleAccordion"
        >
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" to="/createChannel">
              <span className="nav-link-text mr-2">Channels</span>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
            <SearchBar onChange={this.filterChannels} />
          </li>
          {channelLinks}
        </ul>
        <ul className="navbar-nav sidenav-toggler bg-danger">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.channels.channels,
    filteredChannels: state.channels.filteredChannels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchAllChannels()),
    fetchChannel: channelID => dispatch(actionCreators.fetchChannel(channelID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
