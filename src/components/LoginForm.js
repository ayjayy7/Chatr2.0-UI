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
    const { username, password } = this.state;

    return (
      <div className=" my-6">
        <div className="container-fluid jumbotron bg-transparent my-5 text-center align-ceneter">
          <div className=" col-6 mx-auto my-5">
            <div className="card my-5">
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
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
                      className="form-control"
                      id="password"
                      value={password}
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "red" }}>
                      {" "}
                      {this.props.errors
                        ? this.props.errors.non_field_errors
                        : ""}
                    </p>
                  </div>

                  <button type="submit" className="btn btn-danger">
                    Login
                  </button>
                  <br />
                  <Link
                    to="/signup"
                    className="btn btn-link text-danger my-2 my-sm-0"
                  >
                    Signup for an account
                  </Link>
                </form>
              </div>
            </div>
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
