import React from "react";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { withRouter } from "react-router-dom";
import {
  ThemeProvider,
  createMuiTheme,
  Button,
  MenuItem,
  Popover,
  Hidden
} from "@material-ui/core";

const topBarTheme = createMuiTheme({
  props: {
    MuiIconButton: {
      disableRipple: true
    },
    MuiButton: {
      disableRipple: true
    },
    MuiButtonBase: {
      disableTouchRipple: true,
      disableRipple: true
    }
  },
  overrides: {
    MuiIconButton: {
      root: {
        overflow: "hidden",
        width: "10px",
        borderRadius: "none",
        "&:hover": {
          backgroundColor: "transparent !important"
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: "none",
        backgroundColor: "transparent",
        textTransform: "none",
        fontFamily: "inherit",
        boxShadow: "none !important",
        color: "#000000",
        "&:hover": {
          backgroundColor: "transparent !important"
        },
        "&:focus": {
          backgroundColor: "transparent !important"
        }
      }
    },
    MuiMenuItem: {
      root: {
        color: "#0B0B0B",
        fontFamily: "inherit",
        fontSize: "14px",
        padding: "15px",
        height: "45px",
        fontWeight: "600",
        borderBottom: "1px solid #DDE0E2A8",
        "&:hover": {
          backgroundColor: "rgba(26, 127, 232, 0.09) !important"
        },
        "&$selected": {
          backgroundColor: " #f5f9fa"
        }
      }
    },
    MuiInput: {
      root: {
        position: "inherit"
      }
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px"
      }
    },
    MuiInputBase: {
      input: {
        padding: "0px"
      }
    }
  }
});

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationState: false,
      name:''
    };
  }

  componentDidMount(){
    var userdata =  JSON.parse(localStorage.getItem("userData"));
    this.setState({ name: userdata.firstName + ' ' + userdata.lastName});
  }
  handleLogout() {
    localStorage.clear();
    setTimeout(() => this.props.history.push("/Login"), 2000);
  }

  render() {
    var menu = localStorage.getItem("menu");
    return (
      <div className="MainTopBar">
        <div className="MainTopBarInfo">
          <ThemeProvider theme={topBarTheme}>
            {menu === "Dashboard" ? (
              <Hidden xsDown>
                <Button
                  className="DisplayFlexSpace"
                  style={{
                    marginLeft: "15px"
                  }}
                  disableFocusRipple={true}
                  disableRipple={true}
                  onClick={() => this.props.handleDashboardTour(0, true)}
                >
                  <img
                    src="/icon/tour.svg"
                    alt="tour"
                    style={{ height: "1.5em", marginRight: "10px" }}
                  />
                  <span>Tour</span>
                </Button>
              </Hidden>
            ) : null}

            <Hidden xsDown>
              <Button
                className="DisplayFlexSpace"
                style={{
                  marginLeft: "15px"
                }}
                disableFocusRipple={true}
                disableRipple={true}
              >
                <img
                  src="/icon/help.svg"
                  alt="help"
                  style={{ height: "1.5em", marginRight: "10px" }}
                />
                <span>Support</span>
              </Button>
            </Hidden>

            <PopupState variant="popover" popupId="demoPopover">
              {popupState => (
                <div>
                  <Button
                    className="DisplayFlexSpace"
                    style={{
                      paddingLeft: "15px"
                    }}
                    disableFocusRipple={true}
                    disableRipple={true}
                    {...bindTrigger(popupState)}
                  >
                    <span>{this.state.name}</span>

                    <img
                      alt="dropdown"
                      src="/icon/dropdown.svg"
                      style={{ height: "1.5em", marginLeft: "10px" }}
                    />
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    style={{
                      marginTop: "6px",
                      height: "200px",
                      paddingLeft: "15px",
                      paddingRight: "15px"
                    }}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >
                    <div style={{ padding: "0 20px 0 20px" }}>
                      <MenuItem
                        value="viewProfile"
                        // onClick={() => this.props.history.push("/Profile")}
                      >
                        Change password
                      </MenuItem>
                      <MenuItem
                        value="Logout"
                        onClick={() => this.handleLogout()}
                      >
                        Logout
                      </MenuItem>
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}
export default withRouter(TopBar);
