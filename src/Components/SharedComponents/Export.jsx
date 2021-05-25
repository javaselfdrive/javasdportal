import React, { Component } from "react";

class Export extends Component {
  render() {
    return (
      <div
        className="FilterButton"
        style={{ cursor: "pointer"}}
      >
        <div>
          <button className="Filter" style={{ width: "155px", padding:"10px" }}>
            <img alt="export" src="/icon/export.svg" />
            <span style={{ marginLeft: "15px" }}>Export reports</span>
          </button>
        </div>
      </div>
    );
  }
}
export default Export;
