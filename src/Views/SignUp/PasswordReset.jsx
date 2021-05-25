import React, { Component } from "react";
import SignUpHeader from "../../Components/SharedComponents/SignUpHeader";
import SignUpFooter from "../../Components/SharedComponents/SignUpFooter";
import { validateEmail } from "../../Utilities/SharedFunctions";
import { CircularProgress } from "@material-ui/core";
import { post_request, getRequest } from "../../Services/FetchFunctions";
import CustomSnackbar from "../../Components/SharedComponents/CustomSnackbar";

class PasswordReset extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      completed: 5,
      buffer: 10,
      title: "",
      message: "",
      validEmail: false,
      success: false,
      open: false,
      isLoading: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: ''
    };
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleFormInput(event) {
    this.setState({ [event.target.id]: event.target.value });
    if (event.target.id === "email") {
      this.setState({ validEmail: validateEmail(event.target.value) });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    //var endpoint = `confirm-email/{token}`;
    const url = `password-reset`;
    var payload = {
      email: this.state.email
    };
    post_request(url,payload).then(resp=> {
      this.setState({
        isLoading: false,snackbaropen: true, snackbarmsg: 'Email sent successfully', responseStatus: 'success'
     });

     this.props.history.push('/Login');
    }).catch(err=>{
      console.log(err);
      this.setState({
        isLoading: false,snackbaropen: true, snackbarmsg: 'Email not sent', responseStatus: 'failed'
     });
    });
    // setTimeout(() => this.props.history.push("/Dashboard"), 2000);
  };
  snackbarClose = event => {
    this.setState({ snackbaropen: false }); 
  };

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
              title="Reset password"
              subtitle="Enter your email address below, and we’ll send you a link to reset your password"
            />
            <div className="Form Animation">
              <div className="SignFormDetails">
                <label>Email address</label>
                <input
                  id="email"
                  type="email"
                  value={this.state.email}
                  style={
                    this.state.email !== "" && this.state.validEmail !== true
                      ? { border: "1px solid #F05050" }
                      : null
                  }
                  onChange={this.handleFormInput}
                  required
                />
                <button
                  className={
                    !this.state.validEmail
                      ? "SignUpFormsSubmitDisabled"
                      : "SignUpFormsSubmit"
                  }
                  disabled={!this.state.validEmail ? true : false}
                  onClick={() => this.handleSubmit()}
                >
                  {this.state.isLoading ? (
                    <CircularProgress style={{ color: "white" }} size={20} />
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                marginBottom: "25px",
                color: "#252B33",
                fontSize: "14px"
              }}
            >
              <span>Didn’t receive the link? </span>
              <button className="RedirectButton">Resend link</button>
            </div>
          </div>
        </div>
        <SignUpFooter />
      </div>
    );
  }
}
export default PasswordReset;
