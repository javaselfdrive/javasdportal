import React, { Component } from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  CircularProgress,
  TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import countryList from "react-select-country-list";
import codes from "country-calling-code";
import { validateEmail, numberCheck } from "../../Utilities/SharedFunctions";
import { post_request } from "../../Services/FetchFunctions";
import CustomSnackbar from "../SharedComponents/CustomSnackbar";


const customPersonalDetails = createMuiTheme({
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

class PersonalDetails extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      validEmail: false,
      country: { value: "KE", label: "Kenya" },
      countryCode: {
        country: "Kenya",
        countryCodes: ["254"],
        isoCode2: "KE",
        isoCode3: "KEN"
      },
      phoneNumber: "",
      address: "",
      profilePic: "",
      personalDetailsComplete: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: '',
      isloading: false
    };

    this.handleFormInputNumber = this.handleFormInputNumber.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    var countryCode = codes
      .filter(
        codes =>
          codes.countryCodes[0] === userData.phoneNumber.substring(0, 3)
      )
      .map(({ country, countryCodes, isoCode2, isoCode3 }) => ({
        country,
        countryCodes,
        isoCode2,
        isoCode3
      }));

    var profileCountryList = countryList().getData();

    var countrySelected = profileCountryList
      .filter(
        profileCountryList =>
          profileCountryList.label === countryCode[0].country
      )
      .map(({ value, label }) => ({
        value,
        label
      }));

    var personalDetails = JSON.parse(localStorage.getItem("Personal Details"));
    if (personalDetails) {
      this.setState({
        firstName:
          personalDetails.firstName !== ""
            ? personalDetails.firstName
            : userData.firstName,
            lastName: personalDetails.lastName,
            email: personalDetails.email,
            validEmail: personalDetails.validEmail,
            country: personalDetails.country,
            countryCode: personalDetails.countryCode,
            phoneNumber: personalDetails.phoneNumber.substring(3, 14),
            address: personalDetails.address,
            profilePic: personalDetails.profilePic,
        personalDetailsComplete: personalDetails.personalDetailsComplete
      });
    }else if(userData !== undefined){
      this.setState({
        firstName: userData.firstName,
        lastName: userData.lastName,
         email: userData.email,
         validEmail: validateEmail(userData.email),
        //country: userData.country,
        phoneNumber: userData.phoneNumber.substring(3, 14),
        personalDetailsComplete: true
      })
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
    localStorage.setItem("Personal Details", JSON.stringify(this.state));
  }

  handleFormInput(event, country) {
    var countries = countryList().getData();
    if (event.target.id) {
      if (event.target.id.includes("countryCode")) {
        var countrySelected = countries
          .filter(countries => countries.label === country.country)
          .map(({ value, label }) => ({
            value,
            label
          }));
        this.setState({
          countryCode: country,
          country: countrySelected[0]
        });
      } else if (event.target.id.includes("area")) {
        this.setState({ country: country });
      } else {
        this.setState({ [event.target.id]: event.target.value });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
    if (event.target.id === "email") {
      this.setState({ validEmail: validateEmail(event.target.value) });
    }
    localStorage.setItem("Personal Details", JSON.stringify(this.state));
  }

  handleFile = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ profilePic: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
      var imageData = new FormData();
      imageData.append('imageFile', event.target.files[0]);

      var endpoint = `upload/image/profilePic`;
      console.log(endpoint);
      post_request(endpoint,imageData).then(resp=>{
        console.log(resp)
        this.setState({
          snackbaropen: true, snackbarmsg: 'Upload success', responseStatus: 'success'
        })
      }).catch(err=>{
        console.log(err)
        this.setState({
          snackbaropen: true, snackbarmsg: 'Upload failed', responseStatus: 'failed'
        })
      });
    }
    localStorage.setItem("Personal Details", JSON.stringify(this.state));
  };

  handleSubmit() {
    var payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      countryCode: this.state.countryCode,
      country: this.state.country,
      validEmail: this.state.validEmail,
      address: this.state.address,
      profilePic: this.state.profilePic,
      personalDetailsComplete: true
    };
    localStorage.setItem("Personal Details", JSON.stringify(payload));
    this.props.handlePersonalDetails(2);
  }
snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };


  render() {
    return (
      <div className="DisplayFlex PersonalInfo">
      <CustomSnackbar
          hideAlert={this.snackbarClose}
          showSnack={this.state.snackbaropen}
          hideSnack={this.snackbarClose}
          response={this.state.responseStatus}
          title={this.state.snackbarmsg}
          messagetxt={this.state.snackbartxt} />
        <MuiThemeProvider theme={customPersonalDetails}>
          <div className="ProfileImage">
            {this.state.profilePic === "" ? (
              <div style={{ textAlign: "center" }}>
                <input
                  id="profilePic"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  hidden
                  capture
                  onChange={this.handleFile}
                />
                <img
                  src="/icon/profilePic.svg"
                  alt="profile"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById("profilePic").click();
                  }}
                />
                <div className="DeleteImage">
                  <img
                    src="/icon/edit.svg"
                    alt="trash"
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById("profilePic").click();
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={this.state.profilePic}
                  alt="ProfilePicture"
                  className="ProfilePicture"
                />
                <div className="DeleteImage">
                  <img
                    src="/icon/trash.svg"
                    alt="trash"
                    onClick={() => this.setState({ profilePic: "" })}
                  />
                </div>
              </div>
            )}
          </div>
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
            <label>Email address</label>
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
                maxLength="9"
                value={this.state.phoneNumber}
                onChange={this.handleFormInputNumber}
                required
              />
            </div>
            <label>Country of residence</label>
            <Autocomplete
              style={{ marginTop: "10px" }}
              value={this.state.country}
              onChange={(event, newValue) =>
                this.handleFormInput(event, newValue)
              }
              id="area"
              options={countryList().getData()}
              getOptionLabel={option => option.label}
              getOptionSelected={(option, value) =>
                option.label === value.label
              }
              autoHighlight
              autoComplete={false}
              disableClearable={true}
              renderOption={option => (
                <React.Fragment>{option.label}</React.Fragment>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  style={{ margin: "0px !important" }}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password"
                  }}
                />
              )}
            />
            <label>Address</label>
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
export default PersonalDetails;
