import React, { Component } from "react";

class SignalBar extends Component {
  render() {
    //   ok bad good
    var string = this.props.bars !== "one" ? "-bars" : "-bar";
    return (
      <div>
        <div
          className={`signal-bars mt1 sizing-box ${this.props.signal} ${this.props.bars}${string}`}
        >
          <div className="first-bar bar"></div>
          <div className="second-bar bar"></div>
          <div className="third-bar bar"></div>
          <div className="fourth-bar bar"></div>
          <div className="fifth-bar bar"></div>
        </div>
      </div>
    );
  }
}

export default SignalBar;
