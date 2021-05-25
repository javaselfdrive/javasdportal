import React, { Component } from "react";
import { Grid, withStyles, Paper } from "@material-ui/core";
import TopCar from "./TopCar";
import WeekSelect from "../Dashboard/WeekSelect";
import Graph from "../SharedComponents/Graph";
import moment from "moment";
import Progress from "../Dashboard/Progress";

const styles = (theme) => ({
  paper: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "solid 1px #f5f9fe",
    backgroundColor: "rgba(255, 255, 255, 0.63)",
    padding: "25px",
  },
  paper1: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "solid 1px #f1f1f1",
    backgroundColor: "rgba(255, 255, 255, 0.63)",
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      topCar: [
        {
          carMake: "Subaru",
          carModel: "WRX",
          carYear: "2018",
          carReg: "KCB 120B",
          carImage: "./icon/vehicle.jpg",
          amountGenerated: "KES 15,000.00",
          totalBookings: "10",
        },
      ],
      investmentTotals: [
        {
          currency: "KES",
          totalWallet: 12000,
          totalProfit: 12000,
          totalAssets: 425300,
        },
      ],
      investmentGrowth: 45,
      selectedPeriod: "W",
      investment: [30000, 40000, 30000, 40000, 20000, 40000, 42000],
    };

    this.handleSelectedPeriod = this.handleSelectedPeriod.bind(this);
  }

  handleSelectedPeriod(period) {
    this.setState({ selectedPeriod: period });
  }

  render() {
    const { classes } = this.props;
    var CurrencyFormat = require("react-currency-format");
    var duration = this.state.selectedPeriod;
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
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Paper className={classes.paper} style={{ minHeight: "164px" }}>
              <div className="DisplayFlex1">
                <div>
                  <span className="MainContentHeader Bold">
                    Total on investment account
                  </span>
                </div>
                <img src="/icon/refresh.svg" alt="refresh" />
              </div>
              <span className="MainContentSubheader">
                Total value on investment wallet
              </span>
              <div
                className="DisplayFlex1"
                style={{ marginTop: "35px", fontSize: "24px" }}
              >
                <div>
                  <span className="Bold">
                    {this.state.investmentTotals[0].currency}{" "}
                    <CurrencyFormat
                      value={parseFloat(
                        this.state.investmentTotals[0].totalWallet
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </span>
                </div>
                <div className="DisplayFlexSpace">
                  <img src="/icon/lock.svg" alt="lock" />
                  <span
                    className="GreyText"
                    style={{ marginLeft: "5px", color: "#f58730" }}
                  >
                    Lock
                  </span>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Paper className={classes.paper} style={{ minHeight: "164px" }}>
              <span className="MainContentHeader Bold">Total profits </span>
              <br />
              <span className="MainContentSubheader">
                Compared to previous period
              </span>
              <div style={{ marginTop: "35px", fontSize: "24px" }}>
                <span className="Bold">
                  {this.state.investmentTotals[0].currency}{" "}
                  <CurrencyFormat
                    value={parseFloat(
                      this.state.investmentTotals[0].totalProfit
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Paper className={classes.paper} style={{ minHeight: "164px" }}>
              <span className="MainContentHeader Bold">Total asset value </span>
              <br />
              <span className="MainContentSubheader">
                Compared to previous period
              </span>
              <div style={{ marginTop: "35px", fontSize: "24px" }}>
                <span className="Bold">
                  {this.state.investmentTotals[0].currency}{" "}
                  <CurrencyFormat
                    value={parseFloat(
                      this.state.investmentTotals[0].totalAssets
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Grid item xs={12} sm={12} md={12} lg={12} className="MiddleCards">
              <Paper className={classes.paper} style={{ minHeight: "290px" }}>
                <div className="DisplayFlex1">
                  <div>
                    <span className="MainContentHeader Bold">
                      Investment account trends
                    </span>
                  </div>
                  <div>
                    <WeekSelect
                      selectedPeriod={this.state.selectedPeriod}
                      handleSelectedPeriod={this.handleSelectedPeriod}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "25px" }}>
                  <Graph
                    height={180}
                    data={this.state.investment}
                    label={dateLabel}
                    tooltipLabel="Investment"
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper className={classes.paper} style={{ minHeight: "305px" }}>
                <span className="MainContentHeader Bold">
                  Top car in your fleet
                </span>
                <br />
                <TopCar topCar={this.state.topCar} />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} className="MiddleCards">
              <Paper className={classes.paper} style={{ minHeight: "414px" }}>
                <span className="MainContentHeader Bold">Portfolio growth</span>
                <br />
                <span className="MainContentSubheader">
                  Showing percentage growth of your invesment to maturity{" "}
                </span>
                <div className="DisplayFlex" style={{ marginTop: "30px" }}>
                  <Progress status={this.state.investmentGrowth} height={110} />
                  <div
                    className="DisplayFlex1"
                    style={{ height: "20px", alignItems: "center" }}
                  >
                    <div
                      className="StatusLegend"
                      style={
                        this.state.investmentGrowth > 50
                          ? { background: "#f58730" }
                          : null
                      }
                    ></div>
                    <div>
                      <span className="GreyText">Investment growth</span>
                    </div>
                  </div>
                </div>
                <div className="InvestmentMessage">
                  <img src="/icon/warning1.svg" alt="warning" />
                  <div>
                    <span className="GreyText">
                      {this.state.investmentGrowth === 0
                        ? "You haven’t started earning in your account. "
                        : "We advice you continue investing your money on the investment account. Once your account matures, we’ll notify you for re-investment options"}
                    </span>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper
                className={classes.paper}
                style={{ height: "175px", background: "#252b33" }}
              >
                <div className="DisplayFlex1">
                  <div style={{ width: "69%" }}>
                    <span
                      className="WhiteText"
                      style={{ fontSize: "18px", lineHeight: "1.5em" }}
                    >
                      Grow your investment account
                    </span>
                  </div>
                  <img src="/icon/investment.svg" alt="investment" />
                </div>
                <button className="OrangeButton" style={{ marginTop: "30px" }}>
                  Add new investment
                  <img src="./icon/add.svg" alt="add" />
                </button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Overview);
