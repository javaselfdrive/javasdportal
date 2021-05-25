import React, { Component } from "react";
import Filter from "../SharedComponents/Filter";
import Search from "../SharedComponents/Search";
import Export from "../SharedComponents/Export";
import InvestmentAccountTable from "./InvestmentAccountTable";
import Remove from "./Remove";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      view: 0,
      searchItem: "",
      startDate: new Date(),
      endDate: new Date(),
      investments: [
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 130H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Inactive",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
        {
          carImage: "./icon/vehicle1.jpg",
          carMake: "Subaru",
          carModel: "WRX 2021",
          carReg: "KDB 120H",
          date: "Mar 20 08:15PM",
          currency: "KES",
          amount: 2000,
          bookings: 12,
          status: "Active",
        },
      ],
      filteredData: {},
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
  }

  handleSelectedRow(row) {
    this.setState({ filteredData: row });
  }

  handleView(view) {
    this.setState({ view: view });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  handleSearch(searchItem) {
    this.setState({ searchItem: searchItem });
  }

  handleFilter(startDate, endDate) {
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });
  }

  handleDisplay(view) {
    var investments = this.state.investments.filter((entry) =>
      Object.values(entry).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(this.state.searchItem.toLowerCase())
      )
    );

    if (view === 2) {
      return (
        <Remove handleView={this.handleView} data={this.state.filteredData} />
      );
    } else {
      return (
        <div>
          <div className="DisplayFlex">
            <div
              className="DisplayFlexB"
              style={{
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  marginRight: "15px",
                  marginBottom: "20px",
                }}
              >
                <Filter handleFilter={this.handleFilter} payments={false} />
              </div>
              <Search
                searchItem={this.state.searchItem}
                placeholder={"Search by vehicle name or number plate"}
                handleSearch={this.handleSearch}
              />
            </div>
            <Export />
          </div>
          <div>
            <InvestmentAccountTable
              investments={investments}
              handleView={this.handleView}
              handleSelectedRow={this.handleSelectedRow}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.handleDisplay(this.state.view)}</div>;
  }
}

export default Portfolio;
