import React from "react";
import { connect } from "react-redux";
import { addChannel } from "../redux/actions";
class CreateForm extends React.Component {
  state = {
    name: ""
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addChannel(this.state);
    let text = document.createForm.name;

    text.value = "";
  };
  render() {
    return (
      <form name="createForm" onSubmit={this.submitHandler}>
        <div className="row" id="scroller">
          <div className="col-12">
            <textarea
              name="name"
              placeholder="Enter channel name"
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
const mapStateToProps = state => ({
  channels: state.channels.channels
});
const mapDispatchToProps = dispatch => {
  return {
    addChannel: name => dispatch(addChannel(name))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm);
