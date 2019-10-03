import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="bg2 text-center my-auto z-1">
      <h1
        className="my-5 text-white"
        style={{ fontFamily: "Acme", fontSize: 100 }}
      >
        Welcome {user.username}!
      </h1>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(SuperSecretPage);
