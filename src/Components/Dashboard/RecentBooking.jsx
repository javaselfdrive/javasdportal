import React, { Component } from "react";
import NoData from "../SharedComponents/NoData";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import {
  ThemeProvider,
  createMuiTheme,
  MenuItem,
  Popover
} from "@material-ui/core";

const seeMore = createMuiTheme({
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
    MuiMenuItem: {
      root: {
        color: "#0B0B0B",
        fontFamily: "inherit",
        fontSize: "14px",
        height: "45px",
        borderRadius: "5px",
        fontWeight: "600",
        padding:"16px 76px 16px 32px",
        width: "200px",
        "&:hover": {
          backgroundColor: "rgba(26, 127, 232, 0.09) !important"
        },
        "&$selected": {
          backgroundColor: " #f5f9fa"
        }
      }
    },
    MuiPopover: {
      paper: {
        boxShadow: "0 10px 20px 9px rgba(0, 0, 0, 0.05)"
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

class RecentBookings extends Component {
  handleDisplay() {
    var length = Object.keys(this.props.bookings).length;
    if (length === 0) {
      return (
        <NoData
          title={"No car records yet"}
          subtitle={"You haven’t started getting bookings yet"}
        />
      );
    } else {
      return this.props.bookings.map((booking, index) => {
        return (
          <div
            key={index}
            className="RecentBooking DisplayFlex1"
            style={index === 2 ? { borderBottom: "none" } : null}
          >
            <div>
              <div>
                <span className="BlackText">
                  {booking.carMake} {booking.carModel}
                </span>
              </div>
              <div>
                <span className="GreyText" style={{ lineHeight: "2em" }}>
                  {booking.carReg}
                </span>
              </div>
            </div>
            <button
              className="RedirectButton"
              style={{ color: "#002ad1", textDecoration: "none" }}
            >
              View
            </button>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="Cards">
        <div className="DisplayFlex1" style={{ alignItems: "center" }}>
          <div>
            <span className="CardTitle">Recent booking</span>
          </div>
          <ThemeProvider theme={seeMore}>
            <PopupState variant="popover" popupId="demoPopover">
              {popupState => (
                <div>
                  <img
                    src="/icon/more.svg"
                    alt="..."
                    style={{ cursor: "pointer" }}
                    {...bindTrigger(popupState)}
                  />

                  <Popover
                    {...bindPopover(popupState)}
                    style={{
                      marginTop: "6px",
                      height: "200px",
                      paddingLeft: "16px",
                      paddingRight: "16px"
                    }}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                  >
                    <MenuItem value="viewBookings">View all bookings</MenuItem>
                  </Popover>
                </div>
              )}
            </PopupState>
          </ThemeProvider>
        </div>
        <div style={{ marginTop: "13px" }}>{this.handleDisplay()}</div>
      </div>
    );
  }
}

export default RecentBookings;
