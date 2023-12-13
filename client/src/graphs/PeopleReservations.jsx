import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HC_accessibility from 'highcharts/modules/accessibility';
import './style.css';
import AxiosInstance from '../api/axios.js';
HC_accessibility(Highcharts);

const DoughnutChart = () => {
  const [data, setData] = useState([]);
  const [totalReservas, setTotalReservas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/grahps-reservas');
        const reservasSi = response.data.filter(item => item.reserva === 'Si').map(item => ({
          name: item.tipo,
          y: 1
        }));

        setData(reservasSi);
        setTotalReservas(reservasSi.length);
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const processedData = data.reduce((acc, item) => {
      const existing = acc.find(({name}) => name === item.name);
      if (existing) {
        existing.y += 1;
      } else {
        acc.push({...item});
      }
      return acc;
    }, []);

    const options = {
      chart: { type: 'pie', backgroundColor: "transparent" },
      accessibility: { enabled: false },
      title: { 
        text: 'ESTADO DE RESERVAS', 
        style: { color: '#000000/60' } 
      },
      plotOptions: {
        pie: {
          innerSize: '90%',
          showInLegend: true
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        useHTML: true,
        labelFormatter: function() {
          return '<span style="color:' + this.color + '">\u25CF</span> ' + this.name;
        }
      },
      series: [{ name: 'Cantidad', data: processedData }]
    };

    Highcharts.chart('chart-container', {
      ...options,
      title: {
        ...options.title,
        useHTML: true,
        align: 'center',
        verticalAlign: 'middle',
        y: 50, // Ajuste la posición según sea necesario
        text: `<div style=" text-align: center; color:black;" > Total <br/>  ${totalReservas}</div>`
      }
    });
  }, [data]);

  return (
    <div className='w-12/12 ml-5 mr-5'>
      <div style={{ backgroundColor: "white", borderRadius: "15px", color: "white" }}>
        <div id="chart-container"></div>
      </div>
    </div>
  );
};

export default DoughnutChart;
