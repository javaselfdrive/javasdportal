import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@material-ui/core/styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class LearnMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      images: [
        {
          src: "",
          title: "Import your car with us",
          textA:
            "Pay 50% of the car value and let us do the rest  for you at no extra charges. Pay the remaining 50% when we hand the car over to you.",
          textB: "",
          background: "rgba(0, 42, 209, 0.7)",
          img: "/icon/adBack1.jpg"
        },
        {
          src: "",
          title: "Open a savings account",
          textA: "Invest with us and own your car",
          textB: "Become a car owner with less than 50% of the cars value",
          background:
            "linear-gradient(180deg, rgba(245, 135, 48, 0.26) 0%, #F58730 97.92%)",
          img: "/icon/adBack2.jpg"
        }
      ]
    };
  }

  handleStepChange = step => {
    this.setState({ activeStep: step });
  };
  render() {
    const theme = useTheme;

    return (
      <div>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.state.images.map((step, index) => (
            <div
              className="LearnMore"
              key={index}
              style={{
                overflow: "hidden",
                background: `url(${step.img})`
              }}
            >
              <div className="Cards" style={{ background: step.background }}>
                <div
                  className="MainContentHeader"
                  style={{ color: index === 0 ? "#F58730" : null }}
                >
                  {step.title}
                </div>
                <div
                  className={index === 0 ? "WhiteIshText" : "GreyText"}
                  style={{ marginTop: "1em" }}
                >
                  {step.textA}
                </div>
                <div
                  className="BlackText"
                  style={{marginTop: index === 1 ? "20px" : "0px"}}
                >
                  {step.textB}
                </div>
                <div className="BottomButton">
                  <button className="LearnMoreButton">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </div>
    );
  }
}

export default LearnMore;
