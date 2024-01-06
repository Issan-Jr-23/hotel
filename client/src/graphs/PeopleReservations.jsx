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
        // Obtener reservas de "sí"
        const responseSi = await AxiosInstance.get('/obtener-historial-reservas-si');
        let totalReservasSi = responseSi.data.historialReservasSi ? responseSi.data.historialReservasSi.reduce((total, usuario) => total + usuario.reservasSi.length, 0) : 0;
        totalReservasSi += responseSi.data.reservasSiClientes ? responseSi.data.reservasSiClientes.length : 0;
  
        // Obtener reservas de "no"
        const responseNo = await AxiosInstance.get('/obtener-historial-reservas-no');
        console.log("***************** respuesta de la api", responseNo)
        let totalReservasNo = responseNo.data.historialReservasSi ? responseNo.data.historialReservasSi.reduce((total, usuario) => total + usuario.reservasSi.length, 0) : 0;
        totalReservasNo += responseNo.data.reservasSiClientes ? responseNo.data.reservasSiClientes.length : 0;
  
        // Configurar datos para el gráfico
        const dataForChart = [
          { name: "Reserva Si", y: totalReservasSi },
          { name: "Reserva No", y: totalReservasNo }
        ];
  
        setData(dataForChart);
        setTotalReservas(totalReservasSi + totalReservasNo);
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
          innerSize: '70%',
          showInLegend: true
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
