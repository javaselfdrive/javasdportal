import React, { Component } from "react";
import {
  createMuiTheme,
  Select,
  MuiThemeProvider,
  MenuItem
} from "@material-ui/core";
import { numberCheck } from "../../Utilities/SharedFunctions";
import { CircularProgress } from "@material-ui/core";
import Successful from "./Successful";

const MenuProps = {
  style: {
    marginTop: "15px"
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  }
};

const customTopUp = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiSelect: {
      root: {
        fontFamily: "inherit"
      },
      select: {
        color: "rgba(37, 37, 37, 0.7)",
        "&:focus": {
          backgroundColor: "none"
        }
      },
      icon: {
        position: "absolute"
      },
      nativeInput: {
        width: "auto",
        display: "none !important"
      }
    },
    MuiMenuItem: {
      root: {
        color: "rgba(37, 37, 37, 0.7)",
        fontFamily: "inherit",
        fontSize: "14px",
        height: "40px",
        width: "100%",
        "&:hover": {
          backgroundColor: "#f4f7ff !important"
        },
        "&$selected": {
          backgroundColor: "#f4f7ff"
        }
      }
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px"
      }
    },
    MuiInput: {
      root: {
        position: "inherit",
        height: "40px"
      },
      underline: {
        "&&&:before": {
          borderBottom: "none"
        },
        "&&:after": {
          borderBottom: "none"
        }
      }
    },
    MuiInputBase: {
      root: {
        fontFamily: "inherit",
        fontSize: "14px",
        marginTop: "10px",
        marginBottom: "20px",
        height: "40px",
        border: "1px solid rgba(37, 43, 51, 0.15)",
        borderRadius: "4px",
        "&:hover": {
          border: "1px solid #f58730",
          boxShadow: "0 7px 9px -3px rgba(70, 70, 70, 0.06)"
        },
        "&:focus": {
          border: "1px solid #f58730",
          boxShadow: "0 7px 9px -3px rgba(70, 70, 70, 0.06)"
        }
      },
      input: {
        padding: "0px",
        border: "none !important",
        boxShadow: "none !important",
        margin: "0px !important"
      }
    }
  }
});

class TopUpBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      sourceAccount: "",
      destinationAccount: "",
      amount: "",
      selectedCurrency: "KES",
      availableCurrencies: ["KES", "USD", "GBP", "EUR"],
      isLoading: false
    };

    this.handleFormInputNumber = this.handleFormInputNumber.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleView(view) {
    this.setState({ view: view });
  }

  handleFormInputNumber(event) {
    if (event.target.value.length > 0) {
      if (numberCheck(event.target.value)) {
        this.setState({ [event.target.id]: event.target.value });
      }
    } else {
      this.setState({ [event.target.id]: "" });
    }
  }

  handleFormInput(event) {
    if (event.target.id) {
      this.setState({ [event.target.id]: event.target.value });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit() {
    this.setState({ isLoading: true , view: 1});
    var payload = {
      sourceAccount: this.state.sourceAccount,
      destinationAccount: this.state.destinationAccount,
      amount: this.state.amount,
      selectedCurrency: this.state.selectedCurrency
    };
  }

  render() {
    return (
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
        {this.state.view === 0 ? (
          <div className="ContentSpace">
            <div className="PersonalInfo PaymentsForm">
              <div
                className="ContentHeader"
                style={{ textAlign: "center", marginBottom: "35px" }}
              >
                <span
                  className="MainContentHeader Bold"
                  style={{ display: "block", marginBottom: "10px" }}
                >
                  Top up wallet with Bank
                </span>
                <span className="MainContentSubheader">
                  Enter your bank details below and transfer money to your
                  wallet. Confirm details before completing payment{" "}
                </span>
              </div>
              <MuiThemeProvider theme={customTopUp}>
                <div className="ProfileForm">
                  <label>From account</label>
                  <input
                    id="sourceAccount"
                    type="text"
                    value={this.state.sourceAccount}
                    onChange={this.handleFormInput}
                    required
                  />
                  <label>To account</label>
                  <input
                    id="destinationAccount"
                    type="text"
                    value={this.state.destinationAccount}
                    onChange={this.handleFormInput}
                    required
                  />
                  <label>Amount</label>
                  <div className="SignUpFormsTwoInOne">
                    <div className="SignUpFormsTwoInOneSmall">
                      <Select
                        className="PaymentSelect"
                        style={{
                          fontFamily: "inherit",
                          fontSize: "14px",
                          marginTop: "0px"
                        }}
                        name="selectedCurrency"
                        value={this.state.selectedCurrency}
                        onChange={event => this.handleFormInput(event)}
                        disableUnderline={true}
                        MenuProps={MenuProps}
                      >
                        {this.state.availableCurrencies.map((code, index) => (
                          <MenuItem value={code} key={index}>
                            {code}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <input
                      id="amount"
                      type="text"
                      autoComplete="off"
                      maxLength="9"
                      value={this.state.amount}
                      onChange={this.handleFormInputNumber}
                      required
                    />
                  </div>
                  <button
                    className={
                      this.state.sourceAccount !== "" &&
                      this.state.destinationAccount !== "" &&
                      this.state.amount !== "" &&
                      this.state.selectedCurrency !== ""
                        ? "SignUpFormsSubmit"
                        : "SignUpFormsSubmitDisabled"
                    }
                    disabled={
                      this.state.sourceAccount !== "" &&
                      this.state.destinationAccount !== "" &&
                      this.state.amount !== "" &&
                      this.state.selectedCurrency !== ""
                        ? false
                        : true
                    }
                    onClick={() => this.handleSubmit()}
                  >
                    {this.state.isLoading ? (
                      <CircularProgress style={{ color: "white" }} size={20} />
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </MuiThemeProvider>
            </div>
          </div>
        ) : (
          <div className="ContentSpace">
            <Successful />
          </div>
        )}
      </div>
    );
  }
}
export default TopUpBank;
