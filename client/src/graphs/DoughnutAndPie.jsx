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
        const response = await AxiosInstance.get('/obtener-historial-reservas-no');
        console.log("Response data:", response.data); 
  
        let totalReservasSi = 0;
  
        response.data.historialReservasSi.forEach(usuario => {
          totalReservasSi += usuario.reservasSi.length;
        });
  
        totalReservasSi += response.data.reservasSiClientes.length;
  
        const dataForChart = [{ name: "Reserva No", y: totalReservasSi }];
  
        setData(dataForChart);
        setTotalReservas(totalReservasSi);
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // Paleta de colores personalizada
    const colors = ['#33FF57', '#3357FF', '#FF33F6', '#F6FF33'];

    const processedData = data.reduce((acc, item, index) => {
      const existing = acc.find(({name}) => name === item.name);
      if (existing) {
        existing.y += 1;
      } else {
        acc.push({...item, color: colors[index % colors.length]});
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
          showInLegend: true,
          colors: colors, // Aplicar la paleta de colores a la gráfica
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        useHTML: true,
      },
      series: [{ name: 'Cantidad', data: processedData }]
    };

    Highcharts.chart('chart-container-rn', {
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
        <div id="chart-container-rn"></div>
      </div>
    </div>
  );
};

export default DoughnutChart;
