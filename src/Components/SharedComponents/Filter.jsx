import React, { Component } from "react";
import { withStyles, Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { createMuiTheme, Select, MuiThemeProvider } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import moment from "moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const FilterButtonClear = withStyles({
  root: {
    textTransform: "none",
    height: "40px",
    fontFamily: "inherit",
    color: "rgba(37, 43, 51, 0.5)",
    fontSize: "14px",
    backgroundColor: "linear-gradient(180deg, #FAFAFA 0%, #FBFDFF 100%)",
    padding: "5px 30px",
    borderRadius: "4px",
    border: "1px solid rgba(37, 43, 51, 0.15)",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#fafafa",
      transition: "0.2s ease-in-out"
    },
    "&:active": {
      backgroundColor: "#F8F8F8",
      borderColor: "#005cbf"
    }
  }
})(Button);

const FilterButtonApply = withStyles({
  root: {
    height: "40px",
    textTransform: "none",
    fontFamily: "inherit",
    fontSize: "14px",
    padding: "5px 30px",
    backgroundColor: "#052aba",
    border: "1px solid rgba(37, 43, 51, 0.15)",
    borderRadius: "4px",
    color: "#ffffff",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#d2dbff",
      transition: "0.2s ease-in-out",
      border: "1px solid  #d2dbff"
    },
    "&:active": {
      backgroundColor: "#d2dbff",
      borderColor: "#d2dbff"
    }
  }
})(Button);

const MenuProps = {
  style: {
    marginTop: "5px"
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  }
};

const customFilter = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiSelect: {
      root: {
        fontFamily: "inherit"
      },
      select: {
        color: "rgba(37, 37, 37, 0.7)",
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
    MuiMenuItem: {
      root: {
        color: "rgba(37, 37, 37, 0.7)",
        fontFamily: "inherit",
        fontSize: "14px",
        height: "40px",
        width: "100%",
        "&:hover": {
          backgroundColor: "#f4f7ff !important"
        },
        "&$selected": {
          backgroundColor: "#f4f7ff"
        }
      }
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px"
      }
    },
    MuiInput: {
      root: {
        position: "inherit",
        height: "40px"
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
    MuiInputBase: {
      root: {
        fontFamily: "inherit",
        fontSize: "14px",
        marginTop: "10px",
        marginBottom: "20px",
        height: "40px",
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
    },
    MuiPopover: {
      paper: {
        boxShadow: "0 3px 6px rgba(0,0,0,.12)!important"
      }
    },
    MuiTypography: {
      body1: {
        fontFamily: "inherit"
      },
      body2: {
        fontFamily: "inherit"
      },
      caption: {
        fontFamily: "inherit"
      }
    },
    MuiPickersDay: {
      root: {
        fontFamily: "inherit"
      },
      yearSelected: {
        color: "rgba(37, 37, 37, 0.7)"
      },
      daySelected: {
        color: "#052aba",
        backgroundColor: "052aba",
        "&:hover": {
          backgroundColor: "052aba"
        }
      }
    }
  }
});

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: "none",
      disabled: true,
      startDate: new Date(),
      endDate: new Date(),
      transactionType: "none",
      transactionID: ""
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleSelectedFilter(event) {
    if (event.target.id) {
      this.setState({ [event.target.id]: event.target.value });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };
  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };

  handleSelectedPeriod(event) {
    var startDate;
    var menuItem = event.target.value;

    if (menuItem !== "Custom") {
      if (menuItem === "Today") {
        startDate = new Date();
      } else if (menuItem === "Yesterday") {
        startDate = moment().subtract(1, "days");
      } else if (menuItem === "Last Week") {
        startDate = moment().subtract(7, "days");
      } else if (menuItem === "Last Month") {
        startDate = moment().subtract(30.4167, "days");
      } else if (menuItem === "Past 2 Months") {
        startDate = moment().subtract(60.8334, "days");
      }
      this.setState({
        startDate: startDate,
        endDate: new Date(),
        period: menuItem,
        disabled: true
      });
    } else {
      this.setState({
        startDate: new Date(),
        endDate: new Date(),
        period: menuItem,
        disabled: false
      });
    }
  }

  handleFilter() {
    var startDate = moment(this.state.startDate).toISOString();
    var endDate = moment(this.state.endDate).toISOString();
    this.props.handleFilter(
      startDate,
      endDate,
      this.state.transactionType,
      this.state.transactionType
    );
  }

  render() {
    return (
      <div className="FilterButton" style={{ cursor: "pointer" }}>
        <MuiThemeProvider theme={customFilter}>
          <PopupState variant="popover">
            {popupState => (
              <div>
                <button className="Filter" {...bindTrigger(popupState)}>
                  <img alt="filter" src="/icon/filterButton.svg" />
                  <span style={{ marginLeft: "15px" }}>Filter</span>
                </button>
                <Popover
                  {...bindPopover(popupState)}
                  style={{ marginTop: "10px" }}
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
                  <div className="FilterPopper">
                    <div className="FilterTop Bold">
                      <span>Filters</span>
                      {/* <img
                        src="./icon/closeFilter.svg"
                        alt="x"
                        style={{ cursor: "pointer" }}
                      /> */}
                    </div>
                    <div className="FilterBody">
                      {this.props.payments ? (
                        <div>
                          <label>Transaction type</label>
                          <Select
                            className="FilterSelect"
                            style={{
                              fontFamily: "inherit",
                              fontSize: "14px",
                              paddingLeft: "13px"
                            }}
                            value={this.state.transactionType}
                            onChange={event => this.handleSelectedFilter(event)}
                            disableUnderline={true}
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              value="none"
                              disabled
                              style={{ color: "#003c58" }}
                            >
                              Select
                            </MenuItem>
                            <MenuItem value="D">Deposit</MenuItem>
                            <MenuItem value="C">Credit</MenuItem>
                          </Select>
                          <label>Transaction type</label>
                          <input
                            id="transactionID"
                            type="text"
                            placeholder="Enter ID"
                            value={this.state.transactionID}
                            onChange={this.handleSelectedFilter}
                            autoComplete="off"
                          />
                        </div>
                      ) : null}
                      <label>Select period</label>
                      <Select
                        className="FilterSelect"
                        style={{
                          fontFamily: "inherit",
                          fontSize: "14px",
                          paddingLeft: "13px"
                        }}
                        value={this.state.period}
                        onChange={event => this.handleSelectedPeriod(event)}
                        disableUnderline={true}
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          value="none"
                          disabled
                          style={{ color: "#003c58" }}
                        >
                          Select
                        </MenuItem>
                        <MenuItem value="Today">Today</MenuItem>
                        <MenuItem value="Yesterday">Yesterday</MenuItem>
                        <MenuItem value="Last Week">Last Week</MenuItem>
                        <MenuItem value="Last Month">Last Month</MenuItem>
                        <MenuItem value="Past 2 Months">Past 2 Months</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                      </Select>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <label>From</label>
                        <DatePicker
                          style={{ width: "100%" }}
                          disableToolbar
                          disableFuture={true}
                          disabled={this.state.disabled}
                          variant="inline"
                          format="MM/dd/yyyy"
                          id="startDate"
                          InputProps={{
                            disableUnderline: true
                          }}
                          value={this.state.startDate}
                          onChange={this.handleStartDateChange}
                        />
                        <label>To</label>
                        <DatePicker
                          style={{ width: "100%" }}
                          disableToolbar
                          disableFuture={true}
                          disabled={this.state.disabled}
                          InputProps={{
                            disableUnderline: true
                          }}
                          variant="inline"
                          format="MM/dd/yyyy"
                          id="endDate"
                          value={this.state.endDate}
                          onChange={this.handleEndDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className="FilterFooter">
                      <div className="FilterButtonClear">
                        <FilterButtonClear
                          onClick={() =>
                            this.setState({
                              transactionType: "none",
                              currency: "none",
                              period: "none",
                              startDate: new Date(),
                              endDate: new Date(),
                              disabled: true
                            })
                          }
                        >
                          <span>Reset</span>
                        </FilterButtonClear>
                      </div>
                      <div className="FilterButtonApply">
                        <FilterButtonApply
                          onClick={() => {
                            this.handleFilter();
                            popupState.close();
                          }}
                        >
                          <span>Apply</span>
                        </FilterButtonApply>
                      </div>
                    </div>
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Filter;
