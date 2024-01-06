import Highcharts from 'highcharts';
import React, { useEffect, useState } from 'react';
import AxiosInstance from "../../api/axios.js"

const MyComponent = () => {
  const [totalVentaPasadia, setTotalVentaPasadia] = useState(0);
  const [totalVentaCabania, setTotalVentaCabania] = useState(0);
  const [totalVentaHabitaciones, setTotalVentaHabitaciones] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/total-generado-pasadia');
        console.log(response);

        const { totalPago, totalPagoPendiente } = response.data;
        console.log("Total generados: ", totalPago);
        console.log("Total generado: ", totalPagoPendiente);
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
        console.log("Total generados: ", totalPago);
        console.log("Total generado: ", totalPagoPendiente);
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
        console.log("Total generados: ", totalPago);
        console.log("Total generado: ", totalPagoPendiente);
        setTotalVentaHabitaciones(totalPago + totalPagoPendiente);

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Highcharts.chart('myChart', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Pasadía', 'Cabaña', 'Habitaciones']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Generado ($)'
        }
      },
      series: [{
        name: 'Categorías',
        data: [
            { y: totalVentaPasadia, color: '#ADD8E6' }, // Rojo
            { y: totalVentaCabania, color: '#00FF00' }, // Verde
            { y: totalVentaHabitaciones, color: '#FFFF00' }  // Azul
          ]
      }]
    });
  }, [totalVentaPasadia, totalVentaCabania, totalVentaHabitaciones]); // Dependencias para re-renderizar el gráfico cuando los datos cambien

  return (
    <div id="myChart" className='h-full'></div>
  );
};

export default MyComponent;
