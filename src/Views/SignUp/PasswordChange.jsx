import React, { Component } from "react";
import SignUpHeader from "../../Components/SharedComponents/SignUpHeader";
import SignUpFooter from "../../Components/SharedComponents/SignUpFooter";
import {
  numberCheck,
  passwordStrength,
  charCheck,
  alphaCheck
} from "../../Utilities/SharedFunctions";
import { CircularProgress } from "@material-ui/core";
import { post_request,getRequest } from "../../Services/FetchFunctions";
import CustomSnackbar from "../../Components/SharedComponents/CustomSnackbar";

class PasswordChange extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      userName: "",
      validCount: 0,
      completed: 5,
      buffer: 10,
      message: "",
      success: false,
      open: false,
      isLoading: false,
      showValidationHelper: false,
      validPassword: false,
      passwordConfirm: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: '',
      disable: false
    };
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
  }

  componentDidMount(){
    var searchParams = new URLSearchParams(window.location.search);
    var token = searchParams.get("confirm-token");
    var url = `confirm-token/${token}`;
    console.log(url);
    getRequest(url).then(resp=>{
      console.log(resp);
      this.setState({ responseStatus:'success', snackbaropen:true, snackbarmsg: resp.data.Message});
      if(resp.data.Status !== "00"){
        this.setState({disabled:true})
      }
    }).catch(err=>{
      //console.log(err.message);
      if(err.message === 'Request failed with status code 400'){
        this.setState({ responseStatus:'failed', snackbaropen:true, snackbarmsg: 'Your reset link has expired.',
      snackbartxt: 'Kindly resend your email address.'});
      }else{
        this.setState({ responseStatus:'failed', snackbaropen:true, snackbarmsg: 'Something went wrong', snackbartxt:err.message });
      }
      
    })

  }
  handleFormInput(event) {
    this.setState({ [event.target.id]: event.target.value });
    if (event.target.id === "newPassword" && event.target.value.length > 0) {
      this.setState({
        showValidationHelper: true,
        confirmPassword: "",
        passwordConfirm: false
      });
      var validationArray = [
        event.target.value.length < 8 ? false : true,
        alphaCheck(event.target.value),
        numberCheck(event.target.value),
        charCheck(event.target.value)
      ];
      var numOfTrue = validationArray.filter(function(x) {
        return x === true;
      }).length;
      if (passwordStrength(event.target.value)) {
        this.setState({
          validPassword: true,
          validCount: numOfTrue
        });
      } else {
        this.setState({
          validPassword: false,
          showValidationHelper: true,
          validCount: numOfTrue
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
          confirmPassword: event.target.value
        });
      } else {
        this.setState({
          passwordConfirm: false,
          confirmPassword: event.target.value
        });
      }
    } else {
      this.setState({
        passwordConfirm: false,
        confirmPassword: event.target.value
      });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    var payload = {
      newPassword: this.state.newPassword,
     // newSecret: ""
    };
 
    var url = `reset-password`; 
    post_request(url,payload).then(resp=>{
      console.log(resp);
      this.setState({
        isLoading:false, snackbaropen: true, snackbarmsg: 'Password changed successfully', responseStatus: 'success'
     });
     this.props.history.push('/Login');
    }).catch(err=>{
      console.log(err);
      this.setState({
        snackbaropen: true,isLoading:false, snackbarmsg: 'Unsuccessful', responseStatus: 'failed'
     })
     this.props.history.push('/Reset');
    });
    
    
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
              subtitle="Create your new password"
            />
            <div className="Form Animation">
              <div className="SignFormDetails">
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
                  onClick={() => this.handleSubmit()}
                >
                  {this.state.isLoading ? (
                    <CircularProgress style={{ color: "white" }} size={20} />
                  ) : (
                    "Change password"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <SignUpFooter />
      </div>
    );
  }
}
export default PasswordChange;
