import React, { Component } from "react";
import SignUpHeader from "../../../Components/SharedComponents/SignUpHeader";
import SignUpFooter from "../../../Components/SharedComponents/SignUpFooter";
import {
  validateEmail,
  numberCheck,
  passwordStrength,
  charCheck,
  alphaCheck,
  checkArray,
} from "../../../Utilities/SharedFunctions";
import {
  createMuiTheme,
  MuiThemeProvider,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import countryList from "react-select-country-list";
import codes from "country-calling-code";
import { post_request } from "../../../Services/FetchFunctions";
import CustomSnackbar from "../../../Components/SharedComponents/CustomSnackbar";

const customSignUp = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiInput: {
      root: {
        position: "inherit",
        height: "45px",
      },
      underline: {
        "&&&:before": {
          borderBottom: "none",
        },
        "&&:after": {
          borderBottom: "none",
        },
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: "inherit",
        fontSize: "14px",
        marginTop: "0px",
        marginBottom: "20px",
        height: "45px",
        border: "1px solid rgba(37, 43, 51, 0.15)",
        borderRadius: "4px",
        "&:hover": {
          border: "1px solid #f58730",
          boxShadow: "0 7px 9px -3px rgba(70, 70, 70, 0.06)",
        },
        "&:focus": {
          border: "1px solid #f58730",
          boxShadow: "0 7px 9px -3px rgba(70, 70, 70, 0.06)",
        },
      },
      input: {
        padding: "0px",
        boxShadow: "none !important",
      },
    },
    MuiAutocomplete: {
      input: {
        border: "none !important",
        margin: "0px !important",
      },
    },
    MuiIconButton: {
      root: {
        background: "none !important",
        "&:hover": {
          border: "none !important",
        },
        "&:focus": {
          border: "none !important",
        },
      },
    },
  },
});

class SignUpFormPartner extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      title: [
        "Let’s get to know you",
        "Verify your identity",
        "Account verification",
        "Congratulations!!",
      ],
      subtitle: [
        "Fill in your details below",
        "Please provide the following details to continue with the registration",
        "Please verify your account by entering the 5-digit code sent to your email address",
        "Account created successfully. Please wait while we prepare your dashboard",
      ],
      firstName: "",
      lastName: "",
      email: "",
      validEmail: false,
      country: { value: "KE", label: "Kenya" },
      newPassword: "",
      showValidationHelper: false,
      validPassword: false,
      passwordConfirm: false,
      confirmPassword: "",
      countryCode: {
        country: "Kenya",
        countryCodes: ["254"],
        isoCode2: "KE",
        isoCode3: "KEN",
      },
      phoneNumber: "",
      selectedID: "national ID",
      userID: "",
      verificationCode: ["", "", "", "", ""],
      success: false,
      open: false,
      isLoading: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: ''
    };

    this.handleFormInputNumber = this.handleFormInputNumber.bind(this);
    this.handleVerificationInput = this.handleVerificationInput.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };
  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };
  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  handleFormInputNumber(event) {
    if (event.target.value.length > 0) {
      if (numberCheck(event.target.value)) {
        this.setState({ [event.target.id]: event.target.value });
      }
    } else {
      this.setState({ [event.target.id]: "" });
    }
  }

  handleVerificationInput(event) {
    var index = event.target.id;
    const newArray = Array.from(this.state.verificationCode);
    const nextSibling = document.querySelector(
      `input[name=ssn-${parseFloat(index, 10) + 1}]`
    );

    if (numberCheck(event.target.value)) {
      if (event.target.value.length > 1) {
        for (var i = 0; i < 5; i++) {
          newArray[i] = event.target.value.charAt(i);
        }
        document.querySelector(`input[name=ssn-4]`).focus();
      } else {
        newArray[index] = event.target.value;
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
      this.setState({ verificationCode: newArray });
    } else {
      newArray[index] = "";
      this.setState({ verificationCode: newArray });
    }
  }

  handleFormInput(event, country) {
    if (event.target.id) {
      if (event.target.id.includes("area")) {
        var countryCode = codes
          .filter((code) => code.country === country.label)
          .map(({ country, countryCodes, isoCode2, isoCode3 }) => ({
            country,
            countryCodes,
            isoCode2,
            isoCode3,
          }));
        this.setState({
          countryCode: countryCode[0],
          country: country,
        });
      } else if (event.target.id.includes("countryCode")) {
        this.setState({ countryCode: country });
      } else {
        this.setState({ [event.target.id]: event.target.value });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
    if (event.target.id === "email") {
      this.setState({ validEmail: validateEmail(event.target.value) });
    } else if (
      event.target.id === "newPassword" &&
      event.target.value.length > 0
    ) {
      this.setState({
        showValidationHelper: true,
        confirmPassword: "",
        passwordConfirm: false,
      });
      var validationArray = [
        event.target.value.length < 8 ? false : true,
        alphaCheck(event.target.value),
        numberCheck(event.target.value),
        charCheck(event.target.value),
      ];
      var numOfTrue = validationArray.filter(function (x) {
        return x === true;
      }).length;

      if (passwordStrength(event.target.value)) {
        this.setState({
          validPassword: true,
          validCount: numOfTrue,
        });
      } else {
        this.setState({
          validPassword: false,
          showValidationHelper: true,
          validCount: numOfTrue,
        });
      }
    } else {
      this.setState({ validPassword: false, showValidationHelper: false });
    }
  }
  confirmPassword(event) {
    if (event.target.value !== "" && this.state.validPassword) {
      this.setState({ showValidationHelper: false });
      if (event.target.value === this.state.newPassword) {
        this.setState({
          passwordConfirm: true,
          confirmPassword: event.target.value,
        });
      } else {
        this.setState({
          passwordConfirm: false,
          confirmPassword: event.target.value,
        });
      }
    } else {
      this.setState({
        passwordConfirm: false,
        confirmPassword: event.target.value,
      });
    }
  }
  snackbarClose = event => {
    this.setState({ snackbaropen: false }); 
  };
  handleSubmit = async () => {
    this.setState({ isLoading: true });
    var payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      country: this.state.country.label,
      password: this.state.newPassword,
      phoneNumber:
        "+" + this.state.countryCode.countryCodes[0] + this.state.phoneNumber,
      userID: this.state.userID,
    };
    var payload2 = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      country: this.state.country.value,
      password: this.state.newPassword,
      phoneNumber:
        this.state.countryCode.countryCodes[0] + this.state.phoneNumber,
      idNumber: this.state.userID,
      idType: "1",
    };
    console.log(JSON.stringify(payload2));
    let endpoint = "client/registration";
    post_request(endpoint, payload2)
      .then((response) => {
        this.setState({
          isLoading: false,
          snackbaropen: true,
          snackbarmsg: "Account created!",
          snackbartxt: "Kindly verify your email",
          responseStatus: "success",
          verificationData: response.data,
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({
          isLoading: false,
          snackbaropen: true,
          snackbarmsg: "Creation Failed",
          responseStatus: "failed",
          snackbartxt: "kindly try again",
        });
      });
    this.handleNext();
  };

  handleVerification = async () => {
    var verificationCode = this.state.verificationCode
      .toString()
      .replace(/,/g, "");
    this.setState({ isLoading: true });

    var verifyData = this.state.verificationData;
    var payload = {
      UniqueID: verifyData.UniqueId,
      code: verificationCode,
      type: "2",
    };
    let verifyURL = "pin/validate"; 
    post_request(verifyURL, verifyData)
      .then((resp) => {
        this.setState({ isLoading: false });
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.history.push("/Login");
    this.handleNext();
  };

  handleDisplay(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <div className="DisplayFlexSpace">
              <div style={{ width: "48%" }}>
                <label>First name</label>
                <input
                  id="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleFormInput}
                  required
                />
              </div>
              <div style={{ width: "48%" }}>
                <label>Last name</label>
                <input
                  id="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleFormInput}
                  required
                />
              </div>
            </div>
            <label>What’s your email address?</label>
            <input
              id="email"
              type="email"
              value={this.state.email}
              style={
                this.state.email !== "" && this.state.validEmail !== true
                  ? { border: "2px solid #F05050" }
                  : null
              }
              onChange={this.handleFormInput}
              required
            />
            {this.state.email !== "" && this.state.validEmail !== true ? (
              <div className="PasswordConfirm">
                <span>This field is required</span>
              </div>
            ) : null}
            <label>Which country are you from?</label>
            <Autocomplete
              style={{ marginTop: "10px" }}
              value={this.state.country}
              onChange={(event, newValue) =>
                this.handleFormInput(event, newValue)
              }
              id="area"
              options={countryList().getData()}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.label === value.label
              }
              autoHighlight
              autoComplete={false}
              disableClearable={true}
              renderOption={(option) => (
                <React.Fragment>{option.label}</React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ margin: "0px !important" }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
            <label>Create password</label>
            <div className="SignUpFormsPasswordIcon">
              <input
                id="newPassword"
                type="password"
                value={this.state.newPassword}
                onChange={this.handleFormInput}
                className="SignUpFormsPassword"
                style={
                  this.state.showValidationHelper
                    ? { marginBottom: "10px" }
                    : null
                }
                required
              />
              {this.state.validPassword ? (
                <img
                  className="SignUpFormsPasswordIconCheck"
                  alt="status"
                  src="/icon/check.svg"
                />
              ) : null}
            </div>
            {this.state.showValidationHelper ? (
              <div className="SignUpFormsPasswordValidation">
                <div className="DisplayFlexSpace">
                  <div
                    className="SignUpFormsPasswordValidationPill"
                    style={
                      this.state.validCount >= 1
                        ? this.state.validCount === 4
                          ? { background: "#2EB57E" }
                          : { background: "#EFC225" }
                        : null
                    }
                  ></div>
                  <div
                    className="SignUpFormsPasswordValidationPill"
                    style={
                      this.state.validCount >= 2
                        ? this.state.validCount === 4
                          ? { background: "#2EB57E" }
                          : { background: "#EFC225" }
                        : null
                    }
                  ></div>
                  <div
                    className="SignUpFormsPasswordValidationPill"
                    style={
                      this.state.validCount >= 3
                        ? this.state.validCount === 4
                          ? { background: "#2EB57E" }
                          : { background: "#EFC225" }
                        : null
                    }
                  ></div>
                  <div
                    className="SignUpFormsPasswordValidationPill"
                    style={
                      this.state.validCount === 4
                        ? { background: "#2EB57E" }
                        : null
                    }
                  ></div>
                </div>
                <div>
                  <span
                    style={
                      this.state.validCount === 4
                        ? { color: "#2EB57E" }
                        : { color: "#EFC225" }
                    }
                  >
                    {this.state.validCount === 4 ? "Strong" : "Weak"}
                  </span>
                </div>
              </div>
            ) : null}

            <label>Confirm password</label>
            <div className="SignUpFormsPasswordIcon">
              <input
                id="confirmPassword"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.confirmPassword}
                className="SignUpFormsPassword"
                style={
                  !this.state.passwordConfirm &&
                  this.state.confirmPassword !== ""
                    ? { border: "2px solid #F05050" }
                    : null
                }
                required
              />
              {this.state.passwordConfirm ? (
                <img
                  className="SignUpFormsPasswordIconCheck"
                  alt="status"
                  src="/icon/check.svg"
                />
              ) : null}
            </div>
            {!this.state.passwordConfirm &&
            this.state.confirmPassword !== "" ? (
              <div className="PasswordConfirm">
                <span>! Passwords do not match</span>
              </div>
            ) : null}
            <button
              className={
                this.state.passwordConfirm
                  ? "SignUpFormsSubmit"
                  : "SignUpFormsSubmitDisabled"
              }
              disabled={!this.state.passwordConfirm ? true : false}
              onClick={() => this.handleNext()}
            >
              Next
            </button>
            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              By continuing you agree to JavaOrient’s{" "}
              <button className="RedirectButtonPlain">Privacy Policy</button>{" "}
              and
              <button className="RedirectButtonPlain">
                Terms and Conditions
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <label>What’s your phone number?</label>
            <div className="SignUpFormsTwoInOne">
              <div className="SignUpFormsTwoInOneSmall">
                <Autocomplete
                  value={this.state.countryCode}
                  onChange={(event, newValue) =>
                    this.handleFormInput(event, newValue)
                  }
                  id="countryCode"
                  options={codes}
                  getOptionLabel={(option) => option.countryCodes[0]}
                  getOptionSelected={(option, value) =>
                    option.countryCodes[0] === value.countryCodes[0]
                  }
                  disableClearable={true}
                  renderOption={(option) => (
                    <React.Fragment>+ {option.countryCodes[0]}</React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: "0px !important" }}
                    />
                  )}
                />
              </div>
              <input
                id="phoneNumber"
                type="text"
                maxLength="9"
                value={this.state.phoneNumber}
                onChange={this.handleFormInputNumber}
                required
              />
            </div>
            <label>Select your prefered identification document</label>
            <div className="DisplayFlexSpace">
              <button
                className={
                  this.state.selectedID === "national ID"
                    ? "SignUpFormsClearButtonSelected"
                    : "SignUpFormsClearButton"
                }
                onClick={() => this.setState({ selectedID: "national ID" })}
              >
                National ID
              </button>
              <button
                className={
                  this.state.selectedID === "passport"
                    ? "SignUpFormsClearButtonSelected"
                    : "SignUpFormsClearButton"
                }
                onClick={() => this.setState({ selectedID: "passport" })}
              >
                Passport
              </button>
            </div>
            <label>Enter your {this.state.selectedID} number</label>
            <input
              id="userID"
              type="text"
              maxLength="9"
              value={this.state.userID}
              onChange={this.handleFormInput}
              required
            />
            <button
              className={
                this.state.phoneNumber !== "" && this.state.userID !== ""
                  ? "SignUpFormsSubmit"
                  : "SignUpFormsSubmitDisabled"
              }
              disabled={
                this.state.phoneNumber === "" && this.state.userID === ""
                  ? true
                  : false
              }
              onClick={() => this.handleSubmit()}
            >
              {this.state.isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    style={{ color: "white", marginRight: "10px" }}
                    size={20}
                  />{" "}
                  Creating account . . .
                </div>
              ) : (
                "Create my account"
              )}
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="DisplayFlexSpace" style={{ marginBottom: "20px" }}>
              <div className="Verification">
                <input
                  name="ssn-0"
                  id="0"
                  type="text"
                  // maxLength="1"
                  autoComplete="off"
                  value={this.state.verificationCode[0]}
                  onChange={this.handleVerificationInput}
                  required
                />
              </div>
              <div className="Verification">
                <input
                  name="ssn-1"
                  id="1"
                  type="text"
                  maxLength="1"
                  autoComplete="off"
                  value={this.state.verificationCode[1]}
                  onChange={this.handleVerificationInput}
                  required
                />
              </div>
              <div className="Verification">
                <input
                  name="ssn-2"
                  id="2"
                  type="text"
                  maxLength="1"
                  autoComplete="off"
                  value={this.state.verificationCode[2]}
                  onChange={this.handleVerificationInput}
                  required
                />
              </div>
              <div className="Verification">
                <input
                  name="ssn-3"
                  id="3"
                  type="text"
                  maxLength="1"
                  autoComplete="off"
                  value={this.state.verificationCode[3]}
                  onChange={this.handleVerificationInput}
                  required
                />
              </div>
              <div className="Verification">
                <input
                  name="ssn-4"
                  id="4"
                  type="text"
                  maxLength="1"
                  autoComplete="off"
                  value={this.state.verificationCode[4]}
                  onChange={this.handleVerificationInput}
                  required
                />
              </div>
            </div>
            <button
              className={
                checkArray(this.state.verificationCode)
                  ? "SignUpFormsSubmit"
                  : "SignUpFormsSubmitDisabled"
              }
              disabled={checkArray(this.state.verificationCode) ? false : true}
              onClick={() => this.handleVerification()}
            >
              {this.state.isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    style={{ color: "white", marginRight: "10px" }}
                    size={20}
                  />{" "}
                  Verifying . . .
                </div>
              ) : (
                "Verify"
              )}
            </button>
            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                color: "rgba(37, 37, 37, 0.7)",
              }}
            >
              <span>Didn’t receive any code? </span>
              <button
                className="RedirectButton"
                onClick={() => this.props.history.push("/Login")}
              >
                Resend code
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={{ textAlign: "center", marginTop: "6em" }}>
            <div>
              <CircularProgress
                style={{ color: "rgba(0, 0, 0, 0.42)", marginBottom: "20px" }}
                size={40}
              />
            </div>
            <div>
              <span className="Loader"> Preparing your dashboard . . . .</span>
            </div>
          </div>
        );
      default:
        return <div>Error</div>;
    }
  }

  render() {
    return (
      <div className="ContainerSignUp">
        <CustomSnackbar
          hideAlert={this.snackbarClose}
          showSnack={this.state.snackbaropen}
          hideSnack={this.snackbarClose}
          response={this.state.responseStatus}
          title={this.state.snackbarmsg}
          messagetxt={this.state.snackbartxt} />
        <div className="SignUpContainer">
          <div className="SignForm">
            <SignUpHeader
              title={this.state.title[this.state.activeStep]}
              subtitle={this.state.subtitle[this.state.activeStep]}
            />
            <div
              key={this.state.activeStep}
              className="Form Animation"
              style={
                this.state.activeStep === 3
                  ? { background: "none", boxShadow: "none" }
                  : null
              }
            >
              <div
                className="Stepper"
                style={this.state.activeStep === 3 ? { display: "none" } : null}
              >
                <div className="DisplayFlexSpace">
                  <div
                    className="dot"
                    style={
                      this.state.activeStep >= 0
                        ? { background: "#002AD1" }
                        : null
                    }
                  ></div>
                  <div
                    className="line"
                    style={
                      this.state.activeStep >= 1
                        ? { background: "#002AD1" }
                        : null
                    }
                  ></div>
                </div>
                <div className="DisplayFlexSpace">
                  <div
                    className="dot"
                    style={
                      this.state.activeStep >= 1
                        ? { background: "#002AD1" }
                        : null
                    }
                  ></div>
                  <div
                    className="line"
                    style={
                      this.state.activeStep === 2
                        ? { background: "#002AD1" }
                        : null
                    }
                  ></div>
                </div>
                <div className="DisplayFlexSpace">
                  <div
                    className="dot"
                    style={
                      this.state.activeStep === 2
                        ? { background: "#002AD1" }
                        : null
                    }
                  ></div>
                </div>
              </div>
              <div className="SignFormDetails">
                <MuiThemeProvider theme={customSignUp}>
                  {this.handleDisplay(
                    this.state.activeStep,
                    this.state.countryCode
                  )}
                </MuiThemeProvider>
              </div>
            </div>
            {this.state.activeStep < 2 ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "25px",
                  marginBottom: "25px",
                  color: "#252B33",
                  fontSize: "14px",
                }}
              >
                <span>Already have an account? </span>
                <button
                  className="RedirectButton"
                  onClick={() => this.props.history.push("/Login")}
                >
                  Login
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <SignUpFooter />
      </div>
    );
  }
}
export default SignUpFormPartner;
