import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addChannel } from "../redux/actions";

class CreateForm extends React.Component {
  state = {
    name: "",
    image_url: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addChannel(this.state, this.props.history);
    let text = document.createForm.name;

    text.value = "";
  };
  render() {
    if (!this.props.user) return <Redirect to="/private" />;
    return (
      <div className="bg3 my-6">
        <div className="container-fluid jumbotron bg-transparent my-5 text-center align-ceneter"></div>
        <div className=" col-6 mx-auto my-5">
          <div className="card my-5">
            <div className="card-body">
              <form name="createForm" onSubmit={this.submitHandler}>
                <div className="form-group">
                  <p className="h4 text-center mb-4">Create a Channel</p>
                  <label htmlFor="channelname"> Channel Name</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter channel name"
                    onChange={this.changeHandler}
                  />
                  <br />
                </div>
                <div className="form-group">
                  <label htmlFor="backgroundimage">Background image</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image_url"
                    placeholder="Enter image url"
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-danger">
                    Create
                  </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.user.user,
  currentChannel: state.channels.currentChannel
});
const mapDispatchToProps = dispatch => {
  return {
    addChannel: (name, history) => dispatch(addChannel(name, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);
