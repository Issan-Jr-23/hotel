import React, { Component } from "react";
import Chart from "react-apexcharts";
import AxiosInstance from '../../api/axios.js';

class ApexSpline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'series1',
        data: [] 
      }],
      options: {
        chart: {
          type: 'area'
        },
        colors: ['#7828FC'], 
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
          categories: []
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await AxiosInstance.get('/pasadia-fecha-activacion');
      const fechas = response.data.map(item => item.activacion);
      const cantidades = response.data.map(item => item.cantidad);
      
      this.setState({
        series: [{ name: 'Activaciones', data: cantidades }],
        options: { ...this.state.options, xaxis: { ...this.state.options.xaxis, categories: fechas } }
      });
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
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
