import React, { Component } from "react";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
  Hidden,
  Drawer,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";

const stylesIndex = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const themeAppBar = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#FFFFFF",
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: " 0px 1px 0px #E5E9F2",
      },
    },
    MuiButton: {
      root: {
        marginRight: "15px",
        fontFamily: "inherit",
        color: "#252B33 !important",
        fontSize: "14px",
        fontWeight: 500,
        textTransform: "none",
        backgroundColor: "none !important",
        border: "2px solid #ffffff !important",
        position: "relative",
        "&:hover": {
          backgroundColor: "none !important",
        },
        "&:focus": {
          backgroundColor: "none !important",
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: "150px",
        alignItems: "center",
        paddingTop: "50px",
      },
    },
  },
});

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      landingPageMenu: [
        { id: "How", label: "How it works" },
        { id: "Cards", label: "Cars" },
        { id: "Partners", label: "Partners" },
        { id: "Contact", label: "Contact" },
        { id: "Support", label: "Support" },
      ],
      menu: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(menuItem) {
    this.setState({ menu: menuItem });
    this.props.history.push(`/${menuItem}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  handleDrawerToggle = () => {
    if (this.state.mobileOpen) {
      this.setState({ mobileOpen: false });
    } else {
      this.setState({ mobileOpen: true });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={themeAppBar}>
          <AppBar position="fixed">
            <Toolbar>
              <div className="DisplayFlex1" style={{ flexGrow: 1 }}>
                <img
                  alt="JAVA DRIVE SAFE"
                  src="./icon/app-logo.svg"
                  style={{ marginLeft: "15%" }}
                />
              </div>

              <Hidden smUp implementation="css">
                <IconButton
                  edge="false"
                  onClick={() => this.handleDrawerToggle()}
                  className={classes.menuButton}
                  color="#000000"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  variant="temporary"
                  anchor="right"
                  open={this.state.mobileOpen}
                  onClick={() => this.handleDrawerToggle()}
                  ModalProps={{
                    keepMounted: true,
                  }}
                >
                  {this.state.landingPageMenu.map((menu, index) => (
                    <Button
                      color="inherit"
                      key="index"
                      className="landingPageButton"
                    >
                      {menu.label}
                    </Button>
                  ))}
                  <button
                    className="PurpleButton"
                    style={{ margin: "10px 0 20px 0", width: "100px" }}
                  >
                    Login
                  </button>
                  <button
                    className="SignUpFormsSubmit"
                    style={{ width: "100px" }}
                  >
                    Get started
                  </button>
                </Drawer>
              </Hidden>
              <Hidden xsDown>
                {this.state.landingPageMenu.map((menu, index) => (
                  <Button
                    color="inherit"
                    key="index"
                    className="landingPageButton"
                  >
                    {menu.label}
                  </Button>
                ))}
                <button
                  className="PurpleButton"
                  style={{ marginRight: "30px", width: "62px" }}
                  onClick={() => this.props.history.push("/Login")}
                >
                  Login
                </button>
                <button
                  className="SignUpFormsSubmit"
                  style={{ marginBottom: "0px", width: "100px", marginRight: "10%" }}
                >
                  Get started
                </button>
              </Hidden>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(withStyles(stylesIndex)(AppMenu));
