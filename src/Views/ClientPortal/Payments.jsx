import React, { Component } from "react";
import Loader from "../../Components/SharedComponents/Loader";
import TopBar from "../../Components/SharedComponents/TopBar";
import Menu from "../../Components/SharedComponents/Menu";
import { Grid, withStyles, Paper } from "@material-ui/core";
import AccountBalances from "../../Components/Dashboard/AccountBalances";
import QuickActions from "../../Components/Dashboard/QuickActions";
import Filter from "../../Components/SharedComponents/Filter";
import Search from "../../Components/SharedComponents/Search";
import PaymentsTable from "../../Components/Payments/PaymentsTable";
import TopUp from "../../Components/Payments/TopUp";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  paper: {
    boxShadow: "none",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.63)"
  },
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});

class Payments extends Component {
  constructor() {
    super();
    this.state = {
      view: 0,
      account: [],
      payments: [
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Send to bank",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Failed"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Failed"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        },
        {
          type: "Deposit to wallet",
          id: "ADjsd1496",
          amount: 2000,
          currency: "KES",
          date: "Mar 20 08:15PM",
          status: "Successful"
        }
      ],
      searchItem: "",
      startDate: new Date(),
      endDate: new Date(),
      transactionType: "none",
      transactionID: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  componentDidMount() {
    var view = this.props.history.location.view
      ? this.props.history.location.view
      : 0;
    this.handleView(view);
      const userdata = JSON.parse(localStorage.getItem("userData"));
      var accounts = userdata.accountDetails[0];
      console.log(accounts);
      this.setState({ account: accounts });
      
  }

  handleSearch(searchItem) {
    this.setState({ searchItem: searchItem });
  }

  handleFilter(startDate, endDate, transactionType, transactionID) {
    this.setState({
      startDate: startDate,
      endDate: endDate,
      transactionType: transactionType,
      transactionID: transactionID
    });
  }

  handleView(view) {
    this.setState({ view: view });
  }

  handleDisplay(view) {
    const { classes } = this.props;
    var payments = this.state.payments.filter(entry =>
      Object.values(entry).some(
        val =>
          typeof val === "string" &&
          val.toLowerCase().includes(this.state.searchItem.toLowerCase())
      )
    );
    switch (view) {
      case 0:
        return (
          <div className="Content">
            <div className="ContentHeader">
              <span className="MainContentHeader Bold">Payments</span>
              <br />
              <span className="MainContentSubheader">
                Showing wallet balances and recent payments. From here you can
                be able to cah-out or top-up your wallet for investments
              </span>
            </div>
            <div className="ContentSpace">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                  <Paper className={classes.paper} style={{ height: "164px" }}>
                    <AccountBalances account={this.state.account} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                  <Paper className={classes.paper} style={{ height: "164px" }}>
                    <QuickActions
                      payments={true}
                      handleView={this.handleView}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Paper
                    className={classes.paper}
                    style={{ minHeight: "740px", marginTop: "40px" }}
                  >
                    <div className="DisplayFlexB">
                      <div
                        style={{
                          marginRight: "15px",
                          marginBottom: "20px"
                        }}
                      >
                        <Filter
                          handleFilter={this.handleFilter}
                          payments={true}
                        />
                      </div>
                      <Search
                        searchItem={this.state.searchItem}
                        placeholder={"Search by transaction ID or type"}
                        handleSearch={this.handleSearch}
                      />
                    </div>
                    <div>
                      <PaymentsTable payments={payments} />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        );
      case 1:
        return <TopUp handleView={this.handleView} />;
      default:
        return "Unknown view";
    }
  }

  render() {
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
              {this.handleDisplay(this.state.view)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Payments));
