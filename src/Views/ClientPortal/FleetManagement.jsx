import React, { Component } from "react";
import Loader from "../../Components/SharedComponents/Loader";
import TopBar from "../../Components/SharedComponents/TopBar";
import Menu from "../../Components/SharedComponents/Menu";
import { Grid, withStyles, Paper } from "@material-ui/core";
import FleetTable from "../../Components/FleetManagement/FleetTable";
import Search from "../../Components/SharedComponents/Search";
import FleetMoreDetails from "../../Components/FleetManagement/FleetMoreDetails";
import VehicleDetails from "../../Components/FleetManagement/VehicleDetails";
import {getRequest} from "../../Services/FetchFunctions";

const styles = theme => ({
  paper: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "solid 1px transparent",
    backgroundColor: "#ffffff",
    minHeight: "100vh"
  },
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});

class FleetManagement extends Component {
  constructor() {
    super();
    this.state = {
      vehicleStatus: [
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 215H",
          location: "Riara road, Makini school",
          trip: "In progress",
          speed: 0,
          status: "Parked",
          battery: 0,
          altitude: 60,
          time: "05 Apr 2021 15:17:09",
          odometer: 114000.1,
          locationFull: "Riara road, Kilimani, Nairobi",
          latitude: -1.3002060509867428,
          longitude: 36.806397368547024,
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          fuel: 40,
          distanceTE: 120,
          signal: "good",
          bars: "four"
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 216H",
          location: "Riara road, Makini school",
          trip: "Cancelled",
          speed: 0,
          status: "Parked",
          battery: 0,
          altitude: 60,
          time: "05 Apr 2021 15:17:09",
          odometer: 114.1,
          locationFull: "Riara road, Kilimani, Nairobi",
          latitude: -1.2982890293562892,
          longitude: 36.76223304597494,
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          fuel: 40,
          distanceTE: 120,
          signal: "ok",
          bars: "three"
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 217H",
          location: "Riara road, Makini school",
          trip: "Completed",
          speed: 0,
          status: "Parked",
          battery: 0,
          altitude: 60,
          time: "05 Apr 2021 15:17:09",
          odometer: 1100.0,
          locationFull: "Riara road, Kilimani, Nairobi",
          latitude: -1.2951488169172471,
          longitude: 36.77007725396935,
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          fuel: 40,
          distanceTE: 120,
          signal: "bad",
          bars: "two"
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 218H",
          location: "Riara road, Makini school",
          trip: "Completed",
          speed: 0,
          status: "Parked",
          battery: 0,
          altitude: 60,
          time: "05 Apr 2021 15:17:09",
          odometer: 114000.0,
          locationFull: "Riara road, Kilimani, Nairobi",
          latitude: -1.2976990947987668,
          longitude: 36.76490452592946,
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          fuel: 40,
          distanceTE: 120,
          signal: "bad",
          bars: "one"
        }
      ],
      searchItem: "",
      selected: {},
      viewMore: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  componentDidMount(){
    var endpoint = "client/vehicle/list";
    getRequest(endpoint).then(resp=>{console.log(resp)}).catch(err=>{
      console.log(err);
    });
  }
  
  handleSearch(searchItem) {
    this.setState({ searchItem: searchItem });
  }

  handleOpen(carData) {
    this.setState({ selected: carData, viewMore: true });
  }

  handleSelected(carData) {
    this.setState({ selected: carData });
  }

  handleClose() {
    this.setState({ viewMore: false });
  }

  render() {
    const { classes } = this.props;
    var fleet = this.state.vehicleStatus.filter(entry =>
      Object.values(entry).some(
        val =>
          typeof val === "string" &&
          val.toLowerCase().includes(this.state.searchItem.toLowerCase())
      )
    );

    return (
      <div>
        {this.state.isLoading ? (
          <Loader text="Preparing your view" />
        ) : (
          <div className="ContainerApp">
            <TopBar username="John doe" />
            <div className="MainBody">
              <div className="Menu">
                <Menu />
              </div>
              <div className="ContentFull">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Paper className={classes.paper} style={{ height: "100%" }}>
                      <div className="FleetManagementTableCard">
                        <div className="ContentHeader">
                          <span className="MainContentHeader Bold">
                            Fleet management
                          </span>
                          <br />
                          <span className="MainContentSubheader">
                            Select on a vehicle below to view status and
                            location
                          </span>
                        </div>
                        <div>
                          <div className="FilterDiv">
                            <img
                              src="/icon/filter.svg"
                              alt="filter"
                              style={{ marginRight: "10px" }}
                            />
                            <span className="BlackText">Filters</span>
                          </div>
                          <div
                            style={{ marginTop: "10px", marginBottom: "30px" }}
                          >
                            <Search
                              searchItem={this.state.searchItem}
                              placeholder={
                                "Search by vehicle name or number plate"
                              }
                              handleSearch={this.handleSearch}
                            />
                          </div>
                          <FleetTable
                            fleet={fleet}
                            handleSelected={this.handleSelected}
                            selected={
                              Object.keys(this.state.selected).length === 0
                                ? fleet[0]
                                : this.state.selected
                            }
                          />
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={8}>
                    {this.state.viewMore ? (
                      <VehicleDetails
                        carDetails={
                          Object.keys(this.state.selected).length === 0
                            ? fleet[0]
                            : this.state.selected
                        }
                        handleClose={this.handleClose}
                      />
                    ) : (
                      <Paper
                        className={classes.paper}
                        style={{ height: "100%" }}
                      >
                        <FleetMoreDetails
                          carDetails={
                            Object.keys(this.state.selected).length === 0
                              ? fleet[0]
                              : this.state.selected
                          }
                          handleOpen={this.handleOpen}
                        />
                      </Paper>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FleetManagement);
