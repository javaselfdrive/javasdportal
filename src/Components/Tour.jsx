import React from "react";

class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: [
        {
          title: "Account balances",
          info: "View your current wallet balance from here",
          position: { top: "-2.2em" },
          anchor: "bottom"
        },
        {
          title: "Booking status",
          info: "Always be in the know of your fleet’s booking status",
          position: { top: "-2.2em" },
          anchor: "bottom"
        },
        {
          title: "Sidebar navigation",
          info:
            "From here, you’ll be able to view all other features and sections",
          position: {
            top: "22.8em",
            left: "13.2em",
            display: "flex"
          },
          anchor: "side"
        },
        {
          title: "Investment account trends",
          info:
            "View the revenue trends of your investment account at a glance",
          position: {
            top: "11.5em",
            left: "21em"
          },
          anchor: "bottom"
        }
      ]
    };
  }

  handleNext = () => {
    this.props.handleDashboardTour(this.props.activeTour + 1, true);
  };
  handleBack = () => {
    this.props.handleDashboardTour(this.props.activeTour - 1, true);
  };

  handleClose = () => {
    this.props.handleDashboardTour(0, false);
  };

  render() {
    return (
      <div
        className="Tour"
        style={this.state.tour[this.props.activeTour].position}
        key={this.props.activeTour}
      >
        {this.state.tour[this.props.activeTour].anchor === "side" ? (
          <div className="TourCardPointerB"></div>
        ) : null}
        <div className="TourCard">
          <div>
            <img
              src="./icon/closeTour.svg"
              alt="x"
              onClick={() => this.handleClose()}
              style={{ cursor: "pointer" }}
            />
            <div>
              <div>
                <span className="WhiteText">
                  {this.state.tour[this.props.activeTour].title}
                </span>
              </div>
              <div style={{ marginTop: "5px" }}>
                <span className="WhiteIshText" style={{ fontSize: "13px" }}>
                  {this.state.tour[this.props.activeTour].info}
                </span>
              </div>
            </div>
          </div>
          <div className="TourCardButtons">
            {this.props.activeTour > 0 && this.props.activeTour !== 3 ? (
              <button
                className="TourCardBack"
                onClick={() => this.handleBack()}
              >
                Back
              </button>
            ) : null}
            {this.props.activeTour < 3 ? (
              <button
                className="TourCardNext"
                onClick={() => this.handleNext()}
              >
                Next
              </button>
            ) : null}
            {this.props.activeTour === 3 ? (
              <button
                className="TourCardNext"
                onClick={() => this.handleClose()}
              >
                Close
              </button>
            ) : null}
          </div>
        </div>
        {this.state.tour[this.props.activeTour].anchor === "bottom" ? (
          <div className="TourCardPointer"></div>
        ) : null}
      </div>
    );
  }
}
export default Tour;
