import React, { Component } from "react";
import Loader from "../../Components/SharedComponents/Loader";
import TopBar from "../../Components/SharedComponents/TopBar";
import Menu from "../../Components/SharedComponents/Menu";
import { Grid, withStyles, Paper } from "@material-ui/core";
import AccountBalances from "../../Components/Dashboard/AccountBalances";
import QuickActions from "../../Components/Dashboard/QuickActions";
import BookingActivity from "../../Components/Dashboard/BookingActivity";
import RecentBookings from "../../Components/Dashboard/RecentBooking";
import TopCar from "../../Components/Dashboard/TopCar";
import LearnMore from "../../Components/Dashboard/LearnMore";
import BookingRevenue from "../../Components/Dashboard/BookingRevenue";
import Tour from "../../Components/Tour";
//import {getRequest} from "../../Services/FetchFunctions";

const styles = theme => ({
  paper: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "solid 1px #f1f1f1",
    backgroundColor: "rgba(255, 255, 255, 0.63)"
  },
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      completed: 5,
      buffer: 10,
      title: "",
      message: "",
      account: [],
      bookingStatus: 60,
      revenue: [30000, 40000, 30000, 40000, 20000, 40000, 42000],
      bookings: [
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KDA 123H"
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KDA 123H"
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KDA 123H"
        }
      ],
      topCar: [
        {
          carMake: "Subaru",
          carModel: "WRX",
          carYear: "2018",
          carReg: "KCB 120B",
          carImage: "./icon/vehicle.jpg",
          amountGenerated: "KES 15,000.00",
          totalBookings: "10"
        }
      ],
      validEmail: false,
      success: false,
      open: false,
      isLoading: false,
      blocking: false,
      selectedPeriod: "W",
      activeTour: 0,
      tourOpen: false
    };
    this.handleSelectedPeriod = this.handleSelectedPeriod.bind(this);
    this.handleDashboardTour = this.handleDashboardTour.bind(this);
  }
  componentDidMount() {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    var accounts = userdata.accountDetails[0];
    console.log(accounts);
    this.setState({ account: accounts });
    
  }

  handleSelectedPeriod(period) {
    this.setState({ selectedPeriod: period });
  }

  handleDashboardTour(active, open) {
    this.setState({ activeTour: active, tourOpen: open });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.isLoading ? (
          <Loader text="Preparing your dashboard" />
        ) : (
          <div className="ContainerApp">
            <TopBar
              username="John doe"
              handleDashboardTour={this.handleDashboardTour}
            />
            <div className="MainBody">
              <div className="Menu">
                {this.state.activeTour === 2 && this.state.tourOpen ? (
                  <Tour
                    handleDashboardTour={this.handleDashboardTour}
                    activeTour={this.state.activeTour}
                  />
                ) : null}

                <Menu />
              </div>
              <div className="Content">
                <div className="ContentHeader">
                  <span className="MainContentHeader Bold">My dashboard</span>
                  <br />
                  <span className="MainContentSubheader">
                    Here you can view your wallet and booking information as
                    well as overall performance
                  </span>
                </div>
                <div className="ContentSpace">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      {this.state.activeTour === 0 && this.state.tourOpen ? (
                        <Tour
                          handleDashboardTour={this.handleDashboardTour}
                          activeTour={this.state.activeTour}
                        />
                      ) : null}
                      <Paper
                        className={classes.paper}
                        style={{ height: "179px" }}
                      >
                        <AccountBalances account={this.state.account} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      <Paper
                        className={classes.paper}
                        style={{ height: "179px" }}
                      >
                        <QuickActions />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                      {this.state.activeTour === 1 && this.state.tourOpen ? (
                        <Tour
                          handleDashboardTour={this.handleDashboardTour}
                          activeTour={this.state.activeTour}
                        />
                      ) : null}
                      <Paper
                        className={classes.paper}
                        style={{ height: "179px" }}
                      >
                        <BookingActivity status={this.state.bookingStatus} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={7}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className="MiddleCards"
                      >
                        {this.state.activeTour === 3 && this.state.tourOpen ? (
                          <Tour
                            handleDashboardTour={this.handleDashboardTour}
                            activeTour={this.state.activeTour}
                          />
                        ) : null}

                        <Paper
                          className={classes.paper}
                          style={{ height: "290px" }}
                        >
                          <BookingRevenue
                            handleSelectedPeriod={this.handleSelectedPeriod}
                            selectedPeriod={this.state.selectedPeriod}
                            revenue={this.state.revenue}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper
                          className={classes.paper}
                          style={{ minHeight: "259px" }}
                        >
                          <TopCar topCar={this.state.topCar} />
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className="MiddleCards"
                      >
                        <Paper
                          className={classes.paper}
                          style={{ height: "290px" }}
                        >
                          <RecentBookings bookings={this.state.bookings} />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper
                          className={classes.paper}
                          style={{ height: "259px" }}
                        >
                          <LearnMore />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
