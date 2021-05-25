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
        <div className="DisplayFlex" style={{ marginTop: "20px" }}>
          <div>
            <span className="BlackText" style={{ display: "block" }}>
              {topCar.carMake} {topCar.carModel} {topCar.carYear}
            </span>
            <span className="GreyText">{topCar.carReg}</span>
            <div
              className="TopCar"
              style={{ background: `url(${topCar.carImage})` }}
            ></div>
          </div>
          <div>
            <div className="DisplayFlex">
              <div className="TopCarCards">
                <div>
                  <span className="Bold">Total amount generated</span>
                </div>
                <div style={{ marginTop: "9px" }}>
                  <span className="GreyText">{topCar.amountGenerated}</span>
                </div>
              </div>
              <div className="TopCarCards" style={{ textAlign: "center" }}>
                <div>
                  <span className="Bold">Total bookings</span>
                </div>
                <div style={{ marginTop: "9px" }}>
                  <span className="GreyText">{topCar.totalBookings}</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "25px 30px 14px 30px", fontSize: "14px" }}>
              <div style={{ marginBottom: "10px" }}>
                <span className="Bold">Return on investment</span>
              </div>
              <button className="RedirectButton" style={{ textAlign: "left" }}>
                Visit the investment page to view more details
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="Cards">
        <div>
          <span className="CardTitle">Top car in your fleet</span>
        </div>
        <div style={{ marginTop: "13px" }}>{this.handleDisplay()}</div>
      </div>
    );
  }
}

export default TopCar;
