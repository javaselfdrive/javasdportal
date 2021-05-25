import React, { Component } from "react";
import Background from "../../Styles/icon/Accountbalances.svg";

class AccountBalances extends Component {
  render() {
    var account = this.props.account;
    console.log(account)
    return (
      <div
        className="Cards AccountBalances"
        style={{ background: `url(${Background})` }}
      >
        <div className="DisplayFlex1">
          <div>
            <span className="WhiteText">Account balance</span>
          </div>
          <img src="/icon/refresh.svg" alt="refresh" />
        </div>
        <div className="AccountBalancesMiddle">
          <div>
            <span className="WhiteText">{account.AccountName}</span>
          </div>
          <div>
            <span className="WhiteText" style={{fontWeight:"normal"}}>A/c ID: {account.AccountNumber}</span>
          </div>
        </div>
        <div className="AccountBalancesBottom">
          <div>
            <span
              className="WhiteText"
              style={{ color: " rgba(245, 249, 254, 0.63)" }}
            >
              Available balance
            </span>
          </div>
          <div>
            <span className="WhiteText" style={{ fontSize: "24px" }}>
              {account.AccountCurrency} {account.AccountBalance}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountBalances;
