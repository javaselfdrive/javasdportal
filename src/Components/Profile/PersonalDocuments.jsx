import React, { Component } from "react";
import { numberCheck } from "../../Utilities/SharedFunctions";
import { post_request, getRequest } from "../../Services/FetchFunctions";
import CustomSnackbar from "../SharedComponents/CustomSnackbar";

class PersonalDocuments extends Component {
  constructor() {
    super();
    this.state = {
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
      drivingLicenseDocFront: "",
      drivingLicenseDocFrontName: "",
      drivingLicenseDocBack: "",
      drivingLicenseDocBackName: "",
      verificationDocsComplete: false,
      fileTooBig: false,
      responseStatus: "",
      snackbaropen: false,
      snackbarmsg: "",
      snackbartxt: "",
    };

    this.handleFormInputNumber = this.handleFormInputNumber.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
  }

  componentDidMount() {
    //get documents
    const url = ``;
    getRequest();
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
        drivingLicenseDocFront: personalDocuments.drivingLicenseDocFront,
        drivingLicenseDocFrontName:
          personalDocuments.drivingLicenseDocFrontName,
        drivingLicenseDocBack: personalDocuments.drivingLicenseDocBack,
        drivingLicenseDocBackName: personalDocuments.drivingLicenseDocBackName,
        verificationDocsComplete: personalDocuments.verificationDocsComplete,
        fileTooBig: false,
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
    localStorage.setItem("Personal Documents", JSON.stringify(this.state));
  }

  handleFormInput(event) {
    this.setState({ [event.target.id]: event.target.value });

    localStorage.setItem("Personal Documents", JSON.stringify(this.state));
  }

  handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      var fileId = event.target.id;
      var fileName = event.target.files[0].name;
      let reader = new FileReader();
      if (event.target.files[0].size <= 1000000) {
        reader.onload = (e) => {
          this.setState({
            [fileId]: e.target.result,
            [fileId + "Name"]: fileName,
            fileTooBig: false,
          });
        };
        reader.readAsDataURL(event.target.files[0]);
        var file_info = event.target.files[0];

        //console.log(file_info);
        const imageData = new FormData();
        imageData.append("docFile", file_info);

        var documentNumber = "";
        if (
          event.target.id === "userIDDocFront" ||
          event.target.id === "userIDDocBack" || event.target.id === "selfieIDDoc"
        ) {
          documentNumber = this.state.userID;
        } else if (
          event.target.id === "passportDocFront" ||
          event.target.id === "passportDocBack"
        ) {
          documentNumber = this.state.passportNo;
        } else if (
          event.target.id === "drivingLicenseDocFront" ||
          event.target.id === "drivingLicenseDocBack"
        ) {
          documentNumber = this.state.drivingLicenseNo;
        }

        var endpoint = `upload/document/${event.target.id}/${documentNumber}`;
        post_request(endpoint, imageData)
          .then((resp) => {
            console.log(resp);
            this.setState({
              snackbaropen: true,
              snackbarmsg: "Upload success",
              responseStatus: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              snackbaropen: true,
              snackbarmsg: "Upload failed",
              responseStatus: "failed",
            });
          });
        localStorage.setItem("Personal Documents", JSON.stringify(this.state));
      } else {
        this.setState({ fileTooBig: true });
      }
    }
  };
  removeFile(name, e) {
    var url = `upload/document/delete/${e.target.id}`;
    e.preventDefault();
    getRequest(url)
      .then((resp) => {
        console.log(resp);
        this.setState({
          snackbaropen: true,
          responseStatus: "success",
          snackbarmsg: "Delete success",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          snackbaropen: true,
          responseStatus: "failed",
          snackbarmsg: "Delete failed",
        });
      });
  }

  handleSubmit() {
    var payload = {
      userID: this.state.userID,
      userIDDocFront: this.state.userIDDocFront,
      userIDDocFrontName: this.state.userIDDocFrontName,
      userIDDocBack: this.state.userIDDocBack,
      userIDDocBackName: this.state.userIDDocBackName,
      selfieIDDoc: this.state.selfieIDDoc,
      selfieIDDocName: this.state.selfieIDDocName,
      passportNo: this.state.passportNo,
      passportDocFront: this.state.passportDocFront,
      passportDocFrontName: this.state.passportDocFrontName,
      passportDocBack: this.state.passportDocBack,
      passportDocBackName: this.state.passportDocBackName,
      drivingLicenseNo: this.state.drivingLicenseNo,
      drivingLicenseDocFront: this.state.drivingLicenseDocFront,
      drivingLicenseDocFrontName: this.state.drivingLicenseDocFrontName,
      drivingLicenseDocBack: this.state.drivingLicenseDocBack,
      drivingLicenseDocBackName: this.state.drivingLicenseDocBackName,
      verificationDocsComplete: true,
    };
    localStorage.setItem("Personal Documents", JSON.stringify(payload));
    this.props.handlePersonalDocuments(4);
  }
  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <div>
        <CustomSnackbar
          hideAlert={this.snackbarClose}
          showSnack={this.state.snackbaropen}
          hideSnack={this.snackbarClose}
          response={this.state.responseStatus}
          title={this.state.snackbarmsg}
          messagetxt={this.state.snackbartxt}
        />
        <div className="WarningBar">
          <img src="/icon/warning.svg" alt="warning" />
          <span>
            Ensure all documents are valid. All files should be in PNG, JPG or
            PDF formats and not more than 10MB
          </span>
        </div>
        <div className="DocumentUploadView">
          <div className="DocumentUploadForm">
            <div>
              <label>Identity card number</label>
              <input
                id="userID"
                type="text"
                maxLength="9"
                value={this.state.userID}
                onChange={this.handleFormInputNumber}
                required
              />
              <div>
                <label>Picture of your National ID</label>
                <label
                  className="DocumentUploadSubtitle"
                  style={{ marginTop: "10px" }}
                >
                  Upload both sides of the identity card
                </label>
                <div style={{ marginTop: "20px" }}>
                  {this.state.userIDDocBack === "" ||
                  this.state.userIDDocFront === "" ? (
                    <div>
                      <input
                        id={
                          this.state.userIDDocFront === ""
                            ? "userIDDocFront"
                            : "userIDDocBack"
                        }
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        hidden
                        capture
                        onChange={this.handleFile}
                      />
                      <div
                        className="DocumentUploadButton"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(
                              this.state.userIDDocFront === ""
                                ? "userIDDocFront"
                                : "userIDDocBack"
                            )
                            .click();
                        }}
                      >
                        <img
                          src="/icon/upload.svg"
                          alt="upload"
                          style={{ marginRight: "25px" }}
                        />
                        <div>
                          <span>Drag and drop file or </span>
                          <br />
                          <span
                            style={{
                              textDecoration: "underline",
                              lineHeight: "1.5em",
                            }}
                          >
                            Click to browse
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.userIDDocFront !== "" ? (
                    <div className="DocumentUploadImage">
                      <label className="DocumentUploadSubtitle">
                        {this.state.userIDDocFrontName}
                      </label>
                      <div
                        className="DisplayFlex1"
                        style={{ alignItems: "center" }}
                      >
                        <div className="LoadedFile"></div>
                        <img
                          src="/icon/delete.svg"
                          alt="del"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              userIDDocFront: "",
                              userIDDocFrontName: "",
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {this.state.userIDDocBack !== "" ? (
                    <div className="DocumentUploadImage">
                      <label className="DocumentUploadSubtitle">
                        {this.state.userIDDocBackName}
                      </label>
                      <div
                        className="DisplayFlex1"
                        style={{ alignItems: "center" }}
                      >
                        <div className="LoadedFile"></div>
                        <img
                          src="/icon/delete.svg"
                          alt="del"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              userIDDocBack: "",
                              userIDDocBackName: "",
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <hr />
                <label>Selfie with your identity document</label>
                <label
                  className="DocumentUploadSubtitle"
                  style={{ marginTop: "10px" }}
                >
                  Please take a selfie holding you identity document next to
                  your face. Ensure the document is clearly visible.
                </label>
                <div style={{ marginTop: "20px" }}>
                  {this.state.selfieIDDoc === "" ? (
                    <div>
                      <input
                        id="selfieIDDoc"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        hidden
                        capture
                        onChange={this.handleFile}
                      />
                      <div
                        className="DocumentUploadButton"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("selfieIDDoc").click();
                        }}
                      >
                        <img
                          src="/icon/upload.svg"
                          alt="upload"
                          style={{ marginRight: "25px" }}
                        />
                        <div>
                          <span>Drag and drop file or </span>
                          <br />
                          <span
                            style={{
                              textDecoration: "underline",
                              lineHeight: "1.5em",
                            }}
                          >
                            Click to browse
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="DocumentUploadImage">
                      <label className="DocumentUploadSubtitle">
                        {this.state.selfieIDDocName}
                      </label>
                      <div
                        className="DisplayFlex1"
                        style={{ alignItems: "center" }}
                      >
                        <div className="LoadedFile"></div>
                        <img
                          src="/icon/delete.svg"
                          alt="del"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              selfieIDDoc: "",
                              selfieIDDocName: "",
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="DocumentUploadMiddle">
            <div className="DocumentUploadSubtitle">- or -</div>
          </div>
          <div className="DocumentUploadForm">
            <div>
              <label>Passport number</label>
              <input
                id="passportNo"
                type="text"
                maxLength="9"
                value={this.state.passportNo}
                onChange={this.handleFormInput}
              />
              <div>
                <label>Picture of your passport</label>
                <label
                  className="DocumentUploadSubtitle"
                  style={{ marginTop: "10px" }}
                >
                  Upload both sides of the passport
                </label>
                <div style={{ marginTop: "20px" }}>
                  {this.state.passportDocFront === "" ||
                  this.state.passportDocBack === "" ? (
                    <div>
                      <input
                        id={
                          this.state.passportDocFront === ""
                            ? "passportDocFront"
                            : "passportDocBack"
                        }
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        hidden
                        capture
                        onChange={this.handleFile}
                      />
                      <div
                        className="DocumentUploadButton"
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(
                              this.state.passportDocFront === ""
                                ? "passportDocFront"
                                : "passportDocBack"
                            )
                            .click();
                        }}
                      >
                        <img
                          src="/icon/upload.svg"
                          alt="upload"
                          style={{ marginRight: "25px" }}
                        />
                        <div>
                          <span>Drag and drop file or </span>
                          <br />
                          <span
                            style={{
                              textDecoration: "underline",
                              lineHeight: "1.5em",
                            }}
                          >
                            Click to browse
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.passportDocFront !== "" ? (
                    <div className="DocumentUploadImage">
                      <label className="DocumentUploadSubtitle">
                        {this.state.passportDocFrontName}
                      </label>
                      <div
                        className="DisplayFlex1"
                        style={{ alignItems: "center" }}
                      >
                        <div className="LoadedFile"></div>
                        <img
                          src="/icon/delete.svg"
                          alt="del"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              passportDocFront: "",
                              passportDocFrontName: "",
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {this.state.passportDocBack !== "" ? (
                    <div className="DocumentUploadImage">
                      <label className="DocumentUploadSubtitle">
                        {this.state.passportDocBackName}
                      </label>
                      <div
                        className="DisplayFlex1"
                        style={{ alignItems: "center" }}
                      >
                        <div className="LoadedFile"></div>
                        <img
                          src="/icon/delete.svg"
                          alt="del"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.setState({
                              passportDocBack: "",
                              passportDocBackName: "",
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="DocumentUploadMiddle" style={{ width: "2%" }}></div>
          <div className="DocumentUploadForm">
            <div>
              <label>Driving license number (Optional)</label>
              <input
                id="drivingLicenseNo"
                type="text"
                value={this.state.drivingLicenseNo}
                onChange={this.handleFormInput}
                required
              />
              <label>Upload both sides of the driver’s license</label>
              <label
                className="DocumentUploadSubtitle"
                style={{ marginTop: "10px" }}
              >
                Ensure your license is valid
              </label>
              <div style={{ marginTop: "20px" }}>
                {this.state.drivingLicenseDocBack === "" ||
                this.state.drivingLicenseDocFront === "" ? (
                  <div>
                    <input
                      id={
                        this.state.drivingLicenseDocFront === ""
                          ? "drivingLicenseDocFront"
                          : "drivingLicenseDocBack"
                      }
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      hidden
                      capture
                      onChange={this.handleFile}
                    />
                    <div
                      className="DocumentUploadButton"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(
                            this.state.drivingLicenseDocFront === ""
                              ? "drivingLicenseDocFront"
                              : "drivingLicenseDocBack"
                          )
                          .click();
                      }}
                    >
                      <img
                        src="/icon/upload.svg"
                        alt="upload"
                        style={{ marginRight: "25px" }}
                      />
                      <div>
                        <span>Drag and drop file or </span>
                        <br />
                        <span
                          style={{
                            textDecoration: "underline",
                            lineHeight: "1.5em",
                          }}
                        >
                          Click to browse
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
                {this.state.drivingLicenseDocFront !== "" ? (
                  <div className="DocumentUploadImage">
                    <label className="DocumentUploadSubtitle">
                      {this.state.drivingLicenseDocFrontName}
                    </label>
                    <div
                      className="DisplayFlex1"
                      style={{ alignItems: "center" }}
                    >
                      <div className="LoadedFile"></div>
                      <img
                        src="/icon/delete.svg"
                        alt="del"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          this.setState({
                            drivingLicenseDocFront: "",
                            drivingLicenseDocFrontName: "",
                          })
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {this.state.drivingLicenseDocBack !== "" ? (
                  <div className="DocumentUploadImage">
                    <label className="DocumentUploadSubtitle">
                      {this.state.drivingLicenseDocBackName}
                    </label>
                    <div
                      className="DisplayFlex1"
                      style={{ alignItems: "center" }}
                    >
                      <div className="LoadedFile"></div>
                      <img
                        src="/icon/delete.svg"
                        alt="del"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          this.setState({
                            drivingLicenseDocBack: "",
                            drivingLicenseDocBackName: "",
                          })
                        }
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="ProfileSaveButton">
          <button
            className={
              (this.state.user !== "" &&
                this.state.userIDDocFront !== "" &&
                this.state.userIDDocBack !== "" &&
                this.state.selfieIDDoc !== "") ||
              (this.state.passportNo !== "" &&
                this.state.passportDocFront !== "" &&
                this.state.passportDocBack !== "")
                ? "SignUpFormsSubmit"
                : "SignUpFormsSubmitDisabled"
            }
            disabled={
              (this.state.user !== "" &&
                this.state.userIDDocFront !== "" &&
                this.state.userIDDocBack !== "" &&
                this.state.selfieIDDoc !== "") ||
              (this.state.passportNo !== "" &&
                this.state.passportDocFront !== "" &&
                this.state.passportDocBack !== "")
                ? false
                : true
            }
            onClick={() => this.handleSubmit()}
          >
            Save and continue
          </button>
        </div>
      </div>
    );
  }
}
export default PersonalDocuments;
