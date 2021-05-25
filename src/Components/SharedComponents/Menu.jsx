import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import {
  ThemeProvider,
  createMuiTheme,
  Hidden,
  IconButton,
  List,
  ListItem,
  Drawer,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "none",
      },
      paper: {},
    },
    MuiListItem: {
      root: {
        marginLeft: "10px",
        marginRight: "10px",
        // width: "auto",
        width: "190px",
      },
    },
    MuiSvgIcon: {
      root: {
        position: "fixed",
        color: "#000000",
      },
    },
    MuiIconButton: {
      edgeStart: {
        marginLeft: "4px",
      },
    },
  },
});

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      menuClient: [
        { id: "Profile", src: "./icon/profileDash.svg", label: "Get started" },
        { id: "Dashboard", src: "./icon/dashboard.svg", label: "Dashboard" },
        {
          id: "FleetManagement",
          src: "./icon/car.svg",
          label: "Fleet management",
        },
        {
          id: "BookingHistory",
          src: "./icon/booking.svg",
          label: "Booking history",
        },
        { id: "Payments", src: "./icon/payments.svg", label: "Payments" },
        {
          id: "InvestmentAccount",
          src: "./icon/accounts.svg",
          label: "Investment account",
        },
        { id: "Settings", src: "./icon/settings.svg", label: "Settings" },
      ],
      menu: localStorage.getItem("menu") || "Profile",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.handleRenderMenu();
  }

  logout() {
    localStorage.clear();
    setTimeout(() => this.props.history.push("/Login"), 2000);
  }

  handleChange(menuItem) {
    this.setState({ menu: menuItem });
    localStorage.setItem("menu", menuItem);
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

  handleRenderMenu() {
    var user = "client";
    if (this.state.menu === "Profile") {
      var percentage = this.props.complete
        ? this.props.complete.filter(function (x) {
            return x === true;
          }).length * 20
        : 0;
    }

    if (user === "client") {
      return (
        <div>
          <List
            style={{
              paddingTop: "0px",
            }}
          >
            <ListItem className="MenuListLogo">
              <img alt="Institution logo" src={"/logo/logo.png"} />
            </ListItem>
            {this.state.menu === "Profile" ? (
              percentage < 100 ? (
                <ListItem className="MenuListLogoProfile">
                  <span
                    className="ProfileSpanText MainContentHeader"
                    style={{ color: "#002ad1" }}
                  >
                    Profile completion
                  </span>
                  <br />
                  <span className="ProfileSpanText">
                    Finish your profile details to complete the approval process
                  </span>
                  <div
                    className="DisplayFlexSpace"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="ProfilePercentage">
                      <div
                        className="ProfilePercentageBarBlue"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="ProfilePercentageSpanBlue">
                      {percentage}% complete
                    </div>
                  </div>
                </ListItem>
              ) : (
                <ListItem className="MenuListLogoProfile">
                  <span
                    className="ProfileSpanText MainContentHeader"
                    style={{ color: "#002ad1" }}
                  >
                    Verification review
                  </span>
                  <br />
                  <span className="ProfileSpanText">
                    Thank you for submitting your documents. Our team will
                    review and get back to you{" "}
                  </span>
                </ListItem>
              )
            ) : null}

            {this.state.menuClient.map((menu, index) => {
              return (
                <ListItem
                  className="MenuList"
                  key={index}
                  onClick={this.handleChange.bind(this, menu.id)}
                  style={
                    this.state.menu === menu.id
                      ? { backgroundColor: "#002AD11A" }
                      : { backgroundColor: "inherit" }
                  }
                  button
                >
                  <img
                    src={menu.src}
                    style={
                      this.state.menu === menu.id
                        ? {
                            filter:
                              "invert(12%) sepia(89%) saturate(6720%) hue-rotate(234deg) brightness(79%) contrast(110%)",
                          }
                        : null
                    }
                    alt={menu.id}
                  ></img>
                  <span
                    className="MenuListText"
                    style={
                      this.state.menu === menu.id ? { color: "#002AD1" } : null
                    }
                  >
                    {menu.label}
                  </span>
                </ListItem>
              );
            })}
          </List>
          <div className="MenuRedirect">
            <div style={{ display: "grid", padding: "20px" }}>
              <button className="RedirectButtonMain">Privacy statement</button>
              <button className="RedirectButtonMain">Terms of use</button>
              <hr
                style={{
                  border: "0.1px solid rgba(37, 43, 51, 0.1)",
                  width: "90%",
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              />
              <span>© JavaOrient Kenya Ltd 2021</span>
              <br />
              <span> All rights reserved</span>
            </div>
          </div>
        </div>
      );
    } else {
      this.logout();
    }
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <img
            style={{
              position: "fixed",
              top: "1em",
              left: "0px",
              zIndex: "10",
              marginLeft: "3em",
            }}
            alt="Institution logo"
            src={"/logo/logo.png"}
          />
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => this.handleDrawerToggle()}
            style={{
              position: "fixed",
              top: "-0.3em",
              left: "0.4em",
              zIndex: "10",
              height: "60px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <nav aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={this.state.mobileOpen}
                onClick={() => this.handleDrawerToggle()}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {this.handleRenderMenu()}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer variant="permanent" open>
                {this.handleRenderMenu()}
              </Drawer>
            </Hidden>
          </nav>
        </ThemeProvider>
      </div>
    );
  }
}

Menu.propTypes = {
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default withRouter(Menu);
