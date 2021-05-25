import React, { Component } from "react";
import Progress from "./Progress";

class BookingActivity extends Component {
  render() {
    return (
      <div className="Cards">
        <div>
          <span className="CardTitle">Booking status</span>
        </div>
        <div
          className="DisplayFlex1"
          style={{ alignItems: "center", marginTop: "13px" }}
        >
          <Progress status={this.props.status} height={93} />

          <div className="BookingStatusText">
            <span className="GreyText">
              {this.props.status > 0
                ? `Your fleet is ${this.props.status}% booked`
                : "You don’t have vehicles in fleet yet"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingActivity;
