import React, { Component } from "react";
import { CircularProgress, withStyles } from "@material-ui/core";

const styles = theme => ({
  circle: {
    strokeLinecap: "round"
  }
});

class Progress extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="BookingStatus">
        <CircularProgress
          variant="determinate"
          value={this.props.status}
          classes={{
            circle: classes.circle
          }}
          style={
            this.props.status < 50 ? { color: "#002AD1" } : { color: "#f58730" }
          }
          size={this.props.height}
          thickness={4}
        />
        <span className="BlackText">{this.props.status}%</span>
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
