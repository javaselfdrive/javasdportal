import React, { Component } from "react";
import Loader from "../../Components/SharedComponents/Loader";
import TopBar from "../../Components/SharedComponents/TopBar";
import Menu from "../../Components/SharedComponents/Menu";
import { withStyles, Tab, Tabs } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Overview from "../../Components/InvestmentAccount/Overview";
import Portfolio from "../../Components/InvestmentAccount/Portfolio";

const AntTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "5px",
    "& > span": {
      maxWidth: "75%",
      width: "100%",
      backgroundColor: "#002ad1",
      borderRadius: "25px",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontSize: "16px",
    color: "#252b33",
    fontWeight: 900,
    marginRight: theme.spacing(4),
    fontFamily: "inherit",
    "&:hover": {
      color: "#002ad1",
      opacity: 1,
    },
    "&$selected": {
      color: "#002ad1",
    },
    "&:focus": {
      color: "#002ad1",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

class InvestmentAccount extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ step: newValue });
  };

  handleChangeIndex = (step) => {
    this.setState({
      step,
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader text="Preparing your view" />
        ) : (
          <div className="ContainerApp">
            <TopBar username="John doe" />
            <div className="MainBody">
              <div className="Menu">
                <Menu />
              </div>
              <div className="Content">
                <div className="ContentHeader">
                  <AntTabs value={this.state.step} onChange={this.handleChange}>
                    <AntTab label="Overview" />
                    <AntTab label="Portfolio" />
                  </AntTabs>
                </div>
                <div className="ContentSpace">
                  <SwipeableViews
                    index={this.state.step}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <div style={{ overflow: "hidden", marginRight:"2px" }}>
                      <Overview />
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <Portfolio />
                    </div>
                  </SwipeableViews>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default InvestmentAccount;
