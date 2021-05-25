import React, { Component } from "react";

class SignUpHeader extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src="/logo/logo.png"
          alt="Java Orient"
          style={{ paddingBottom: "20px" }}
          onClick={() => this.props.history.push("/Login")}
        />
        <div>
          <span className="SignTitle">{this.props.title}</span>
          <br />
          <span className="SignSubtitle">{this.props.subtitle}</span>
        </div>
      </div>
    );
  }
}
export default SignUpHeader;
