import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <img src="/icon/search.svg" alt="search" />
        <input
          id="searchItem"
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.searchItem}
          onChange={event => this.props.handleSearch(event.target.value)}
        />
      </div>
    );
  }
}

export default Search;
