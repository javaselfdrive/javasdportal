import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./Routes";
import "./Styles/App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import IdleTimer from "react-idle-timer";

const browserHistory = createBrowserHistory();

const avenir = {
  fontFamily: "Avenir LT Pro 55 Roman",
  src:
    "local('Avenir LT Pro 55 Roman'), url('./fonts/AvenirLTProRoman.woff') format('woff')"
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Avenir LT Pro 55 Roman !important"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [avenir]
      }
    },
    MuiTypography: {
      root: {
        fontFamily: "Avenir LT Pro 55 Roman !important"
      }
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  handleOnActive() {
    console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  handleOnIdle() {
    localStorage.clear();
    window.location.reload();
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {/* <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 15}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          debounce={250}
        /> */}
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;
