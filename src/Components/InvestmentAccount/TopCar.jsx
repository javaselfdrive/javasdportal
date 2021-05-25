import React, { Component } from "react";
import NoData from "../SharedComponents/NoData";

class TopCar extends Component {
  handleDisplay() {
    var length = Object.keys(this.props.topCar).length;
    var topCar = this.props.topCar[0];
    if (length === 0) {
      return (
        <NoData
          title={"No car records yet"}
          subtitle={
            "Visit the get started page and ensure you have added vehicles to your fleet and completed your profile for verification"
          }
        />
      );
    } else {
      return (
        <div>
          <div className="DisplayFlex" style={{ marginTop: "30px" }}>
            <div
              className="TopCarB"
              style={{
                background: `url(${topCar.carImage})`
              }}
            ></div>
            <div>
              <div style={{ marginBottom: "20px", paddingLeft: "16px" }}>
                <span
                  className="BlackText"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  {topCar.carMake} {topCar.carModel} {topCar.carYear}
                </span>
                <span className="GreyText">{topCar.carReg}</span>
              </div>
              <div className="DisplayFlex">
                <div className="TopCarCardsB">
                  <div style={{ marginBottom: "9px" }}>
                    <span className="Bold">{topCar.totalBookings}</span>
                  </div>
                  <div>
                    <span className="GreyText">Total bookings</span>
                  </div>
                </div>
                <div className="TopCarCardsB">
                  <div style={{ marginBottom: "9px" }}>
                    <span className="Bold">{topCar.amountGenerated}</span>
                  </div>
                  <div>
                    <span className="GreyText">Total amount generated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: "14px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span className="Bold">Return on investment</span>
            </div>
            <button className="RedirectButton" style={{ textAlign: "left" }}>
              Visit the investment page to view more details
            </button>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <div style={{ marginTop: "13px" }}>{this.handleDisplay()}</div>
      </div>
    );
  }
}

export default TopCar;
