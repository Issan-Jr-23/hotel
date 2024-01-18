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
  const [barC, setBarC] = useState(0);
  const [restauranteC, setRestauranteC] = useState(0);
  const [recepcionC, setRecepcionC] = useState(0);
  const [descorcheC, setDescorcheC] = useState(0);

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
    const fetchData = async() => {
      try {
        const response = await AxiosInstance.get('/total-generado-ventas-cabania-brad')
        const {bar, restaurante, recepcion, descorche} = response.data
        console.log(bar, restaurante, recepcion, descorche)
        setBarC(bar)
        setRestauranteC(restaurante)
        setRecepcionC(recepcion)
        setDescorcheC(descorche)
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
        text: ''
      },
      xAxis: {
        categories: [""] 
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
          // minPointLength: 7,
          
        }
      },
      series: [
        {
          name: 'Total Pasadía',
          data: [{ y: totalVentaPasadia }],
        },
        {
          name: 'Bar pasadía',
          data: [{ y: bar }],
          showInLegend: true
        },
        {
          name: 'Restaurante pasadía',
          data: [{ y: restaurante }],
          showInLegend: true
        },
        {
          name: 'Recepcion pasadía',
          data: [{ y: recepcion }],
          showInLegend: true
        },
        {
          name: 'Descorche pasadía',
          data: [{ y: descorche }],
          showInLegend: true
        },

        {
          name: 'Total Cabaña', 
          data: [{ y: totalVentaCabania }],
          stack: 'Cabaña', 
        },
        {
          name: 'Bar Cabaña', 
          data: [{ y: barC }],
          stack: 'Cabaña', 
          showInLegend: true
        },
        {
          name: 'Restaurante Cabaña', 
          data: [{ y: restauranteC }],
          stack: 'Cabaña', 
          showInLegend: true
        },
        {
          name: 'Recepción Cabaña',
          data: [{y: recepcionC}],
          stack: 'Cabaña',
          showInLegend: true

        },
        {
          name: 'Descorche Cabaña',
          data: [{y: descorcheC}],
          stack: 'Cabaña',
          showInLegend: true
        },
        {
          name: 'Total Habitaciones',
          data: [{y: totalVentaHabitaciones}],
          stack: 'Habitaciones'
        },
        {
          name: 'Bar habitaciones',
          data: [{y: bar}],
          stack: 'Habitaciones',
          showInLegend: true
        },
        {
          name: 'Restaurante Habitaciones',
          data: [{y:restaurante}],
          stack: 'Habitaciones',
          showInLegend: true
        },
        {
          name: 'Recepcion Habitaciones',
          data: [{y: recepcion}],
          stack: 'Habitaciones',
          showInLegend: true
        },
        {
          name: 'Descorche Habitaciones',
          data: [{y: descorche}],
          stack:'Habitaciones',
          showInLegend: true
        }

      ]
    });
  }, [totalVentaPasadia, bar, restaurante, recepcion, descorche, totalVentaCabania, barC, restauranteC, recepcionC, descorcheC]); 



  return (
    <div id="myChart" className='h-full'></div>
  );
};

export default MyComponent;
