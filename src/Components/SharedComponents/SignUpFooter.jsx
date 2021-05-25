import React, { Component } from "react";

class SignUpFooter extends Component {
  render() {
    return (
      <div>
        <div className="SignUpFooter">
          <button className="FooterButtonBorder">JavaOrient.com</button>
          <button className="FooterButtonBorder">Driver</button>
          <button className="FooterButtonBorder">Rider</button>
          <button className="FooterButtonBorder">Partner</button>
          <button className="FooterButtonBorder">Terms</button>
          <button className="FooterButton">Privacy</button>
        </div>
        <span className="ContainerFooter">
          © Java Orient ltd. All rights reserved 2021
        </span>
      </div>
    );
  }
}
export default SignUpFooter;
