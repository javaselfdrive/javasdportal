import React, { Component } from "react";

class Odometer extends Component {
  render() {
    var data = this.props.data;

    if (data.odometer) {
      var i;
      var number = Number.parseFloat(data.odometer).toFixed(1),
        odometer = [],
        newCount = 0,
        sNumber = number.toString();
      if (sNumber.length < 8) {
        newCount = 8 - sNumber.length;
        for (i = 0; i < newCount; i++) {
          odometer.push(0);
        }
      }
      for (var x = 0, len = sNumber.length; x < len; x += 1) {
        odometer.push(+sNumber.charAt(x));
      }
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px"
        }}
      >
        {odometer.slice(0, 6).map((digit, index) => (
          <div key={index} className="Odometer">
            <div className="odometerNumber">
              <span className="animateOdometer" style={{ top: `-${digit}em` }}>
                0 1 2 3 4 5 6 7 8 9
              </span>
            </div>
          </div>
        ))}
        {odometer.slice(7, 8).map((digit, index) => (
          <div key={index} className="Odometer OdometerDecimal">
            <div className="odometerNumber">
              <span>.</span>
              <span className="animateOdometer" style={{ top: `-${digit}em` }}>
                0 1 2 3 4 5 6 7 8 9
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Odometer;
