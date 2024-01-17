import Highcharts from 'highcharts';
import React, { useEffect, useState } from 'react';
import AxiosInstance from "../../api/axios.js"

const MyComponent = () => {
  const [totalVentaPasadia, setTotalVentaPasadia] = useState(0);
  const [totalVentaCabania, setTotalVentaCabania] = useState(0);
  const [totalVentaHabitaciones, setTotalVentaHabitaciones] = useState(0);
  const [bar, setBar] = useState(0);
  const [restaurante, setRestaurante] = useState(0);
  const [recepcion, setRecepcion] = useState(0);
  const [descorche, setDescorche] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/total-generado-pasadia');
        console.log(response);

        const { totalPago, totalPagoPendiente } = response.data;
        setTotalVentaPasadia(totalPago + totalPagoPendiente);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/cabania-total-generado');
        console.log(response);

        const { totalPago, totalPagoPendiente } = response.data;
        setTotalVentaCabania(totalPago + totalPagoPendiente);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/habitaciones-total-generado');
        console.log(response);

        const { totalPago, totalPagoPendiente } = response.data;
        setTotalVentaHabitaciones(totalPago + totalPagoPendiente);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/total-generado-ventas-brad`)
        const { bar, restaurante, recepcion, descorche } = response.data
        setBar(bar)
        setRestaurante(restaurante)
        setRecepcion(recepcion)
        setDescorche(descorche)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])



  useEffect(() => {
    Highcharts.chart('myChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Ventas de Pasadía por Subcategoría'
      },
      xAxis: {
        categories: ['Pasadía']
      },
      yAxis: {
        min: 0,
        startOnTick: false,
        title: {
          text: 'Total Generado ($)',
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
            }
          }
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          minPointLength: 5,
          events: {
            legendItemClick: function () {
              if (this.name === 'Total Pasadía') {
                var series = this.chart.series;
                series.forEach(function (s) {
                  if (s.name !== 'Total Pasadía') {
                    s.setVisible(!s.visible, false);
                  }
                });
                this.chart.redraw();
                return false;
              }
            }
          }
        }
      },
      series: [
        {
          name: 'Total Pasadía',
          data: [{ y: totalVentaPasadia }],

        },
        {
          name: 'Bar',
          data: [{ y: bar, }],
          showInLegend: false
        },
        {
          name: 'Restaurante',
          data: [{ y: restaurante }],
          showInLegend: false
        },
        {
          name: 'Recepcion',
          data: [{ y: recepcion }],
          showInLegend: false
        },
        {
          name: 'Descorche',
          data: [{ y: descorche }],
          showInLegend: false
        }
      ]
    });
  }, [totalVentaPasadia, bar, restaurante, recepcion, descorche]);









  return (
    <div id="myChart" className='h-full'></div>
  );
};

export default MyComponent;
