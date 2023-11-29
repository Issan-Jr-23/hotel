import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HC_accessibility from 'highcharts/modules/accessibility';
import {
  Input
} from "@nextui-org/react";
import './style.css'
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
              color: 'black' // This will change the font color of the labels
            }
          },
        },
      },
      series: [{ name: 'Cantidad', data: processedData }]
    };

    Highcharts.chart('chart-container', options);
  }, [data]);

 return(
  <div className='w-12/12 ml-5 mr-5'>
    <div className='flex justify-between items-center mb-3'>

  <section className=' w-6/12 flex items-center justify-start'>

  <Input 
  color='primary'
  className='w-12/12 mr-2'
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)}
        classNames={{
          input: [
            "text-black/90 dark:text-black/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
              "h-8"
            ]

        }}

      />
      <Input 
      className='w-12/12 ml-2 mr-5'
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
        classNames={{
          input: [
            "text-black/90 dark:text-black/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
              "h-8"
            ]

        }}
      />
  </section>
  <select className='outline-none h-10 w-28 rounded-xl bg-white/60' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="todo">Todo</option>
    <option value="pasadia">Pasadía</option>
    <option value="cabañas">Cabañas</option>
    <option value="habitaciones">Habitaciones</option>
  </select>
    </div>
    <div style={{ backdropFilter: "blur(15px) saturate(90%) brightness(130%)", borderRadius: "15px", color:"white" }}>
  <div id="chart-container"
  ></div>

    </div>
</div>
 );
};

export default DoughnutChart;
