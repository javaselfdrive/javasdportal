import React, { Component } from "react";
import MapContainer from "./MapContainer";

class FleetMoreDetails extends Component {
  constructor() {
    super();
    this.state = {
      openPopUp: false
    };
    this.handlePopUp = this.handlePopUp.bind(this);
    this.handlePopUpClose = this.handlePopUpClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlePopUp() {
    this.setState({ openPopUp: true });
  }

  handlePopUpClose() {
    this.setState({ openPopUp: false });
  }

  handleClick() {
    this.props.handleOpen(this.props.carDetails);
  }

  displayPopUp() {
    var data = this.props.carDetails;
    return (
      <div className="FleetMoreDetails">
        <img
          src="./icon/close.svg"
          alt="x"
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => this.setState({ openPopUp: false })}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="./icon/hatchCar.svg"
            alt="car"
            style={{ marginRight: "20px" }}
          />
          <div>
            <span>{data.carReg}</span>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: "100px" }} className="BlackText">
              Speed
            </span>
            <span className="GreyText">{data.speed} km/h</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Status
            </span>
            <span className="GreyText">{data.status}</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Battery
            </span>
            <span className="GreyText">{data.battery}%</span>
          </div>

          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Altitude
            </span>
            <span className="GreyText">{data.altitude}</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Time
            </span>
            <span className="GreyText">{data.time}</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Odometer
            </span>
            <span className="GreyText">{data.odometer} km</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Location
            </span>
            <span className="GreyText">{data.location}</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Latitude
            </span>
            <span className="GreyText">{data.latitude}</span>
          </div>
          <div className="FleetSpanDivB">
            <span style={{ width: "100px" }} className="BlackText">
              Longitude
            </span>
            <span className="GreyText">{data.longitude}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{ position: "relative", background: "rgba(0, 42, 209, 0.05)" }}
      >
        {this.state.openPopUp ? this.displayPopUp() : null}
        <MapContainer
          data={this.props.carDetails}
          handlePopUp={this.handlePopUp}
          handlePopUpClose={this.handlePopUpClose}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default FleetMoreDetails;
