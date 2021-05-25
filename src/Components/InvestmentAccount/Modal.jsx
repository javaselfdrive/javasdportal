import React, { Component } from "react";
import {
  withStyles,
  createMuiTheme,
  Modal,
  Backdrop,
  MuiThemeProvider,
  CircularProgress,
} from "@material-ui/core";

const stylesModal = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: "none",
    border: "none",
    borderRadius: "5px",
    boxShadow: "inherit",
  },
  container: {
    minHeight: 450,
    overflowX: "hidden",
  },
});

const themeModal = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(37, 43, 51, 0.5",
        backdropFilter: "blur(2px)",
      },
    },
  },
});

class ModalInvestment extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormInput(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit() {
    this.props.handleRemove(this.state.otp);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={themeModal}>
          <Modal
            className={classes.modal}
            open={this.props.setOpen}
            onClose={() => this.props.handleOpen()}
            closeAfterTransition
            BackdropComponent={Backdrop}
          >
            <div className={classes.paper}>
              <div className="ModalPaper">
                <div className="ModalHeader" style={{ padding: "0px" }}>
                  <div>
                    <button
                      className="BackButton"
                      style={{ float: "right" }}
                      onClick={() => this.props.handleOpen()}
                    >
                      <img src="./icon/close.svg" alt="x" />
                    </button>
                  </div>
                  <div
                    style={{ alignItems: "center", display: "inline-block" }}
                  >
                    <img src="./icon/remove1.svg" alt="Remove" />
                    <br />
                    <span
                      className="MainContentHeader"
                      style={{ fontSize: "20px" }}
                    >
                      Remove from account
                    </span>
                    <br />
                    <span className="MainContentSubheader">
                      You are about to remove a car {this.props.carReg} from
                      your investment portfolio. Note, this car will be added to
                      the JavaSelf drive selling page.
                    </span>
                  </div>
                </div>
                <div className="ProfileForm" style={{ marginTop: "20px" }}>
                  <label>Enter the OTP sent to your email to confirm</label>
                  <input
                    id="otp"
                    type="text"
                    value={this.state.otp}
                    onChange={this.handleFormInput}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="ModalFooter">
                  <button
                    className={
                      this.state.otp !== ""
                        ? "RedButton"
                        : "SignUpFormsSubmitDisabled"
                    }
                    disabled={this.state.otp !== "" ? false : true}
                    onClick={() => this.handleSubmit()}
                  >
                    {this.props.isLoading ? (
                      <CircularProgress style={{ color: "white" }} size={20} />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(stylesModal)(ModalInvestment);
