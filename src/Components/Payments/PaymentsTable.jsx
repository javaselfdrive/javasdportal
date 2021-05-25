import React from "react";
import {
  withStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "material-ui-flat-pagination";
import { Paper } from "@material-ui/core";
import CallMadeRoundedIcon from "@material-ui/icons/CallMadeRounded";
import CallReceivedRoundedIcon from "@material-ui/icons/CallReceivedRounded";
import moment from "moment";

const styles = theme => ({
  paper: {
    minHeight: 650,
    boxShadow: "none",
    marginTop: "10px",
    padding: "0px"
  }
});

const PaymentsTableCell = withStyles(theme => ({
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
    borderBottom: "1px solid #F1F1F1"
  }
}))(TableCell);

const PaymentsTableRow = withStyles(theme => ({
  root: {
    backgroundColor: "transparent"
  }
}))(TableRow);

const rowsPerPage = 8;

const themeTable = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
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
        boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.05)"
      },
      rootStandard: {
        height: "30px",
        width: "30px",
        fontFamily: "inherit",
        marginLeft: "10px",
        backgroundColor: "#FFFFFF",
        border: "solid 1px #f1f1f1",
        boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.01)"
      }
    },
    MuiButton: {
      textSecondary: {
        color: "#003C58 !important",
        "&:hover": {
          backgroundColor: "#E5E5E5"
        },
        "&:focus": {
          backgroundColor: "#ffffff"
        }
      },
      textPrimary: {
        color: "#1A1A1A"
      }
    },
    MuiSvgIcon: {
      root: {
        height: "0.7em",
        width: "0.7em"
      }
    }
  }
});

class PaymentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      page: 0
    };
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  render() {
    const { classes } = this.props;
    var payments = this.props.payments;
    var CurrencyFormat = require("react-currency-format");

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        payments.length - (this.state.offset / rowsPerPage) * rowsPerPage
      );

    return (
      <div className="Font">
        <ThemeProvider theme={themeTable}>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table>
                <TableHead>
                  <PaymentsTableRow>
                    <PaymentsTableCell>Transaction type</PaymentsTableCell>
                    <PaymentsTableCell>Transaction ID</PaymentsTableCell>
                    <PaymentsTableCell>Amount</PaymentsTableCell>
                    <PaymentsTableCell>Date and time</PaymentsTableCell>
                    <PaymentsTableCell>Status</PaymentsTableCell>
                  </PaymentsTableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? payments.slice(
                        this.state.offset,
                        Number((this.state.offset / rowsPerPage).toFixed(0)) *
                          rowsPerPage +
                          rowsPerPage
                      )
                    : payments
                  ).map((row, index) => (
                    <PaymentsTableRow key={index}>
                      <PaymentsTableCell component="th" scope="row">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#252b33"
                          }}
                        >
                          {row.type === "Deposit to wallet" ? (
                            <div className="Received">
                              <CallReceivedRoundedIcon />
                            </div>
                          ) : (
                            <div className="Sent">
                              <CallMadeRoundedIcon />
                            </div>
                          )}
                          <div>{row.type}</div>
                        </div>
                      </PaymentsTableCell>
                      <PaymentsTableCell>{row.id}</PaymentsTableCell>
                      <PaymentsTableCell>
                        {row.currency}{" "}
                        <CurrencyFormat
                          value={parseFloat(row.amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </PaymentsTableCell>
                      <PaymentsTableCell>{row.date}</PaymentsTableCell>
                      <PaymentsTableCell>
                        <div
                          className={
                            row.status === "Successful" ? "Completed" : "Failed"
                          }
                        >
                          {row.status}
                        </div>
                      </PaymentsTableCell>
                    </PaymentsTableRow>
                  ))}

                  {emptyRows > 0 && (
                    <PaymentsTableRow
                      style={{ height: 35 * emptyRows }}
                    ></PaymentsTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <div style={{ textAlign: "center" }}>
            <Pagination
              disableFocusRipple={true}
              disableRipple={true}
              limit={rowsPerPage}
              offset={this.state.offset}
              total={payments.length}
              onClick={(e, offset) => this.handleClick(offset)}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
export default withStyles(styles)(PaymentsTable);
