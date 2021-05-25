import React, { Component } from "react";
import SignUpHeader from "../../Components/SharedComponents/SignUpHeader";
import SignUpFooter from "../../Components/SharedComponents/SignUpFooter";

class SignUpSelect extends Component {
  render() {
    return (
      <div className="ContainerSignUp">
        <div className="SignUpContainer">
          <div className="SignForm">
            <SignUpHeader
              title="Welcome to Java selfdrive"
              subtitle="Select an option to continue"
            />
            <div
              className="Form Animation"
              style={{ background: "none", boxShadow: "none", padding: "0px" }}
            >
              <button className="SignUpSelect">
                <div className="DisplayFlexSpace">
                  <img src="/icon/user.svg" alt="rider" />
                  <span style={{ marginLeft: "20px" }}>Book a ride</span>
                </div>
                <img src="/icon/right.svg" alt="select" />
              </button>
              <button className="SignUpSelect">
                <div className="DisplayFlexSpace">
                  <img src="/icon/driver.svg" alt="driver" />
                  <span style={{ marginLeft: "20px" }}>Become a driver</span>
                </div>
                <img src="/icon/right.svg" alt="select" />
              </button>
              <button
                className="SignUpSelect"
                onClick={() => this.props.history.push("/Signup-Partner")}
              >
                <div className="DisplayFlexSpace">
                  <img src="/icon/partner.svg" alt="partner" />
                  <span style={{ marginLeft: "20px" }}>Business partner</span>
                </div>
                <img src="/icon/right.svg" alt="select" />
              </button>
            </div>
          </div>
        </div>
        <SignUpFooter />
      </div>
    );
  }
}
export default SignUpSelect;
