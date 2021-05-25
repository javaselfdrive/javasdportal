import React, { Component } from "react";
import LandingPageFooter from "./Footer";
import AppMenu from "./menu";
import { Grid, Hidden } from "@material-ui/core";
import AOS from 'aos';
import 'aos/dist/aos.css';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      howItWorks: [{ title: "Select car", text: "Search from our list of vehicles of new and used cars", src: "./icon/01.svg" }, { title: "Payment", text: "Pay full or partial investment amount during checkout", src: "./icon/03.svg" }, { title: "Delivery", text: "Car will be purchased and added to your investment account", src: "./icon/05.svg" }, { title: "Invest", text: "View and manage returns on your investment portfolio", src: "./icon/07.svg" }],
      benefits: [{ title: "Peace of mind", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.", src: "./icon/01.svg" },
      { title: "Peace of mind", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.", src: "./icon/04.svg" },
      { title: "Zero hassles", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.", src: "./icon/06.svg" },
      { title: "24/7 support", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.", src: "./icon/07.svg" }],
      popularModels: [{ model: "Toyota", src: "./icon/toyota.svg" }, { model: "Nissan", src: "./icon/image 3.svg" }, { model: "Volkswagen", src: "./icon/image 4.svg" }, { model: "Mercedes", src: "./icon/image 5.svg" }, { model: "Audi", src: "./icon/image 6.svg" }, { model: "BMW", src: "./icon/image 8.svg" }],
      models: ["Toyota", "Nissan", "Subaru", "Honda", "Mercedes Benz", "Audi", "Volkswagen", "BMW", "Mistubishi", "Lexus", "Mazda", "Landrover", "Ford", "Isuzu", "Chevrolet", "Chrysler", "Peugeot", "Volvo", "Hino"],
      testimonials: [{ name: "Floyd Miles", location: "Nairobi, Kenya", src: "./icon/Floyd.svg", testimony: "I bought my car with JavaSelfDrive, the process was smooth and hassle free. Adding the vehicle to the invesment kit was a delightful experience and I look forward to growing my invesment portfolio to greater numbers." }, { name: "Anita Doe", location: "Mombasa, Kenya", src: "./icon/Anita.svg", testimony: "I use JavaSelfDrive to manage my fleet and view account trends on my portfolio. Would definitely recommend geting an account." }, { name: "James Hartley", location: "Nakuru, Kenya", src: "./icon/James.svg", testimony: "Through JavaSelfDrive, I was able to purchase my first car after I choose to use the partial investment plan. The Onboarding process was easy and delightful. " }],
    };
  }

  componentDidMount() {
    this.setState({ isChecked: true });
    AOS.init({
      duration: 2000
    })

  }

  render() {
    return (
      <div>
        <AppMenu />
        <div
          className="BuySell"
          style={{
            background: `url("./icon/landingPageBG.svg")`,
          }}
        >
          <div
            className="BuySellCar"
            style={{
              background: `url("./icon/landingPageCar.svg")`,
            }}
          >
            <div className="BuySellDiv" data-aos='fade-up'>
              <span className="LandingPageHeader">
                Buy or sell your car with confidence
                </span>
              <span className="LandingPageSubHeader">
                Invest in high quality, low mileage vehiles with Java Self
                Drive
                </span>
              <button
                className="SignUpFormsSubmit"
                style={{
                  width: "264px",
                  height: "50px",
                  fontSize: "16px",
                }}
              >
                View details
                </button>
            </div>
          </div>
        </div>
        <div className="HowItWorks LandingPagePadding" data-aos='fade'>
          <span className="LandingPageHeader">How it works </span>
          <Grid container spacing={3} style={{ marginTop: "60px", marginBottom: "60px" }}>
            {this.state.howItWorks.map((work, index) => (
              <Grid item xs={6} sm={6} md={6} lg={3}>
                <div key={index}>
                  <div style={{ display: "flex" }}>
                    <div className="BenefitsImg">
                      <img
                        src={work.src}
                        alt={work.title}
                      />
                    </div>
                    <Hidden mdDown >
                      <img
                        src={index === 3 ? null : index % 2 == 0 ? "/icon/Line Indicator.svg" : "/icon/Line IndicatorB.svg"}
                      />
                    </Hidden>
                  </div>

                  <div style={{ marginTop: "16px" }}>
                    <span className="LandingPageDescription" style={{ fontSize: "18px", fontWeight: "800" }}>{work.title}</span>
                    <br />
                    <span className="LandingPageDescription" style={{ fontSize: "16px" }}>{work.text}</span>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="PopularModels LandingPagePadding" data-aos='fade-up'>
          <div style={{ margin: "0 auto", textAlign: "center" }}>
            <span className="LandingPageHeader">Popular models </span>
            <span className="LandingPageDescription">
              Choose from our list of popular models
            </span>
            <div className="ModelContainer">
              <Grid container spacing={4}>
                {this.state.popularModels.map((model, index) => (
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <div className="PopularModel" key={index}>
                      <div>
                        <img
                          src={model.src}
                          alt={model.model}
                        />
                        <br />
                        <span className="LandingPageDescription" style={{ color: "#000000" }}>{model.model}</span>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
            <button className="RedirectButton" style={{ color: "#002ad1", fontSize: "16px", float: "left" }}>View from all models</button>
            <br />
            <div className="ModelContainerB">
              {this.state.models.map((model, index) => (
                <div className="OtherModels" key={index}>
                  <span className="BlackText" style={{ fontSize: "16px" }}>{model}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="Benefits LandingPagePadding" data-aos='fade'>
          <div style={{ width: "40%", marginBottom: "40px" }}>
            <span className="LandingPageHeader">
              Benefits of working with us
            </span>
          </div>
          <Grid container spacing={4}>
            {this.state.benefits.map((benefit, index) => (
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <div className="DisplayFlex1" key={index}>
                  <div className="BenefitsImg">
                    <img
                      src={benefit.src}
                      alt=""
                    />
                  </div>
                  <div>
                    <span className="LandingPageDescription" style={{ fontSize: "24px" }}>{benefit.title}</span>
                    <br />
                    <span className="LandingPageDescription" style={{ fontSize: "16px" }}>{benefit.text}</span>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="Boss">
          <div className="BossHeader">
            <span className="LandingPageHeader" style={{ color: "#ffffff" }}>
              Be your own Boss
            </span>
            <button
              className="BackButton"
              style={{
                color: "#2EC5CE",
                fontSize: "20px",
              }}
            >
              Sign up for a free account
              <img
                src="/icon/arrowLink.svg"
                alt="->"
                style={{ marginLeft: "10px" }}
              />
            </button>
          </div>
          <div
            className="SampleDash"
            style={{
              background: `url("./icon/sampleDash.svg")`,
            }}
            data-aos='fade-up'
          ></div>
        </div>
        <div
          className="Stories"
          style={{
            background: `url("./icon/quotes.svg")`,
          }}
        >
          <div className="LandingPagePadding StoriesContainer">
            <div style={{ width: "45%" }}>
              <span className="LandingPageHeader">
                Real Stories from Real Customers
              </span>
            </div>
            <Grid container >
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <span className="LandingPageDescription">
                  Get inspired by these stories.</span>
                <div className="StoryA" data-aos='zoom-in-left'>
                  <div style={{ display: "flex" }}>
                    <div className="StoryImage" style={{ background: `url(${this.state.testimonials[0].src})` }}></div>
                    <div>
                      <span className="LandingPageDescription">{this.state.testimonials[0].name}</span>
                      <br />
                      <span className="LandingPageWhiteText" style={{ color: "#969bab" }}>{this.state.testimonials[0].location}</span>
                    </div>
                  </div>
                  <div className="DisplayFlex1" style={{ marginTop: "32px" }}>
                    <div className="StoryQuotes"><img src="/icon/quotes1.svg" /></div>
                    <div>
                      <span className="LandingPageBlackText">{this.state.testimonials[0].testimony}</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="StoryB" data-aos='zoom-in-up'>
                    <div style={{ display: "flex" }}>
                      <div className="StoryImage" style={{ background: `url(${this.state.testimonials[1].src})` }}></div>
                      <div>
                        <span className="LandingPageDescription">{this.state.testimonials[1].name}</span>
                        <br />
                        <span className="LandingPageWhiteText" style={{ color: "#969bab" }}>{this.state.testimonials[1].location}</span>
                      </div>
                    </div>
                    <div className="DisplayFlex1" style={{ marginTop: "32px" }}>
                      <div className="StoryQuotes"><img src="/icon/quotes1.svg" /></div>
                      <div>
                        <span className="LandingPageBlackText">{this.state.testimonials[1].testimony}</span>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="StoryC" data-aos='zoom-in-right'>
                    <div style={{ display: "flex" }}>
                      <div className="StoryImage" style={{ background: `url(${this.state.testimonials[2].src})` }}></div>
                      <div>
                        <span className="LandingPageDescription">{this.state.testimonials[2].name}</span>
                        <br />
                        <span className="LandingPageWhiteText" style={{ color: "#969bab" }}>{this.state.testimonials[2].location}</span>
                      </div>
                    </div>
                    <div className="DisplayFlex1" style={{ marginTop: "32px" }}>
                      <div className="StoryQuotes"><img src="/icon/quotes1.svg" /></div>
                      <div>
                        <span className="LandingPageBlackText">{this.state.testimonials[2].testimony}</span>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>

        </div>
        <LandingPageFooter />
      </div>
    );
  }
}

export default LandingPage;
