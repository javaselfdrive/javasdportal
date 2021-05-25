import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Graph extends Component {
  render() {
    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      var gradient = ctx.createLinearGradient(0, 0, 0, 180);
      gradient.addColorStop(0, "rgba(0, 42, 209, 0.59)");
      gradient.addColorStop(0.5, "rgba(0, 42, 209, 0.31)");
      gradient.addColorStop(1, "rgba(255,255,255, 0)");
      return {
        labels: this.props.label,
        datasets: [
          {
            label: this.props.tooltipLabel,
            data: this.props.data,
            fill: true,
            backgroundColor: gradient,
            borderColor: "rgba(0, 42, 209)",
            lineTension: 0.4,
            pointBackgroundColor: "#ffffff",
          },
        ],
      };
    };

    const options = {
      animation: true,
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          grace: this.props.data.length > 0 ? "1000" : null,
          beginAtZero: false,
          ticks: {
            autoSkip: false,
            stepSize: this.props.data.length > 0 ? 10000 : 0,
            maxTicksLimit: 5,
            callback: function (value) {
              return (
                "KES " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            },
          },
          grid: {
            color: "rgba(204, 204, 204, 0.07)",
            borderColor: "rgba(204, 204, 204, 0.07)",
          },
        },
        X: {
          grid: {
            color: "rgba(204, 204, 204, 0.07)",
            borderColor: "rgba(204, 204, 204, 0.07)",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          callbacks: {
            labelColor: function (context) {
              return {
                borderColor: "none",
                backgroundColor: "#002AD1",
                borderWidth: 2,
                borderRadius: 2,
              };
            },
            labelTextColor: function (context) {
              return "#ffffff";
            },
          },
          backgroundColor: "rgba(0, 42, 209, 0.8)",
        },
      },
    };
    return <Line data={data} height={this.props.height} options={options} />;
  }
}

export default Graph;
