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
import moment from "moment";
import BookingHistoryDrawer from "./BookingHistoryDrawer";

const styles = theme => ({
  paper: {
    minHeight: 740,
    boxShadow: "none",
    marginTop: "10px",
    padding: "0px"
  }
});

const BookingHistoryTableCell = withStyles(theme => ({
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

const BookingHistoryTableRow = withStyles(theme => ({
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
    }
  }
});

class BookingHistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      page: 0,
      setOpen: false,
      filterData: {}
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  handleOpen = row => {
    var open = this.state.setOpen;
    if (open) {
      this.setState({ setOpen: false, filterData: {} });
    } else {
      this.setState({ setOpen: true, filterData: row });
    }
  };

  render() {
    const { classes } = this.props;
    var bookingHistory = this.props.bookingHistory;
    var CurrencyFormat = require("react-currency-format");

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        bookingHistory.length - (this.state.offset / rowsPerPage) * rowsPerPage
      );

    return (
      <div className="Font">
        <Paper className={classes.paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <BookingHistoryTableRow>
                  <BookingHistoryTableCell>
                    Vehicle details
                  </BookingHistoryTableCell>
                  <BookingHistoryTableCell>
                    Date and time
                  </BookingHistoryTableCell>
                  <BookingHistoryTableCell>Amount</BookingHistoryTableCell>
                  <BookingHistoryTableCell>Status</BookingHistoryTableCell>
                  <BookingHistoryTableCell>Action</BookingHistoryTableCell>
                </BookingHistoryTableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? bookingHistory.slice(
                      this.state.offset,
                      Number((this.state.offset / rowsPerPage).toFixed(0)) *
                        rowsPerPage +
                        rowsPerPage
                    )
                  : bookingHistory
                ).map((row, index) => (
                  <BookingHistoryTableRow
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => this.handleOpen(row)}
                  >
                    <BookingHistoryTableCell component="th" scope="row">
                      <span>
                        {row.carMake} {row.carModel}
                      </span>
                      <br />
                      <span>{row.carReg}</span>
                    </BookingHistoryTableCell>
                    <BookingHistoryTableCell>
                      {row.time}
                    </BookingHistoryTableCell>
                    <BookingHistoryTableCell>
                      {row.currency}{" "}
                      <CurrencyFormat
                        value={parseFloat(row.amount).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </BookingHistoryTableCell>
                    <BookingHistoryTableCell>
                      <div
                        className={
                          row.trip === "In progress"
                            ? "InProgress"
                            : row.trip === "Cancelled"
                            ? "Cancelled"
                            : "Completed"
                        }
                      >
                        {row.trip}
                      </div>
                    </BookingHistoryTableCell>
                    <BookingHistoryTableCell>
                      <img
                        src="/icon/more.svg"
                        alt="..."
                        style={{ cursor: "pointer" }}
                      />
                    </BookingHistoryTableCell>
                  </BookingHistoryTableRow>
                ))}

                {emptyRows > 0 && (
                  <BookingHistoryTableRow
                    style={{ height: 35 * emptyRows }}
                  ></BookingHistoryTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <div style={{ textAlign: "center" }}>
          <ThemeProvider theme={themeTable}>
            <Pagination
              disableFocusRipple={true}
              disableRipple={true}
              limit={rowsPerPage}
              offset={this.state.offset}
              total={bookingHistory.length}
              onClick={(e, offset) => this.handleClick(offset)}
            />
          </ThemeProvider>
        </div>
        {this.state.setOpen ? (
          <BookingHistoryDrawer
            handleOpen={this.handleOpen}
            setOpen={this.state.setOpen}
            data={this.state.filterData}
            systemFee={this.props.systemFee}
          />
        ) : null}
      </div>
    );
  }
}
export default withStyles(styles)(BookingHistoryTable);
