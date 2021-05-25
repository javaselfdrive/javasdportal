import React, { Component } from "react";
import { Grid, withStyles, Paper } from "@material-ui/core";
import TopUpBank from "./TopUpBank";

const styles = theme => ({
  paper: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "solid 1px #f1f1f1",
    backgroundColor: "rgba(255, 255, 255, 0.63)",
    textAlign: "center",
    color: "rgba(37, 37, 37, 0.7)",
    cursor: "pointer",
    "&:hover": {
      border: "solid 1px #f58730"
    },
    "&:focus": {
      border: "solid 1px #f58730"
    }
  },
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});

class TopUp extends Component {
  constructor() {
    super();
    this.state = {
      view: 0
    };
    this.handleView = this.handleView.bind(this);
  }

  handleView(view) {
    this.setState({ view: view });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="Content">
        {this.state.view === 0 ? (
          <div>
            <div className="ButtonPadding">
              <button
                className="BackButton"
                onClick={() => {
                  this.state.view === 0
                    ? this.props.handleView(0)
                    : this.handleView(0);
                }}
              >
                <img src="/icon/back.svg" alt="back" />
                <span>Back</span>
              </button>
            </div>

            <div className="ContentSpace">
              <div className="PaymentsView">
                <div
                  className="ContentHeader"
                  style={{ textAlign: "center", marginBottom: "35px" }}
                >
                  <span
                    className="MainContentHeader Bold"
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    Top-up wallet
                  </span>
                  <span className="MainContentSubheader">
                    Select from the various options on top-up of your account
                    wallet
                  </span>
                </div>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper
                      className={classes.paper}
                      style={{ minHeight: "174px" }}
                      onClick={() => this.handleView(1)}
                    >
                      <div className="PaymentMethod">
                        <img src="/icon/bank.svg" alt="Bank" />
                        <span
                          className="Bold"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                            marginTop: "10px"
                          }}
                        >
                          Bank
                        </span>
                        <span className="GreyText">
                          Enter your bank details and make a transfer to your
                          wallet account
                        </span>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper
                      className={classes.paper}
                      style={{ minHeight: "174px" }}
                    >
                      <div className="PaymentMethod">
                        <img
                          src="/icon/mpesa.svg"
                          alt="MPESA"
                          style={{ marginTop: "10px" }}
                        />
                        <span
                          className="Bold"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                            marginTop: "10px"
                          }}
                        >
                          MPESA account
                        </span>
                        <span className="GreyText">
                          Enter your phone number and PIN when prompted, to
                          autorize the transaction
                        </span>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper
                      className={classes.paper}
                      style={{ minHeight: "174px" }}
                    >
                      <div className="PaymentMethod">
                        <img src="/icon/card.svg" alt="Card" />
                        <span
                          className="Bold"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                            marginTop: "10px"
                          }}
                        >
                          Card
                        </span>
                        <span className="GreyText">
                          Use your Debit or credit card to top-up the wallet.
                        </span>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        ) : (
          <TopUpBank handleView={this.handleView} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TopUp);
