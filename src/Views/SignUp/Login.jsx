import React, { Component } from "react";
import SignUpHeader from "../../Components/SharedComponents/SignUpHeader";
import SignUpFooter from "../../Components/SharedComponents/SignUpFooter";
import { validateEmail } from "../../Utilities/SharedFunctions";
import { CircularProgress } from "@material-ui/core";
import { post_request } from '../../Services/FetchFunctions';
import CustomSnackbar from '../../Components/SharedComponents/CustomSnackbar';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
  snackbarClose = event => {
    this.setState({ snackbaropen: false }); 
  };

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    var payload = {
      username: this.state.email,
      password: this.state.password,
      type: "2"
    };
    
    const url = `authenticate`;
    post_request(url,payload).then(resp=>{
      console.log(resp);
      this.setState({
        isLoading: false
      })
      localStorage.setItem('userData',JSON.stringify(resp.data));
      this.props.history.push("/Profile");
    }).catch(err=>{
     
      this.setState({
        isLoading: false, snackbaropen: true, snackbarmsg: 'Login Failed',
        responseStatus: 'failed', snackbartxt: err.response.data.message
      })
    })
    
 
  // setTimeout(() => this.props.history.push("/Dashboard"), 2000)
  
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
              title="Welcome!"
              subtitle="Login to your account to continue"
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
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleFormInput}
                  className="SignUpFormsPassword"
                  required
                />
                <button
                  className={
                    !this.state.validEmail || this.state.password === ""
                      ? "SignUpFormsSubmitDisabled"
                      : "SignUpFormsSubmit"
                  }
                  disabled={
                    !this.state.validEmail || this.state.password === ""
                      ? true
                      : false
                  }
                  onClick={() => this.handleSubmit()}
                >
                  {this.state.isLoading ? (
                    <CircularProgress style={{ color: "white" }} size={20} />
                  ) : (
                    "Login"
                  )}
                </button>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "25px",
                    color: "rgba(37, 37, 37, 0.7)"
                  }}
                >
                  <button
                    className="RedirectButton"
                    onClick={() => this.props.history.push("/Reset")}
                  >
                    Reset password
                  </button>
                </div>
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
              <span>Don’t have an account? </span>
              <button
                className="RedirectButton"
                onClick={() => this.props.history.push("/Signup")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <SignUpFooter />
      </div>
    );
  }
}
export default Login;
