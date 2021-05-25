import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class QuickActions extends Component {
  render() {
    return (
      <div
        className="Cards"
        style={this.props.payments ? { padding: "0px" } : null}
      >
        {!this.props.payments ? (
          <div>
            <span className="CardTitle">Quick actions</span>
          </div>
        ) : null}
        <button
          className="ContentWhiteButton"
          style={this.props.payments ? { marginTop: "0px" } : null}
          onClick={
            this.props.payments
              ? () => this.props.handleView(1)
              : () => {
                  this.props.history.push({
                    pathname: "/Payments",
                    view: 1
                  });
                  localStorage.setItem("menu", "Payments");
                }
          }
        >
          <img src="/icon/walletTopup.svg" alt="wallet" />
          <span>Top-up wallet</span>
        </button>
        <button className="ContentWhiteButton">
          <img src="/icon/sendMoney.svg" alt="send" />
          <span>Send money</span>
        </button>
        {this.props.payments ? (
          <button className="ContentWhiteButton">
            <img src="/icon/manage.svg" alt="manage" />
            <span>Manage account</span>
          </button>
        ) : null}
      </div>
    );
  }
}

export default withRouter(QuickActions);
