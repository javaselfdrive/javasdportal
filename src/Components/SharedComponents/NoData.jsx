import React, { Component } from "react";

class NoData extends Component {
  render() {
    return (
      <div className="NoData">
        <div>
          <img src="/icon/noData.svg" alt="no data" />
          <div>
            <span className="BlackText">{this.props.title}</span>
          </div>
          <div>
            <span className="GreyText">{this.props.subtitle}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default NoData;
