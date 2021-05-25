import React, { Component } from "react";
import GaugeChart from "react-gauge-chart";

class Gauge extends Component {
  render() {
    return (
      <GaugeChart
        id="gauge-chart2"
        style={{ width: "100%" }}
        nrOfLevels={20}
        colors={["#F05050", "rgba(245, 135, 48, 0.46)"]}
        percent={this.props.fuel / 100}
        needleColor="#000000"
        needleBaseColor="#000000"
        hideText={true}
      />
    );
  }
}

export default Gauge;
