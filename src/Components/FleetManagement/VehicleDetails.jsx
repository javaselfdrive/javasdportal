import React, { Component } from "react";
import { Grid, withStyles, Paper } from "@material-ui/core";
import Gauge from "./Gauge";
import SignalBar from "./SignalBar";
import Odometer from "./Odometer";

const styles = theme => ({
  paper: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "solid 1px #f1f1f1",
    backgroundColor: "rgba(255, 255, 255, 0.63)"
  },
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});

class VehicleDetails extends Component {
  render() {
    const { classes } = this.props;
    var data = this.props.carDetails;
    return (
      <div style={{ background: "#ffffff", padding: "35px" }}>
        <button className="BackButton" onClick={() => this.props.handleClose()}>
          <img src="/icon/back.svg" alt="back" />
          <span>Back</span>
        </button>
        <div className="ContentHeader">
          <span className="MainContentHeader Bold">Vehicle details</span>
          <br />
          <span className="MainContentSubheader">
            Manage additional vehicle details{" "}
          </span>
        </div>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper
              className={classes.paper}
              style={{ minHeight: "236px", padding: "20px" }}
            >
              <div className="DisplayFlex">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px"
                    }}
                  >
                    <span style={{ width: "150px" }} className="BlackText">
                      Name
                    </span>
                    <span
                      className="GreyText Bold"
                      style={{ textAlign: "right" }}
                    >
                      {data.carMake} {data.carModel}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px"
                    }}
                  >
                    <span style={{ width: "150px" }} className="BlackText">
                      Number plate
                    </span>
                    <span
                      className="GreyText Bold"
                      style={{ textAlign: "right" }}
                    >
                      {data.carReg}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px"
                    }}
                  >
                    <span style={{ width: "150px" }} className="BlackText">
                      Current location
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span className="GreyText Bold">{data.location}</span>
                      <button
                        className="RedirectButton"
                        style={{
                          textAlign: "right",
                          display: "block",
                          marginTop: "10px",
                          marginBottom: "20px"
                        }}
                      >
                        Share live location
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    className={
                      data.trip === "In progress"
                        ? "InProgress"
                        : data.trip === "Cancelled"
                        ? "Cancelled"
                        : "Completed"
                    }
                    style={{ float: "right" }}
                  >
                    {data.trip}
                  </div>
                  <br />
                  <button
                    className="RedirectButton"
                    style={{
                      marginTop: "10px",
                      width: "100%"
                    }}
                  >
                    Update status
                  </button>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper
              className={classes.paper}
              style={{ height: "271px", padding: "20px" }}
            >
              <div>
                <span className="CardTitle">Handover</span>
              </div>
              <div style={{ marginTop: "20px", marginBottom: "15px" }}>
                <span className="GreyText">
                  Car {data.expectedRT ? "has already been" : "to be"} handed
                  over
                </span>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <span className="BlackText">Handover time </span>
                <br />
                <span className="GreyText">{data.handoverTime}</span>
              </div>
              <div>
                <span className="BlackText">Expected return time </span>
                <br />
                <span className="GreyText">{data.expectedRT}</span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper
              className={classes.paper}
              style={{ height: "271px", padding: "20px" }}
            >
              <div>
                <span className="CardTitle">Fuel levels</span>
              </div>
              <div className="FleetGauge" key={data.carReg}>
                <Gauge fuel={data.fuel} />
              </div>
              <div>
                <div className="FleetSpanDiv">
                  <span
                    style={{ width: "80px", color: "#2eb57e" }}
                    className="BlackText"
                  >
                    {data.fuel}%
                  </span>
                  <span className="GreyText">fuel on tank</span>
                </div>
                <div className="FleetSpanDiv">
                  <span
                    style={{ width: "80px", color: "#b55407" }}
                    className="BlackText"
                  >
                    {data.distanceTE}kms
                  </span>
                  <span className="GreyText">Distance to empty</span>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ marginBottom: "20px" }}
            >
              <Paper
                className={classes.paper}
                style={{ height: "125px", padding: "20px" }}
              >
                <div>
                  <span className="CardTitle">GSM signal</span>
                </div>
                <div style={{ textAlign: "right", marginTop: "10px" }}>
                  <SignalBar signal={data.signal} bars={data.bars} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper
                className={classes.paper}
                style={{ height: "125px", padding: "20px" }}
              >
                <div>
                  <span className="CardTitle">Odometer</span>
                </div>
                <div key={data.carReg}>
                  <Odometer data={data} />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(VehicleDetails);
