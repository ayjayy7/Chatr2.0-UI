import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/private" />;
    console.log(this.props.errors);
    const { username, password } = this.state;

    return (
      <div className="col-6 mx-auto">
        <div className="card my-5">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control is-invalid"
                  id="username"
                  value={username}
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control is-invalid"
                  id="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">
                  {this.props.errors
                    ? this.props.errors.non_field_errors
                    : console.log("no")}
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link to="/signup" className="btn btn-link my-2 my-sm-0">
                Signup for an account
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
