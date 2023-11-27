import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HC_accessibility from 'highcharts/modules/accessibility';
import {
  Input
} from "@nextui-org/react";
import AxiosInstance from '../api/axios.js';
HC_accessibility(Highcharts);

const DoughnutChart = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todo');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/grahps-reservas?tipo=${selectedCategory}&fechaInicio=${startDate}&fechaFin=${endDate}`);
        const transformedData = response.data.flatMap(item => ([
          { name: `${item.tipo} - Si`, y: item.reserva === 'Si' ? 1 : 0 },
          { name: `${item.tipo} - No`, y: item.reserva === 'No' ? 1 : 0 }
        ]));
        setData(transformedData);
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
      }
    };

    fetchData();
  },  [selectedCategory, startDate, endDate]);

  useEffect(() => {
    const processedData = data.reduce((acc, item) => {
      const existing = acc.find(({name}) => name === item.name);
      if (existing) {
        existing.y += item.y;
      } else {
        acc.push({...item});
      }
      return acc;
    }, []);

    
    const options = {
      chart: { type: 'pie', backgroundColor: "transparent", },
      accessibility: { enabled: false },
      title: { text: 'Estado de Reservas', style: {
        color: '#fff'
      } },
      plotOptions: {
        pie: {
          innerSize: '50%',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.percentage:.1f} %',
            style: {
              color: 'white' // This will change the font color of the labels
            }
          },
        },
      },
      series: [{ name: 'Cantidad', data: processedData }]
    };

    Highcharts.chart('chart-container', options);
  }, [data]);

 return(
  <div className=''>
    <div className='flex justify-between items-center mb-3'>

  <section className=' w-6/12 flex items-center justify-evenly'>

  <Input 
  className='w-12/12'
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
      />
      <Input 
      className='w-12/12'
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
      />
  </section>
  <select className='outline-none h-10 w-28 rounded-xl' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
    <option value="todo">Todo</option>
    <option value="pasadia">Pasadía</option>
    <option value="cabañas">Cabañas</option>
    <option value="habitaciones">Habitaciones</option>
  </select>
    </div>
    <div style={{ backdropFilter: "blur(10px) saturate(90%) brightness(130%)", border:"1px solid #272c3d", borderRadius: "15px", color:"white" }}>
  <div id="chart-container"
  ></div>

    </div>
</div>
 );
};

export default DoughnutChart;
