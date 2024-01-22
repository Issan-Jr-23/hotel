import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HC_accessibility from 'highcharts/modules/accessibility';
import './style.css';
import AxiosInstance from '../api/axios.js';
HC_accessibility(Highcharts);

const DoughnutChart = () => {

  const [reservaPositiva, setReservaPositiva] = useState(0)
  const [reservaNegativa, setReservaNegativa] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/obtener-cantidad-total-reservas`);
        const { si, no } = response.data;
        setReservaPositiva(si)
        setReservaNegativa(no)

      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalReservas = reservaPositiva + reservaNegativa;
    const options = {
      chart: { type: 'pie', backgroundColor: 'transparent' },
      accessibility: { enabled: false },
      title: {
        text: 'ESTADO DE RESERVAS',
        style: { color: '#000000/60' },
      },
      plotOptions: {
        pie: {
          innerSize: '70%',
          showInLegend: true,
        },
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        useHTML: true,
      },
      series: [
        {
          name: 'Reservas',
          data: [
            { name: 'Reserva positiva', y: reservaPositiva },
            { name: 'Reserva Negativa', y: reservaNegativa },
          ],
        },
      ],
    };
    Highcharts.chart('chart-container', {
      ...options,
      title: {
        ...options.title,
        useHTML: true,
        align: 'center',
        verticalAlign: 'middle',
        y: 50,
        text: `<div style=" text-align: center; color:black;" > Total ${totalReservas} <br/> </div>`,
      },
    });
  }, [reservaPositiva, reservaNegativa]);

  return (
    <div className='w-12/12 ml-5 mr-5'>
      <div style={{ backgroundColor: "white", borderRadius: "15px", color: "white" }}>
        <div id="chart-container"></div>
      </div>
    </div>
  );
};

export default DoughnutChart;
