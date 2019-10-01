import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channel from "./components/Channel";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/signup" component={RegistrationForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/private" component={SuperSecretPage} />
          <Route path="/createChannel" component={CreateForm} />
          <Route path="/channels/:channelID" component={Channel} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
