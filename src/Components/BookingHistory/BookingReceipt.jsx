import React from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import moment from "moment";

const BookingHistoryDrawerCell = withStyles(theme => ({
  head: {
    backgroundColor: "none",
    fontWeight: "600",
    fontSize: "14px",
    fontFamily: "inherit",
    borderBottom: "none",
    paddingLeft: "0px"
  },
  body: {
    fontSize: "14px",
    fontWeight: "normal",
    fontFamily: "inherit",
    padding: "inherit",
    color: "rgba(37, 37, 37, 0.7)",
    paddingTop: 0,
    paddingBottom: 15
  },
  root: {
    borderBottom: "none"
  }
}))(TableCell);

const BookingHistoryDrawerRow = withStyles(theme => ({
  root: {
    backgroundColor: "transparent"
  }
}))(TableRow);

const stylesBookingHistory = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "2px",
    boxShadow: "-30px 4px 60px 30px rgba(37, 43, 51, 0.03)",
    padding: "30px"
  }
});

const themeLogs = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(37, 43, 51, 0.5)",
        backdropFilter: "blur(2px)"
      }
    },
    MuiPaper: {
      elevation16: {
        boxShadow: "0px 9px 15px 7px rgba(70, 70, 70, 0.06)"
      }
    },
    MuiDrawer: {
      paperAnchorRight: {
        marginTop: "0px"
      },
      paperAnchorDockedLeft: {
        borderRight: "none"
      }
    }
  }
});

class BookingReceipt extends React.Component {
  render() {
    var data = this.props.data;
    var vat = data.bookingFee ? data.bookingFee * 0.16 : 0;
    var CurrencyFormat = require("react-currency-format");

    return (
      <MuiThemeProvider theme={themeLogs}>
        <div id={this.props.id}>
          <div style={{ marginTop: "30px" }}>
            <span className="MainContentHeader Bold">Booking information</span>
            <br />
            <span className="MainContentSubheader">
              A breakdown of the specifics of a certain booking entry{" "}
            </span>
          </div>
          <div style={{ marginTop: "15px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      Vehicle details
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell></BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                </TableHead>
                <TableBody>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell component="th" scope="row">
                      Name:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.carMake} {data.carModel}
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      Number plate:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.carReg}
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow
                    style={{
                      borderBottom: "1px solid #F5F9FE",
                      height: "65px",
                      marginBottom: "0px",
                      verticalAlign: "top"
                    }}
                  >
                    <BookingHistoryDrawerCell>
                      Vehicle booking status:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell>
                      <div
                        className={
                          data.trip === "In progress"
                            ? "InProgress"
                            : data.trip === "Cancelled"
                            ? "Cancelled"
                            : "Completed"
                        }
                        style={{ float: "right" }}
                      >
                        {data.trip}
                      </div>
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                </TableBody>
              </Table>
              <Table style={{ marginTop: "15px" }}>
                <TableHead>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      Trip details
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell></BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                </TableHead>
                <TableBody>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell component="th" scope="row">
                      Start date:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.handoverTime}
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow
                    style={{
                      borderBottom: "1px solid #F5F9FE",
                      height: "65px",
                      marginBottom: "0px"
                    }}
                  >
                    <BookingHistoryDrawerCell>
                      End date:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.expectedRT}
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                </TableBody>
              </Table>
              <Table style={{ marginTop: "15px" }}>
                <TableHead>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      Payment information
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell></BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                </TableHead>
                <TableBody>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell component="th" scope="row">
                      Invoice number:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.invoice}
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      Booking fee:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.currency}{" "}
                      <CurrencyFormat
                        value={parseFloat(data.bookingFee).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      VAT 16%:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.currency}{" "}
                      <CurrencyFormat
                        value={parseFloat(vat).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      Booking fee:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.currency}{" "}
                      <CurrencyFormat
                        value={parseFloat(data.bookingFee).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell>
                      System fee:
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell style={{ textAlign: "right" }}>
                      {data.currency}{" "}
                      <CurrencyFormat
                        value={parseFloat(this.props.systemFee).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                  <BookingHistoryDrawerRow>
                    <BookingHistoryDrawerCell
                      style={{
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: "600"
                      }}
                    >
                      Total amount made
                    </BookingHistoryDrawerCell>
                    <BookingHistoryDrawerCell
                      style={{
                        textAlign: "right",
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: "600"
                      }}
                    >
                      {data.currency}{" "}
                      <CurrencyFormat
                        value={parseFloat(
                          data.bookingFee + vat + this.props.systemFee
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </BookingHistoryDrawerCell>
                  </BookingHistoryDrawerRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(stylesBookingHistory)(BookingReceipt);
