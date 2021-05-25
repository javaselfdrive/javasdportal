import React, { Component } from "react";
import {
  createMuiTheme,
  Select,
  MenuItem,
  MuiThemeProvider
} from "@material-ui/core";

const themeWeekDropdown = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiSelect: {
      select: {
        color: "#000000",
        fontSize: "14px",
        "&:focus": {
          backgroundColor: "none"
        }
      },
      icon: {
        position: "inherit"
      },
      nativeInput: {
        width: "auto",
        display: "none !important"
      }
    },
    MuiFormControl: {
      root: {
        width: "100%"
      }
    },
    MuiMenuItem: {
      root: {
        color: "#000000",
        fontFamily: "inherit",
        fontSize: "14px",
        height: "35px",
        width: "100%",
        "&:hover": {
          backgroundColor: "#f4f7ff !important"
        },
        "&$selected": {
          backgroundColor: "#f4f7ff"
        }
      }
    },
    MuiInput: {
      root: {
        position: "inherit",
        height: "35px"
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
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px"
      }
    },
    MuiInputBase: {
      root: {
        fontFamily: "inherit",
        fontSize: "14px",
        marginTop: "0px",
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
        border: "none !important",
        boxShadow: "none !important",
        margin: "0px !important"
      }
    }
  }
});

const MenuProps = {
  style: {
    marginTop: "15px"
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  }
};

class WeekSelect extends Component {
  handleSelectedPeriod(event) {
    this.props.handleSelectedPeriod(event.target.value);
  }
  render() {
    return (
      <MuiThemeProvider theme={themeWeekDropdown}>
        <Select
          className="PeriodDropdown"
          style={{
            fontFamily: "inherit",
            fontSize: "14px"
          }}
          value={this.props.selectedPeriod}
          onChange={event => this.handleSelectedPeriod(event)}
          disableUnderline={true}
          MenuProps={MenuProps}
        >
          <MenuItem value="W">This Week</MenuItem>
          <MenuItem value="Y">Last Month</MenuItem>
        </Select>
      </MuiThemeProvider>
    );
  }
}

export default WeekSelect;
