import React, { Component } from "react";
import moment from "moment";
import Graph from "../SharedComponents/Graph";
import WeekSelect from "./WeekSelect";

class BookingRevenue extends Component {
  constructor() {
    super();

    this.handleSelectedPeriod = this.handleSelectedPeriod.bind(this);
  }

  handleSelectedPeriod(value) {
    this.props.handleSelectedPeriod(value);
  }
  render() {
    var duration = this.props.selectedPeriod;
    var period = 0;
    var dateLabel = [];
    if (duration === "W") {
      period = 6;
    }

    for (var i = period; i >= 0; i--) {
      var newDate = moment().add(-i, "days").format("ddd DD");

      dateLabel.push(newDate);
    }

    return (
      <div className="Cards">
        <div className="DisplayFlex" style={{ alignItems: "center" }}>
          <div>
            <span className="CardTitle">Investment account trends</span>
          </div>
          <div>
            <WeekSelect
              selectedPeriod={this.props.selectedPeriod}
              handleSelectedPeriod={this.handleSelectedPeriod}
            />
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Graph
            height={180}
            data={this.props.revenue}
            label={dateLabel}
            tooltipLabel="Revenue"
          />
        </div>
      </div>
    );
  }
}

export default BookingRevenue;
