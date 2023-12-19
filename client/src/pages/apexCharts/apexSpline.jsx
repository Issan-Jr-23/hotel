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
            type: 'area'
          },
          colors: ['#7828FC'], // Color de la línea en rojo
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
                  color: "#9454FF",
                  opacity: 1
                },
                {
                  offset: 100,
                  color: "#B385FF",
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
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
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
              height="400"
              type="area"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexSpline;