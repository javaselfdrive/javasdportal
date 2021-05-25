import React, { Component } from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  CircularProgress,
  TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import codes from "country-calling-code";
import { validateEmail, numberCheck } from "../../Utilities/SharedFunctions";
import { post_request } from "../../Services/FetchFunctions";
import CustomSnackbar from "../SharedComponents/CustomSnackbar";

const customNextKin = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiInput: {
      root: {
        position: "inherit",
        height: "45px"
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
        marginTop: "0px",
        marginBottom: "20px",
        height: "45px",
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
        boxShadow: "none !important"
      }
    },
    MuiAutocomplete: {
      input: {
        border: "none !important",
        margin: "0px !important"
      }
    },
    MuiIconButton: {
      root: {
        background: "none !important",
        "&:hover": {
          border: "none !important"
        },
        "&:focus": {
          border: "none !important"
        }
      }
    }
  }
});

class NextKin extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      validEmail: false,
      countryCode: {
        country: "Kenya",
        countryCodes: ["254"],
        isoCode2: "KE",
        isoCode3: "KEN"
      },
      phoneNumber: "",
      address: "",
      nextOfKinComplete: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: '',
      isloading: false
    };

    this.handleFormInputNumber = this.handleFormInputNumber.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  componentDidMount() {
    var nextKin = JSON.parse(localStorage.getItem("Next Kin Details"));
    if (nextKin) {
      this.setState({
        firstName: nextKin.firstName,
        lastName: nextKin.lastName,
        email: nextKin.email,
        validEmail: nextKin.validEmail,
        countryCode: nextKin.countryCode,
        phoneNumber: nextKin.phoneNumber,
        nextOfKinComplete: nextKin.nextOfKinComplete,
        address: nextKin.address
      });
    }
  }

  handleFormInputNumber(event) {
    if (event.target.value.length > 0) {
      if (numberCheck(event.target.value)) {
        this.setState({ [event.target.id]: event.target.value });
      }
    } else {
      this.setState({ [event.target.id]: "" });
    }
    localStorage.setItem("Next Kin Details", JSON.stringify(this.state));
  }

  handleFormInput(event) {
    if (event.target.id) {
      if (event.target.id === "email") {
        this.setState({ validEmail: validateEmail(event.target.value) });
      }
      this.setState({ [event.target.id]: event.target.value });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }

    localStorage.setItem("Next Kin Details", JSON.stringify(this.state));
  }
  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit() {
    var payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.countryCode.countryCodes[0] + this.state.phoneNumber,
      address: this.state.address,
    };
    var payload2 = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      validEmail: this.state.validEmail,
      countryCode: this.state.countryCode,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      nextOfKinComplete: true
    }
    console.log(payload2);
    var url = `user/add-next-kin`;
    post_request(url,payload).then(resp=>{
      console.log(resp);
      this.setState({
        isloading: false, snackbaropen: true, snackbarmsg: 'Creation Failed',
        responseStatus: 'failed', snackbartxt: 'kindly try again'
      });
      localStorage.setItem("Next Kin Details", JSON.stringify(payload2));
      this.props.handleNextKinDetails(3);
    }).catch(err=>{
       console.log(err);
    });

   


  }

  render() {
    return (
      <div className="PersonalInfo">
        <CustomSnackbar
          hideAlert={this.snackbarClose}
          showSnack={this.state.snackbaropen}
          hideSnack={this.snackbarClose}
          response={this.state.responseStatus}
          title={this.state.snackbarmsg}
          messagetxt={this.state.snackbartxt} />
        <MuiThemeProvider theme={customNextKin}>
          <div className="PersonalInfoForm">
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
            <label>Email address (Optional)</label>
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
            <label>Phone number</label>
            <div className="SignUpFormsTwoInOne">
              <div className="SignUpFormsTwoInOneSmall">
                <Autocomplete
                  value={this.state.countryCode}
                  onChange={(event, newValue) =>
                    this.handleFormInput(event, newValue)
                  }
                  id="countryCode"
                  options={codes}
                  getOptionLabel={option => option.countryCodes[0]}
                  getOptionSelected={(option, value) =>
                    option.countryCodes[0] === value.countryCodes[0]
                  }
                  disableClearable={true}
                  renderOption={option => (
                    <React.Fragment>+ {option.countryCodes[0]}</React.Fragment>
                  )}
                  renderInput={params => (
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
                autoComplete="off"
                maxLength="9"
                value={this.state.phoneNumber}
                onChange={this.handleFormInputNumber}
                required
              />
            </div>
            <label>Physical address</label>
            <input
              id="address"
              type="text"
              value={this.state.address}
              onChange={this.handleFormInput}
              required
            />
            <button
              className={
                this.state.phoneNumber !== "" && this.state.address !== ""
                  ? "SignUpFormsSubmit"
                  : "SignUpFormsSubmitDisabled"
              }
              disabled={
                this.state.phoneNumber === "" && this.state.address === ""
                  ? true
                  : false
              }
              onClick={() => this.handleSubmit()}
            >
              Save and continue
            </button>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default NextKin;
