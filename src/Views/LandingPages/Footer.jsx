import React, { Component } from "react";
import { Grid } from "@material-ui/core";

class LandingPageFooter extends Component {
  constructor() {
    super();
    this.state = {
      companyMenu: [{ label: "About Us", path: "" }, { label: "Blog", path: "" }, { label: "Media kit", path: "" }, { label: "Contact Us", path: "" }],
      solutionsMenu: [{ label: "Riders", path: "" }, { label: "Drivers", path: "" }, { label: "Business partners", path: "" }, { label: "Import a car", path: "" }],
      legalMenu: [{ label: "Cookies Policy", path: "" }, { label: "Privacy & security policy", path: "" }, { label: "Terms of service", path: "" }, { label: "Law Enforcement", path: "" }],
      resourcesMenu: [{ label: "Investments", path: "" }, { label: "Drivers info", path: "" }],
      icons: [{ src: "/icon/Instagram.svg", path: "", label: "IG" }, { src: "/icon/Twitter.svg", path: "", label: "Twitter" }, { src: "/icon/Youtube.svg", path: "", label: "YT" }],
    };
  }
  render() {
    return <div className="footer">
      <div className="footerMenu">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <div style={{ marginBottom: "24px" }}>
              <span className="LandingPageWhiteText" style={{ fontSize: "18px", paddingBottom: "20px" }}>Company</span>
            </div>
            {this.state.companyMenu.map((menu, index) => (
              <div className="footerMenulist" key={index}>
                <span className="LandingPageWhiteText">{menu.label}</span>
              </div>
            ))}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <div style={{ marginBottom: "24px" }}>
              <span className="LandingPageWhiteText" style={{ fontSize: "18px", paddingBottom: "20px" }}>Our solution</span>
            </div>
            {this.state.solutionsMenu.map((menu, index) => (
              <div className="footerMenulist" key={index}>
                <span className="LandingPageWhiteText">{menu.label}</span>
              </div>
            ))}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <div style={{ marginBottom: "24px" }}>
              <span className="LandingPageWhiteText" style={{ fontSize: "18px", paddingBottom: "20px" }}>Legal</span>
            </div>
            {this.state.legalMenu.map((menu, index) => (
              <div className="footerMenulist" key={index}>
                <span className="LandingPageWhiteText">{menu.label}</span>
              </div>
            ))}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <div style={{ marginBottom: "24px" }}>
              <span className="LandingPageWhiteText" style={{ fontSize: "18px", paddingBottom: "20px" }}>Resources</span>
            </div>
            {this.state.resourcesMenu.map((menu, index) => (
              <div className="footerMenulist" key={index}>
                <span className="LandingPageWhiteText">{menu.label}</span>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>

      <div className="footerRights">
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <span className="LandingPageWhiteText">© 2021 JavaSelfDrive. All rights reserved</span>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="footerIcons">
              {this.state.icons.map((icon, index) => (
                <div className="BG" key={index}>
                  <img src={icon.src} alt={icon.label} />
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>;
  }
}

export default LandingPageFooter;
