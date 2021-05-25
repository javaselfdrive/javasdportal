import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import Modal from "./Modal";

class Remove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: false,
      isLoading: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleOpen() {
    this.setState({ setOpen: !this.state.setOpen });
  }

  handleRemove(otp) {
    this.setState({ setOpen: !this.state.setOpen, isLoading: true });
    var carDetails = this.props.data;
    console.log(carDetails, otp);
  }

  render() {
    var data = this.props.data;
    var CurrencyFormat = require("react-currency-format");

    return (
      <div>
        <div className="ButtonPadding">
          <button
            className="BackButton"
            onClick={() => this.props.handleView(0)}
          >
            <img src="/icon/back.svg" alt="back" />
            <span>Back</span>
          </button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <div className="ActionForm">
              <div style={{ marginBottom: "35px" }}>
                <span
                  className="MainContentHeader"
                  style={{ marginBottom: "10px" }}
                >
                  Remove vehicle from investment account
                </span>
                <br />
                <span className="MainContentSubheader">
                  Read the Opt-out info carefully before completing action
                </span>
              </div>
              <div className="ProfileForm">
                <div style={{ marginBottom: "20px" }}>
                  <span
                    className="BlackText"
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    {data.carMake} {data.carModel} {data.carYear}
                  </span>
                  <span className="GreyText">{data.carReg}</span>
                </div>
                <div
                  className="TopCarD"
                  style={{
                    background: `url(${data.carImage})`,
                  }}
                ></div>
                <div className="DisplayFlex">
                  <div className="TopCarCardsC" style={{ marginLeft: "0px" }}>
                    <div style={{ marginBottom: "9px" }}>
                      <span className="Bold">{data.bookings}</span>
                    </div>
                    <div>
                      <span className="GreyText">Total bookings</span>
                    </div>
                  </div>
                  <div className="TopCarCardsC">
                    <div style={{ marginBottom: "9px" }}>
                      <span className="Bold">
                        {" "}
                        {data.currency}{" "}
                        <CurrencyFormat
                          value={parseFloat(data.amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>
                    </div>
                    <div>
                      <span className="GreyText">Total amount generated</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="RedButton"
                style={{ marginTop: "20px" }}
                onClick={() => this.handleOpen()}
              >
                Continue
              </button>

              <div style={{ marginTop: "20px", marginBottom: "35px" }}>
                <span className="GreyText">
                  By clicking continue, you’ll initialize the opt-put process
                  from the investment account. You’ll receieve an OTP on your
                  email to confirm and complete the action.
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <div className="InvestmentMessageB">
              <div style={{ display: "flex" }}>
                <img src="/icon/warning2.svg" alt="warning" />
                <div>
                  <span className="GreyText" style={{ color: "#002AD1" }}>
                    OPT out info
                  </span>
                </div>
              </div>

              <div className="GreyText">
                <ol>
                  <li>
                    Your vehicle will be removed from the investment account.
                    You’ll need to post on our selling page. The investment
                    account funds will be handed over after the car has been
                    transfered to a new owner of the investment account.
                  </li>
                  <li>
                    To add the vehicle to the selling page, proceed to remove
                    the car from being linked to your investment account
                  </li>
                  <li>
                    You’ll get a notification confirming the request and a link
                    to add vehicle to the selling page
                  </li>
                </ol>
              </div>
            </div>
          </Grid>
        </Grid>
        <Modal
          handleOpen={this.handleOpen}
          handleRemove={this.handleRemove}
          setOpen={this.state.setOpen}
          isLoading={this.state.isLoading}
          carReg={this.props.data.carReg}
        />
      </div>
    );
  }
}
export default Remove;
