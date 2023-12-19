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
            show:false,
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
            show: false  // Oculta las etiquetas del eje X
          },
          axisBorder: {
            show: false  // Oculta el borde del eje X
          },
          axisTicks: {
            show: false  // Oculta las marcas del eje X
          }
        },
        yaxis: {
          labels: {
            show: false  // Oculta las etiquetas del eje Y
          },
          axisBorder: {
            show: false  // Oculta el borde del eje Y
          },
          axisTicks: {
            show: false  // Oculta las marcas del eje Y
          }
        },
        grid: {
          show: false  // Oculta la cuadrícula
        },
        tooltip: {
          enabled: false  // Oculta el tooltip
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
              height="157"
              width="216"
              type="area"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexSpline;
