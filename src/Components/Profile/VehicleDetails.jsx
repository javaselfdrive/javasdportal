import React, { Component } from "react";
import {
  withStyles,
  createMuiTheme,
  Modal,
  Backdrop,
  MuiThemeProvider,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import { getRequest,post_request } from "../../Services/FetchFunctions";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "moment";
import CustomSnackbar from "../SharedComponents/CustomSnackbar";

const stylesModal = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    background: "none",
    border: "none",
    borderRadius: "5px",
    boxShadow: "inherit"
  },
  container: {
    minHeight: 450,
    overflowX: "hidden"
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "rgba(211, 211, 211, 0.15)",
    fontSize: "14px",
    padding: "15px",
    position: "inherit",
    fontFamily: "inherit",
    borderBottom: "none",
    width: "20%"
  },
  body: {
    fontSize: "14px",
    fontWeight: "normal",
    fontFamily: "inherit",
    padding: "15px",
    color: "#252B33",
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: "1px solid #f5f9fe"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    backgroundColor: "transparent"
  }
}))(TableRow);

const themeModal = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(37, 43, 51, 0.5",
        backdropFilter: "blur(2px)"
      }
    },
    MuiSelect: {
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
    MuiFormControl: {
      root: {
        width: "100%"
      }
    },
    MuiMenuItem: {
      root: {
        color: "rgba(37, 37, 37, 0.7)",
        fontFamily: "inherit",
        fontSize: "14px",
        height: "45px",
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
        marginTop: "10px",
        marginBottom: "20px",
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
    },
    MuiPickersToolbar: {
      root: {
        fontFamily: "inherit"
      },
      toolbar: {
        backgroundColor: "#002AD1"
      }
    },
    MuiPickersYear: {
      root: {
        fontFamily: "inherit"
      },
      yearSelected: {
        color: "rgba(37, 37, 37, 0.7)"
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

class VehicleDetails extends Component {
  constructor() {
    super();
    this.state = {
      tableColumns: ["Name", "Model", "Year", "Vehicle color"],
      vehicles: [],
      availableMakes: [],
      availableModels: [],
      make: "none",
      model: "none",
      manufacture: new Date(),
      licensePlate: "",
      vehicleColor: "",
      vehicleDetailsComplete: false,
      setOpen: false,
      responseStatus: '',
      snackbaropen: false,
      snackbarmsg: '',
      snackbartxt: '',
      isloading: false
    };

    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleAddVehicleDetails = this.handleAddVehicleDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var vehicleDetails = JSON.parse(localStorage.getItem("Vehicle Details"));
    if (vehicleDetails) {
      this.setState({
        vehicles: vehicleDetails.vehicles,
        vehicleDetailsComplete: vehicleDetails.vehicleDetailsComplete
      });
    }
    this.handleFetchMake();
  }

  handleOpen() {
    this.setState({ setOpen: !this.state.setOpen });
  }

  handleDate = date => {
    this.setState({ manufacture: date });
  };

  handleFormInput(event) {
    console.log(event.target.name);
    var selected=event.target.value;
    if (event.target.name === "make") {
      
        this.setState({ make: selected });
        this.handleFetchModels(selected.id);
     
    } else if (event.target.name === "model") {
      console.log(selected);
      this.setState({ model: selected });
    } else {
      this.setState({ [event.target.id]: event.target.value });
    }
  }

  handleAddVehicleDetails() {
    this.setState({isLoading:true});
    var newVehicle = {
      make: this.state.make.id,
      model: this.state.model.id,
      year: moment(this.state.manufacture, "DD-MM-YYYY").format("YYYY"),
      licence: this.state.licensePlate.toUpperCase(),
      color: this.state.vehicleColor
    };
    this.setState(prevState => ({
      vehicles: [...prevState.vehicles, newVehicle]
    }));
    var endpoint=`client/add-vehicle`;
    post_request(endpoint,newVehicle).then(resp=>{
          console.log(resp);
          this.setState({
             snackbaropen: true, snackbarmsg: 'Upload success', responseStatus: 'success',isLoading:false
          });
      localStorage.setItem(
        "Vehicle Details",
        JSON.stringify({
          vehicles: [...this.state.vehicles, newVehicle],
          vehicleDetailsComplete: true
        })
      );
        }).catch(err=>{
          console.log(err);
      this.setState({
        isloading: false, snackbaropen: true, snackbarmsg: 'Creation Failed',
        responseStatus: 'failed', snackbartxt: 'kindly try again'
      })
        });
    this.handleOpen();
    
  }

  handleFetchMake() {
    var url = 'service/make';
    getRequest(url)
      .then(response => {
        this.setState({ availableMakes: response.data });
      })
      .catch(err => console.log(err));
  }

  handleFetchModels(make) {
    var url = `service/model/${make}`
    getRequest(url)
      .then(response => {
        this.setState({
          availableModels: response.data,
          //model: response.data
        });
      })
      .catch(err => console.log(err));
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  handleSubmit() {
    var payload = {
      vehicles: this.state.vehicles,
      vehicleDetailsComplete: true
    };
    this.props.handleVehicleDetails(0);
    localStorage.setItem("Vehicle Details", JSON.stringify(payload));
  }

  handleAddVehicle() {
    return (
      <button
        className="WarningContainerButton"
        style={{ width: "165px" }}
        onClick={() => this.handleOpen()}
      >
        + Add vehicle
      </button>
    );
  }
  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleView() {
    const { classes } = this.props;

    if (this.state.vehicles.length === 0) {
      return (
        <div className="WarningContainer">
          <div style={{ textAlign: "center" }}>
            <img
              src="/icon/noFiles.svg"
              alt="noData"
              style={{ marginBottom: "40px" }}
            />
            <br />
            <span className="MainContentSubheader" style={{ color: "#252b33" }}>
              No car records yet
            </span>
            <br />
            <span
              className="MainContentSubheader"
              style={{ lineHeight: "2em" }}
            >
              Click on the add vehicle button to add to your fleet
            </span>
            {this.handleAddVehicle()}
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%" }}>
          <div style={{ float: "right" }}>{this.handleAddVehicle()}</div>
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  {this.state.tableColumns.map((column, index) => {
                    return (
                      <StyledTableCell key={index}>{column}</StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {this.state.vehicles.map((vehicle, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <span>{vehicle.make}</span>
                        <br />
                        <span className="DocumentUploadSubtitle">
                          {vehicle.licence.toUpperCase()}
                        </span>
                      </StyledTableCell>
                      <StyledTableCell className="DocumentUploadSubtitle">
                        {vehicle.model}
                      </StyledTableCell>
                      <StyledTableCell className="DocumentUploadSubtitle">
                        {vehicle.year}
                      </StyledTableCell>
                      <StyledTableCell>{vehicle.color}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CustomSnackbar
          hideAlert={this.snackbarClose}
          showSnack={this.state.snackbaropen}
          hideSnack={this.snackbarClose}
          response={this.state.responseStatus}
          title={this.state.snackbarmsg}
          messagetxt={this.state.snackbartxt} />
        <div className="WarningBar">
          <img src="/icon/warning.svg" alt="warning" />
          <span>
            Vehicle details can also be added and managed from the fleet
            management tab
          </span>
        </div>
        <div className="DocumentUploadView">{this.handleView()}</div>
        <div className="ProfileSaveButton">
          <button
            className="SignUpFormsSubmit"
            style={
              this.state.vehicles.length === 0 ? { display: "none" } : null
            }
            disabled={this.state.vehicles.length === 0 ? true : false}
            onClick={() => this.handleSubmit()}
          >
            Save and submit
          </button>
        </div>
        <MuiThemeProvider theme={themeModal}>
          <Modal
            className={classes.modal}
            open={this.state.setOpen}
            onClose={() => this.handleOpen()}
            closeAfterTransition
            BackdropComponent={Backdrop}
          >
            <div className={classes.paper}>
              <div className="ModalPaper">
                <div className="ModalHeader">
                  <div>
                    <button
                      className="BackButton"
                      style={{ float: "right" }}
                      onClick={() => this.setState({ setOpen: false })}
                    >
                      <img src="./icon/close.svg" alt="x" />
                    </button>
                  </div>
                  <div style={{ alignItems: "center" }}>
                    <span className="MainContentHeader">Add Vehicle</span>
                    <br />
                    <span className="MainContentSubheader">
                      Fill in the form below with details of your car
                    </span>
                  </div>
                </div>
                <div className="ProfileForm" style={{ marginTop: "10px" }}>
                  <label>Make</label>
                  <Select
                    className="FilterSelect"
                    name="make"
                    style={{
                      fontFamily: "inherit",
                      fontSize: "14px",
                      paddingLeft: "13px"
                    }}
                    value={this.state.make}
                    onChange={event => this.handleFormInput(event)}
                    disableUnderline={true}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value="none"
                      disabled
                      style={{ color: "#003c58" }}
                    >
                      Choose - -
                    </MenuItem>
                    {this.state.availableMakes.map((make, index) => (
                      <MenuItem value={make} key={index}>
                        {make.make}
                      </MenuItem>
                    ))}
                  </Select>
                  <label>Model</label>
                  <Select
                    className="FilterSelect"
                    name="model"
                    style={{
                      fontFamily: "inherit",
                      fontSize: "14px",
                      paddingLeft: "13px"
                    }}
                    value={this.state.model}
                    onChange={event => this.handleFormInput(event)}
                    disableUnderline={true}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value="none"
                      disabled
                      style={{ color: "#003c58" }}
                    >
                      Choose - -
                    </MenuItem>
                    {this.state.availableModels.map((model, index) => (
                      <MenuItem value={model} key={index}>
                        {model.model}
                      </MenuItem>
                    ))}
                  </Select>
                  <label>Year of manufacture</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      id="manufacture"
                      variant="inline"
                      openTo="year"
                      format="yyyy"
                      disableFuture
                      views={["year"]}
                      value={this.state.manufacture}
                      onChange={this.handleDate}
                      InputProps={{
                        disableUnderline: true
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <label>License plate</label>
                  <input
                    id="licensePlate"
                    type="text"
                    style={{ textTransform: "uppercase" }}
                    value={this.state.licensePlate}
                    onChange={this.handleFormInput}
                    autoComplete="off"
                    required
                  />
                  <label>Vehicle color</label>
                  <input
                    id="vehicleColor"
                    type="text"
                    value={this.state.vehicleColor}
                    onChange={this.handleFormInput}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="ModalFooter">
                  <button
                    className={
                      this.state.licensePlate !== "" &&
                      this.state.vehicleColor !== ""
                        ? "WarningContainerButton"
                        : "SignUpFormsSubmitDisabled"
                    }
                    disabled={
                      this.state.licensePlate !== "" &&
                      this.state.vehicleColor !== ""
                        ? false
                        : true
                    }
                    onClick={() => this.handleAddVehicleDetails()}
                  >
                    + Add vehicle
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

export default withStyles(stylesModal)(VehicleDetails);
