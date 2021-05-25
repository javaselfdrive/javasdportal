import React, { Component } from "react";

class FleetTable extends Component {
  render() {
    return (
      <div style={{ maxHeight: "501px", overflowY: "auto" }}>
        {this.props.fleet.map((step, index) => (
          <button
            className={
              step === this.props.selected
                ? "FleetTableRowsSelected"
                : "FleetTableRows"
            }
            key={index}
            onClick={() => this.props.handleSelected(step)}
          >
            <div>
              <div>
                <span className="BlackText">
                  {step.carMake} {step.carModel}
                </span>
              </div>
              <div style={{ marginTop: "5px" }}>
                <span className="GreyText">{step.carReg}</span>
              </div>
              <div style={{ marginTop: "5px" }}>
                <span className="GreyText">{step.location}</span>
              </div>
            </div>
            <div
              className={
                step.trip === "In progress"
                  ? "InProgress"
                  : step.trip === "Cancelled"
                  ? "Cancelled"
                  : "Completed"
              }
            >
              {step.trip}
            </div>
          </button>
        ))}
      </div>
    );
  }
}

export default FleetTable;
