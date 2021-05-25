import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* Landing Pages */
import LandingPage from "./Views/LandingPages";
import Login from "./Views/SignUp/Login";
import PasswordReset from "./Views/SignUp/PasswordReset";
import SignUpSelect from "./Views/SignUp/SignUpSelect";
import SignUpFormPartner from "./Views/SignUp/Partner/SignUpForm";
import PasswordChange from "./Views/SignUp/PasswordChange";

/* Client Side */
import Dashboard from "./Views/ClientPortal/Dashboard";
import Profile from "./Views/ClientPortal/Profile";
import FleetManagement from "./Views/ClientPortal/FleetManagement";
import BookingHistory from "./Views/ClientPortal/BookingHistory";
import Payments from "./Views/ClientPortal/Payments";
import InvestmentAccount from "./Views/ClientPortal/InvestmentAccount";

class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Landing Pages */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/Home" component={LandingPage} />

        {/* Client Side*/}
        <Route exact path="/Signup" component={SignUpSelect} />
        <Route exact path="/Signup-Partner" component={SignUpFormPartner} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Reset" component={PasswordReset} />
        <Route exact path="/ChangePassword" component={PasswordChange} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/FleetManagement" component={FleetManagement} />
        <Route exact path="/BookingHistory" component={BookingHistory} />
        <Route exact path="/Payments" component={Payments} />
        <Route exact path="/InvestmentAccount" component={InvestmentAccount} />
        <Route>
          <Redirect to="/Home" />
        </Route>
      </Switch>
    );
  }
}

export default Routes;
