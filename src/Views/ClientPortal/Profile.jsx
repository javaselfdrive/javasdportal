import React, { Component } from "react";
import Loader from "../../Components/SharedComponents/Loader";
import TopBar from "../../Components/SharedComponents/TopBar";
import Menu from "../../Components/SharedComponents/Menu";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import PersonalDetails from "../../Components/Profile/PersonalDetails";
import PersonalDocuments from "../../Components/Profile/PersonalDocuments";
import NextKin from "../../Components/Profile/NextKin";
import TradingAgreement from "../../Components/Profile/TradingAgreement";
import VehicleDetails from "../../Components/Profile/VehicleDetails";

const styles = theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      profileButtons: [
        {
          img: "/icon/personal.svg",
          title: "Personal details",
          check: "personalDetailsComplete"
        },
        {
          img: "/icon/kin.svg",
          title: "Next of kin details",
          check: "nextOfKinComplete"
        },
        {
          img: "/icon/documents.svg",
          title: "Verification documents",
          check: "verificationDocsComplete"
        },
        {
          img: "/icon/agreement.svg",
          title: "Trading agreement",
          check: "tradingAgreementComplete"
        },
        {
          img: "/icon/vehicle.svg",
          title: "Vehicle details",
          check: "vehicleDetailsComplete"
        }
      ],
      profileHeader: [
        {
          header: "Complete your profile",
          subtitle:
            "The list below highlights all the missing information weneed in order to complete you profile and verify your business account."
        },
        {
          header: "Personal details",
          subtitle:
            "Please double check these details and ensure they are correct. Also fill up any remaining fields"
        },
        {
          header: "Next of Kin details",
          subtitle: "Please fill in the correct next of Kin details below"
        },
        {
          header: "Verification documents",
          subtitle:
            "Please upload the document you prefer to use for identification (National ID or Passport). These documents will be used as proof of identify of the account holder and owner of the investment account"
        },
        {
          header: "Trading agreement",
          subtitle:
            "Download the document shared below, read fill and sign where required. Scan and upload  a signed copy of the agreement in the field provided. "
        },
        {
          header: "Vehicle details",
          subtitle:
            "To get you started tell us about your cars or fleet. These details will be saved to your profile for easier reference"
        }
      ],
      firstName: "",
      lastName: "",
      email: "",
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
      firstNameKin: "",
      lastNameKin: "",
      emailKin: "",
      countryCodeKin: {
        country: "Kenya",
        countryCodes: ["254"],
        isoCode2: "KE",
        isoCode3: "KEN"
      },
      phoneNumberKin: "",
      addressKin: "",
      nextOfKinComplete: false,
      userID: "",
      userIDDocFront: "",
      userIDDocFrontName: "",
      userIDDocBack: "",
      userIDDocBackName: "",
      selfieIDDoc: "",
      selfieIDDocName: "",
      passportNo: "",
      passportDocFront: "",
      passportDocFrontName: "",
      passportDocBack: "",
      passportDocBackName: "",
      drivingLicenseNo: "",
      drivingLicenseDoc: "",
      drivingLicenseDocName: "",
      verificationDocsComplete: false,
      tradingAgreementDoc: "",
      tradingAgreementDocName: "",
      tradingAgreementComplete: false,
      vehicles: [],
      vehicleDetailsComplete: false,
      percentage: 20,
      success: false,
      open: false,
      isLoading: false,
      blocking: false,
      name:""
    };

    this.handlePersonalDetails = this.handlePersonalDetails.bind(this);
    this.handlePersonalDocuments = this.handlePersonalDocuments.bind(this);
    this.handleNextKinDetails = this.handleNextKinDetails.bind(this);
    this.handleTradingAgreement = this.handleTradingAgreement.bind(this);
    this.handleVehicleDetails = this.handleVehicleDetails.bind(this);
  }

  componentDidMount() {
    var personalDetails = JSON.parse(localStorage.getItem("Personal Details"));
    var userdata =  JSON.parse(localStorage.getItem("userData"));
    
    this.setState({ name: userdata.firstName + ' ' + userdata.lastName});
    if (personalDetails) {
      this.setState({
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        email: personalDetails.email,
        country: personalDetails.country,
        countryCode: personalDetails.countryCode,
        phoneNumber: personalDetails.phoneNumber,
        address: personalDetails.address,
        profilePic: personalDetails.profilePic,
        personalDetailsComplete: personalDetails.personalDetailsComplete
      });
    }

    var nextKin = JSON.parse(localStorage.getItem("Next Kin Details"));
    if (nextKin) {
      this.setState({
        firstNameKin: nextKin.firstName,
        lastNameKin: nextKin.lastName,
        emailKin: nextKin.email,
        countryCodeKin: nextKin.countryCode,
        phoneNumberKin: nextKin.phoneNumber,
        addressKin: nextKin.address,
        nextOfKinComplete: nextKin.nextOfKinComplete
      });
    }

    var personalDocuments = JSON.parse(
      localStorage.getItem("Personal Documents")
    );
    if (personalDocuments) {
      this.setState({
        userID: personalDocuments.userID,
        userIDDocFront: personalDocuments.userIDDocFront,
        userIDDocFrontName: personalDocuments.userIDDocFrontName,
        userIDDocBack: personalDocuments.userIDDocBack,
        userIDDocBackName: personalDocuments.userIDDocBackName,
        selfieIDDoc: personalDocuments.selfieIDDoc,
        selfieIDDocName: personalDocuments.selfieIDDocName,
        passportNo: personalDocuments.passportNo,
        passportDocFront: personalDocuments.passportDocFront,
        passportDocFrontName: personalDocuments.passportDocFrontName,
        passportDocBack: personalDocuments.passportDocBack,
        passportDocBackName: personalDocuments.passportDocBackName,
        drivingLicenseNo: personalDocuments.drivingLicenseNo,
        drivingLicenseDoc: personalDocuments.drivingLicenseDoc,
        drivingLicenseDocName: personalDocuments.drivingLicenseDocName,
        verificationDocsComplete: personalDocuments.verificationDocsComplete
      });
    }

    var tradingAgreement = JSON.parse(
      localStorage.getItem("Trading Agreement")
    );
    if (tradingAgreement) {
      this.setState({
        tradingAgreementDoc:
          tradingAgreement.tradingAgreementDoc ||
          tradingAgreement.payload.tradingAgreementDoc,
        tradingAgreementDocName:
          tradingAgreement.tradingAgreementDocName ||
          tradingAgreement.payload.tradingAgreementDocName,
        tradingAgreementComplete:
          tradingAgreement.tradingAgreementComplete ||
          tradingAgreement.payload.tradingAgreementComplete
      });
    }

    var vehicleDetails = JSON.parse(localStorage.getItem("Vehicle Details"));
    if (vehicleDetails) {
      this.setState({
        vehicles: vehicleDetails.vehicles,
        vehicleDetailsComplete: vehicleDetails.vehicleDetailsComplete
      });
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="ProfileSelect">
            {this.state.profileButtons.map((button, index) => {
              return (
                <button
                  className="ProfileSelectButton"
                  key={index}
                  onClick={() => this.setState({ activeStep: index + 1 })}
                >
                  <div className="DisplayFlexSpace">
                    <div className="ButtonBackgroundPurple">
                      <img
                        src={
                          this.state[button.check] === true
                            ? "/icon/complete.svg"
                            : button.img
                        }
                        alt={button.title}
                      />
                    </div>
                    <span style={{ marginLeft: "20px" }}>{button.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        );
      case 1:
        return (
          <div>
            <PersonalDetails
              handlePersonalDetails={this.handlePersonalDetails}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <NextKin handleNextKinDetails={this.handleNextKinDetails} />
          </div>
        );
      case 3:
        return (
          <div>
            <PersonalDocuments
              handlePersonalDocuments={this.handlePersonalDocuments}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <TradingAgreement
              handleTradingAgreement={this.handleTradingAgreement}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <VehicleDetails handleVehicleDetails={this.handleVehicleDetails} />
          </div>
        );
      case 6:
        return "This is the bit I really care about!";
      default:
        return "Unknown stepIndex";
    }
  }

  handlePersonalDetails(next) {
    var personalDetails = JSON.parse(localStorage.getItem("Personal Details"));
    this.setState({
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      email: personalDetails.email,
      country: personalDetails.country,
      countryCode: personalDetails.countryCode,
      phoneNumber: personalDetails.phoneNumber,
      address: personalDetails.address,
      profilePic: personalDetails.profilePic,
      personalDetailsComplete: personalDetails.personalDetailsComplete,
      activeStep: next
    });
  }

  handleNextKinDetails(next) {
    var nextKin = JSON.parse(localStorage.getItem("Next Kin Details"));
    this.setState({
      firstNameKin: nextKin.firstName,
      lastNameKin: nextKin.lastName,
      emailKin: nextKin.email,
      countryCodeKin: nextKin.countryCode,
      phoneNumberKin: nextKin.phoneNumber,
      addressKin: nextKin.address,
      nextOfKinComplete: nextKin.nextOfKinComplete,
      activeStep: next
    });
  }

  handlePersonalDocuments(next) {
    var personalDocuments = JSON.parse(
      localStorage.getItem("Personal Documents")
    );
    this.setState({
      userID: personalDocuments.userID,
      userIDDocFront: personalDocuments.userIDDocFront,
      userIDDocFrontName: personalDocuments.userIDDocFrontName,
      userIDDocBack: personalDocuments.userIDDocBack,
      userIDDocBackName: personalDocuments.userIDDocBackName,
      selfieIDDoc: personalDocuments.selfieIDDoc,
      selfieIDDocName: personalDocuments.selfieIDDocName,
      passportNo: personalDocuments.passportNo,
      passportDocFront: personalDocuments.passportDocFront,
      passportDocFrontName: personalDocuments.passportDocFrontName,
      passportDocBack: personalDocuments.passportDocBack,
      passportDocBackName: personalDocuments.passportDocBackName,
      drivingLicenseNo: personalDocuments.drivingLicenseNo,
      drivingLicenseDoc: personalDocuments.drivingLicenseDoc,
      drivingLicenseDocName: personalDocuments.drivingLicenseDocName,
      verificationDocsComplete: personalDocuments.verificationDocsComplete,
      activeStep: next
    });
  }

  handleTradingAgreement(next) {
    var tradingAgreement = JSON.parse(
      localStorage.getItem("Trading Agreement")
    );
    if (tradingAgreement) {
      this.setState({
        tradingAgreementDoc:
          tradingAgreement.tradingAgreementDoc ||
          tradingAgreement.payload.tradingAgreementDoc,
        tradingAgreementDocName:
          tradingAgreement.tradingAgreementDocName ||
          tradingAgreement.payload.tradingAgreementDocName,
        tradingAgreementComplete:
          tradingAgreement.tradingAgreementComplete ||
          tradingAgreement.payload.tradingAgreementComplete,
        activeStep: next
      });
    }
  }

  handleVehicleDetails(next) {
    var vehicleDetails = JSON.parse(localStorage.getItem("Vehicle Details"));
    if (vehicleDetails) {
      this.setState({
        vehicles: vehicleDetails.vehicles,
        vehicleDetailsComplete: vehicleDetails.vehicleDetailsComplete,
        activeStep: next
      });
    }
  }

  render() {
    const { classes } = this.props;
    var countComplete = [
      this.state.personalDetailsComplete,
      this.state.nextOfKinComplete,
      this.state.verificationDocsComplete,
      this.state.tradingAgreementComplete,
      this.state.vehicleDetailsComplete
    ];
    return (
      <div>
        {this.state.isLoading ? (
          <Loader text="Preparing your view" />
        ) : (
          <div className="ContainerApp">
            <TopBar username={this.state.name} />
            <div className="MainBody">
              <div className="Menu">
                <Menu complete={countComplete} />
              </div>
              <div className="Content">
                <div
                  className="Profile"
                  style={this.state.activeStep !== 0 ? { width: "100%" } : null}
                >
                  <div
                    className="ProfileHeader"
                    style={
                      this.state.activeStep !== 0 ? { textAlign: "left" } : null
                    }
                  >
                    {this.state.activeStep !== 0 ? (
                      <button
                        className="BackButton"
                        onClick={() => this.setState({ activeStep: 0 })}
                      >
                        <img src="/icon/back.svg" alt="back" />
                        <span>Back</span>
                      </button>
                    ) : null}
                    <span className="MainContentHeader">
                      {this.state.profileHeader[this.state.activeStep].header}
                    </span>
                    <br />
                    <span className="MainContentSubheader">
                      {this.state.profileHeader[this.state.activeStep].subtitle}
                    </span>
                    {this.state.activeStep === 4 ? (
                      <button
                        className="RedirectButton"
                        style={{ color: "#002ad1" }}
                      >
                        Download the trading agreement document
                      </button>
                    ) : null}
                  </div>
                  <div className="ContentSpace">
                    <div className="ProfileForm">
                      <span className={classes.instructions}>
                        {this.getStepContent(this.state.activeStep)}
                      </span>
                    </div>
                    {this.state.personalDetailsComplete &&
                    this.state.nextOfKinComplete &&
                    this.state.verificationDocsComplete &&
                    this.state.tradingAgreementComplete &&
                    this.state.vehicleDetailsComplete ? (
                      <div className="WarningBar" style={{ width: "95%" }}>
                        <img src="/icon/pending.svg" alt="warning" />
                        <div style={{ marginLeft: "15px" }}>
                          <span style={{ margin: "0px", display: "block" }}>
                            Verification review
                          </span>
                          <br />
                          <span
                            className="MainContentSubheader"
                            style={{ margin: "0px" }}
                          >
                            Thank you for submitting your documents. Our team is
                            reviewing through and will get back to update on
                            approval status within the next 24 hours. While you
                            wait feel free to{" "}
                          </span>
                          <button
                            className="RedirectButton"
                            style={{ color: "#002ad1" }}
                          >
                            take a tour
                          </button>
                          <span
                            className="MainContentSubheader"
                            style={{ margin: "0px" }}
                          >
                            {" "}
                            of our dashbaord and explore{" "}
                          </span>
                          <button
                            className="RedirectButton"
                            style={{ color: "#002ad1" }}
                          >
                            other features
                          </button>
                          <span
                            className="MainContentSubheader"
                            style={{ margin: "0px" }}
                          >
                            {" "}
                            and their capability
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="ProfileHelp">
                  <span className="MainContentSubheader">
                    Incase you’ll be struggling with any of these steps, contact
                    our customer support team at{" "}
                  </span>
                  <button
                    className="BackButton"
                    style={{ display: "inline", margin: 0, color: "#002AD1" }}
                  >
                    contactsupport@email.com
                  </button>
                  <span className="MainContentSubheader">
                    . We are here to help you.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Profile));
