import React from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
  Drawer
} from "@material-ui/core";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import BookingReceipt from "./BookingReceipt";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

class BookingHistoryDrawer extends React.Component {
  printDocument() {
    const input = document.getElementById("bookingInformation");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`JavaDriveSafe-${this.props.data.invoice}.pdf`);
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={themeLogs}>
        <Drawer
          anchor={"right"}
          open={this.props.setOpen}
          onClose={() => this.props.handleOpen()}
        >
          <div className={classes.paper}>
            <div className="Drawer">
              <img
                src="./icon/close.svg"
                alt="X"
                style={{ float: "right", cursor: "pointer" }}
                onClick={() => this.props.handleOpen()}
              />
              <br />
              <BookingReceipt
                id={"bookingInformation"}
                data={this.props.data}
                systemFee={this.props.systemFee}
                ref={el => (this.componentRef = el)}
              />

              <ReactToPrint content={() => this.componentRef}>
                <PrintContextConsumer>
                  {({ handlePrint }) => (
                    <button
                      className="PurpleButton"
                      style={{ marginBottom: "10px", marginTop: "25px" }}
                      onClick={handlePrint}
                    >
                      <img
                        src="./icon/print.svg"
                        alt="print"
                        style={{ marginRight: "15px" }}
                      />
                      Print PDF receipt
                    </button>
                  )}
                </PrintContextConsumer>
              </ReactToPrint>
              <button
                className="PurpleButton"
                style={{ marginBottom: "20px" }}
                onClick={() => this.printDocument()}
              >
                <img
                  src="./icon/download.svg"
                  alt="download"
                  style={{ marginRight: "15px" }}
                />
                Download PDF receipt
              </button>
            </div>
          </div>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(stylesBookingHistory)(BookingHistoryDrawer);
