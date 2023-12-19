import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApexSpline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      options: {
        chart: {
          type: 'area',
          toolbar: {
            show: false,
          }
        },
        colors: ['#009B00'], // Color de la línea en rojo
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
            colorStops: [
              {
                offset: 0,
                color: "#009600",
                opacity: 1
              },
              {
                offset: 100,
                color: "#00A700",
                opacity: 0.5
              },
            ]
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        grid: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              height="160"
              type="area"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexSpline;
