import React from "react";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
  MenuItem,
  Popover,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import Pagination from "material-ui-flat-pagination";
import { Paper } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const styles = (theme) => ({
  paper: {
    minHeight: 900,
    boxShadow: "none",
    marginTop: "10px",
    padding: "0px",
  },
});

const InvestmentTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgba(211, 211, 211, 0.15)",
    fontWeight: "500",
    fontSize: "14px",
    padding: "13px 20px 13px 20px",
    fontFamily: "inherit",
    borderBottom: "none",
    color: "#252B33",
  },
  body: {
    fontSize: "14px",
    fontWeight: "normal",
    fontFamily: "inherit",
    color: "rgba(37, 37, 37, 0.7)",
    padding: "20px",
    borderBottom: "1px solid #F1F1F1",
  },
}))(TableCell);

const InvestmentTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
  },
}))(TableRow);

const rowsPerPage = 8;

const themeTable = createMuiTheme({
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
    MuiButton: {
      disableRipple: true,
    },
    MuiButtonBase: {
      disableTouchRipple: true,
      disableRipple: true,
    },
  },
  overrides: {
    MuiFlatPageButton: {
      rootCurrent: {
        height: "30px",
        width: "30px",
        fontFamily: "inherit",
        marginLeft: "10px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E5E5",
        boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.05)",
      },
      rootStandard: {
        height: "30px",
        width: "30px",
        fontFamily: "inherit",
        marginLeft: "10px",
        backgroundColor: "#FFFFFF",
        border: "solid 1px #f1f1f1",
        boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.01)",
      },
    },
    MuiButton: {
      textSecondary: {
        color: "#003C58 !important",
        "&:hover": {
          backgroundColor: "#E5E5E5",
        },
        "&:focus": {
          backgroundColor: "#ffffff",
        },
      },
      textPrimary: {
        color: "#1A1A1A",
      },
    },
    MuiMenuItem: {
      root: {
        color: "#0B0B0B",
        fontFamily: "inherit",
        fontSize: "14px",
        padding: "15px",
        height: "45px",
        fontWeight: "500",
        borderBottom: "1px solid #DDE0E2A8",
        "&:hover": {
          backgroundColor: "rgba(26, 127, 232, 0.09) !important",
        },
        "&$selected": {
          backgroundColor: " #f5f9fa",
        },
      },
    },
    MuiInput: {
      root: {
        position: "inherit",
      },
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiInputBase: {
      input: {
        padding: "0px",
      },
    },
  },
});

class InvestmentAccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      page: 0,
    };
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  render() {
    const { classes } = this.props;
    var investments = this.props.investments;
    var CurrencyFormat = require("react-currency-format");

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        investments.length - (this.state.offset / rowsPerPage) * rowsPerPage
      );

    return (
      <div className="Font">
        <ThemeProvider theme={themeTable}>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableHead>
                  <InvestmentTableRow>
                    <InvestmentTableCell>Image</InvestmentTableCell>
                    <InvestmentTableCell>Vehicle details</InvestmentTableCell>
                    <InvestmentTableCell>Date added</InvestmentTableCell>
                    <InvestmentTableCell>Total amount</InvestmentTableCell>
                    <InvestmentTableCell style={{ textAlign: "center" }}>
                      Total bookings
                    </InvestmentTableCell>
                    <InvestmentTableCell style={{ textAlign: "center" }}>
                      Status
                    </InvestmentTableCell>
                    <InvestmentTableCell style={{ textAlign: "right" }}>
                      Action
                    </InvestmentTableCell>
                  </InvestmentTableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? investments.slice(
                        this.state.offset,
                        Number((this.state.offset / rowsPerPage).toFixed(0)) *
                          rowsPerPage +
                          rowsPerPage
                      )
                    : investments
                  ).map((row, index) => (
                    <InvestmentTableRow key={index}>
                      <InvestmentTableCell component="th" scope="row">
                        <div
                          className="TopCarC"
                          style={{ background: `url(${row.carImage})` }}
                        ></div>
                      </InvestmentTableCell>
                      <InvestmentTableCell>
                        <span>
                          {row.carMake} {row.carModel}
                        </span>
                        <br />
                        <span>{row.carReg}</span>
                      </InvestmentTableCell>
                      <InvestmentTableCell>{row.date}</InvestmentTableCell>
                      <InvestmentTableCell>
                        {row.currency}{" "}
                        <CurrencyFormat
                          value={parseFloat(row.amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </InvestmentTableCell>
                      <InvestmentTableCell style={{ textAlign: "center" }}>
                        {row.bookings}
                      </InvestmentTableCell>
                      <InvestmentTableCell>
                        <div
                          className={
                            row.status === "Active" ? "Completed" : "Failed"
                          }
                          style={{ width: "100px", margin: "0 auto" }}
                        >
                          {row.status}
                        </div>
                      </InvestmentTableCell>
                      <InvestmentTableCell style={{ textAlign: "right" }}>
                        <PopupState variant="popover" popupId="demoPopover">
                          {(popupState) => (
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
                                  paddingLeft: "15px",
                                  paddingRight: "15px",
                                }}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                              >
                                <div style={{ padding: "0 10px" }}>
                                  <MenuItem
                                    value="1"
                                    onClick={() => {
                                      this.props.handleSelectedRow(row);
                                      this.props.handleView(1);
                                    }}
                                  >
                                    <img
                                      src="/icon/edit2.svg"
                                      alt="Edit"
                                      style={{ marginRight: "10px" }}
                                    />
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    value="2"
                                    onClick={() => {
                                      this.props.handleSelectedRow(row);
                                      this.props.handleView(2);
                                    }}
                                  >
                                    <img
                                      src="/icon/remove.svg"
                                      alt="remove"
                                      style={{ marginRight: "14px" }}
                                    />
                                    Remove
                                  </MenuItem>
                                  <MenuItem
                                    value="3"
                                    onClick={() => {
                                      this.props.handleSelectedRow(row);
                                      this.props.handleView(3);
                                    }}
                                  >
                                    <img
                                      src="/icon/view.svg"
                                      alt="view"
                                      style={{ marginRight: "14px" }}
                                    />
                                    View details
                                  </MenuItem>
                                </div>
                              </Popover>
                            </div>
                          )}
                        </PopupState>
                      </InvestmentTableCell>
                    </InvestmentTableRow>
                  ))}

                  {emptyRows > 0 && (
                    <InvestmentTableRow
                      style={{ height: 35 * emptyRows }}
                    ></InvestmentTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <div style={{ textAlign: "center" , marginTop:"20px"}}>
            <Pagination
              disableFocusRipple={true}
              disableRipple={true}
              limit={rowsPerPage}
              offset={this.state.offset}
              total={investments.length}
              onClick={(e, offset) => this.handleClick(offset)}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
export default withStyles(styles)(InvestmentAccountTable);
