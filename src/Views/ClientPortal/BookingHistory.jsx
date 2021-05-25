import React, { Component } from "react";
import Loader from "../../Components/SharedComponents/Loader";
import TopBar from "../../Components/SharedComponents/TopBar";
import Menu from "../../Components/SharedComponents/Menu";
import Search from "../../Components/SharedComponents/Search";
import Filter from "../../Components/SharedComponents/Filter";
import BookingHistoryTable from "../../Components/BookingHistory/BookingHistoryTable";
import {getRequest} from "../../Services/FetchFunctions";

class BookingHistory extends Component {
  constructor() {
    super();
    this.state = {
      bookingHistory: [
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 215H",
          trip: "In progress",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 216H",
          trip: "Cancelled",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 217H",
          trip: "Completed",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 218H",
          trip: "Completed",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 215H",
          trip: "In progress",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 216H",
          trip: "Cancelled",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 217H",
          trip: "Completed",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 218H",
          trip: "Completed",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 215H",
          trip: "In progress",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 216H",
          trip: "Cancelled",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 217H",
          trip: "Completed",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        },
        {
          carMake: "Toyota",
          carModel: "Allion A18",
          carReg: "KCD 218H",
          trip: "Completed",
          handoverTime: "Apr 05 08:21AM",
          expectedRT: "Apr 08 08:21AM",
          time: "05 Apr 2021 15:17:09",
          currency: "KES",
          amount: 2000,
          invoice: 271002020016,
          bookingFee: 4500
        }
      ],
      systemFee: 500,
      searchItem: "",
      selected: {},
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount(){
    var endpoint = "client/book-history";
    getRequest(endpoint).then(resp=>{console.log(resp)}).catch(err=>{
      console.log(err);
    });
  }

  handleSearch(searchItem) {
    this.setState({ searchItem: searchItem });
  }

  handleFilter(startDate, endDate) {
    this.setState({ startDate: startDate, endDate: endDate });
  }
  render() {
    var bookingHistory = this.state.bookingHistory.filter(entry =>
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
              <div className="ContentFull" style={{ background: "#ffffff" }}>
                <div className="ContentHeaderBlue">
                  <span
                    className="MainContentHeader Bold"
                    style={{ color: "#ffffff" }}
                  >
                    Booking history
                  </span>
                  <br />
                  <span
                    className="MainContentSubheader"
                    style={{ color: "#F5F9FE" }}
                  >
                    Showing all records of recent bookings. Click to view more
                    details
                  </span>
                </div>
                <div
                  className="ContentSpace"
                  style={{ padding: "30px", marginTop: "10px" }}
                >
                  <div className="DisplayFlexB">
                    <div style={{ marginRight: "15px", marginBottom: "20px" }}>
                      <Filter handleFilter={this.handleFilter} />
                    </div>
                    <Search
                      searchItem={this.state.searchItem}
                      placeholder={"Search by vehicle name or number plate"}
                      handleSearch={this.handleSearch}
                    />
                  </div>
                  <div>
                    <BookingHistoryTable
                      bookingHistory={bookingHistory}
                      systemFee={this.state.systemFee}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BookingHistory;
