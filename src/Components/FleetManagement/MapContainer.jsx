import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text, onMarkerClick, onMarkerHover, onMarkerLeave }) => (
  <div
    style={{ display: "flex", width: "121px", cursor: "pointer" }}
    onMouseOver={onMarkerHover}
    onMouseLeave={onMarkerLeave}
    onClick={onMarkerClick}
    onTouchStart={onMarkerClick}
    onTouchMove={onMarkerHover}
  >
    <div className="MapMarker"></div>
    <div className="MapMarkerText BlackText">{text}</div>
  </div>
);

class MapContainer extends Component {
  handleClick = () => {
    this.props.handleClick();
  };

  handlePopUpClose = () => {
    this.props.handlePopUpClose();
  };

  handleHover = () => {
    this.props.handlePopUp();
  };
  render() {
    var info = this.props.data;
    var center = {
      lat: info.latitude,
      lng: info.longitude
    };
    return (
      <div style={{ height: "100vh", width: "100%" }} key={info.carReg}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDOCMHAV8v-3Z9yud3SnUUraPA04jkwyUs" }}
          defaultCenter={center}
          zoom={16}
          language={"en"}
        >
          <Marker
            id={info.carReg}
            lat={info.latitude}
            lng={info.longitude}
            text={info.carReg}
            onMarkerClick={this.handleClick}
            onMarkerHover={this.handleHover}
            onMarkerLeave={this.handlePopUpClose}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
