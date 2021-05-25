import React, { Component } from "react";
class Successful extends Component {
  render() {
    return (
      <div className="PersonalInfo PaymentsForm">
        <div className="PaymentResponse">
          <img src="/icon/successful.svg" alt="success" />
        </div>
        <div
          className="ContentHeader"
          style={{ textAlign: "center", marginBottom: "35px" }}
        >
          <span
            className="MainContentHeader Bold"
            style={{ display: "block", marginBottom: "10px" }}
          >
            Transaction successful
          </span>
          <span className="MainContentSubheader">
            Your transaction was completed succesfully
          </span>
        </div>
      </div>
    );
  }
}
export default Successful;
