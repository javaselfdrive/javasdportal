import React, { Component } from "react";
import CustomSnackbar from "../SharedComponents/CustomSnackbar";
import { post_request } from "../../Services/FetchFunctions";


class TradingAgreement extends Component {
  constructor() {
    super();
    this.state = {
      tradingAgreementDoc: "",
      tradingAgreementDocName: "",
      tradingAgreementComplete: false,
      fileTooBig: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: '',
    };

    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
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
  }

  handleFile = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      var fileId = event.target.id;
      var fileName = event.target.files[0].name;

      if (event.target.files[0].size <= 1000000) {
        reader.onload = e => {
          this.setState({
            [fileId]: e.target.result,
            [fileId + "Name"]: fileName,
            fileTooBig: false
          });
          localStorage.setItem(
            "Trading Agreement",
            JSON.stringify({
              tradingAgreementDoc: e.target.result,
              tradingAgreementDocName: fileName,
              tradingAgreementComplete: true
            })
          );
        };
        reader.readAsDataURL(event.target.files[0]);
        const imageData = new FormData();
        imageData.append('docFile',event.target.files[0]);
        
        var documentNumber = Math.floor(Math.random() * 17590) + 1;
        var endpoint = `upload/document/${event.target.id}/${documentNumber}`;
        post_request(endpoint,imageData).then(resp=>{
          console.log(resp);
          this.setState({
             snackbaropen: true, snackbarmsg: 'Upload success', responseStatus: 'success'
          })
        }).catch(err=>{
          console.log(err);
          this.setState({
             snackbaropen: true, snackbarmsg: 'Upload failed', responseStatus: 'failed'
          });
        });
      
      } else {
        this.setState({ fileTooBig: true });
      }
    }
  };

  handleSubmit() {
    var payload = {
      tradingAgreementDoc: this.state.tradingAgreementDoc,
      tradingAgreementDocName: this.state.tradingAgreementDocName,
      tradingAgreementComplete: true
    };
    localStorage.setItem("Trading Agreement", JSON.stringify({ payload }));
    this.props.handleTradingAgreement(5);
  }

  render() {
    return (
      <div>
        <CustomSnackbar
          hideAlert={this.snackbarClose}
          showSnack={this.state.snackbaropen}
          hideSnack={this.snackbarClose}
          response={this.state.responseStatus}
          title={this.state.snackbarmsg}
          messagetxt={this.state.snackbartxt} />
        <div className="WarningBar">
          <img src="/icon/warning.svg" alt="warning" />
          <span>
            Ensure the document is signed appropriately and upload in PDF format
            only and not more than 10MB in size
          </span>
        </div>
        <div
          className="ProfileSaveButton"
          style={{ marginTop: "40px", marginBottom: "20px" }}
        >
          {this.state.tradingAgreementDoc === "" ? (
            <div>
              <input
                id="tradingAgreementDoc"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                hidden
                capture
                onChange={this.handleFile}
              />
              <div
                className="DocumentUploadButton"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("tradingAgreementDoc").click();
                }}
              >
                <img
                  src="/icon/upload.svg"
                  alt="upload"
                  style={{ marginRight: "25px" }}
                />
                <div>
                  <span>Click here to upload the signed trading agreement</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="DocumentUploadImage">
              <label className="DocumentUploadSubtitle">
                {this.state.tradingAgreementDocName}
              </label>
              <div className="DisplayFlex1" style={{ alignItems: "center" }}>
                <div className="LoadedFile"></div>
                <img
                  src="/icon/delete.svg"
                  alt="del"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({
                      tradingAgreementDoc: "",
                      tradingAgreementDocName: ""
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="ProfileSaveButton">
          <button
            className={
              this.state.tradingAgreementDoc !== "" &&
              this.state.tradingAgreementDocName !== ""
                ? "SignUpFormsSubmit"
                : "SignUpFormsSubmitDisabled"
            }
            disabled={
              this.state.tradingAgreementDoc !== "" &&
              this.state.tradingAgreementDocName !== ""
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
export default TradingAgreement;
