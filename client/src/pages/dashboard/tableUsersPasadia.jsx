import React, { useState, useEffect } from 'react';
import AxiosInstance from "../../api/axios.js";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function BasicTable() { 
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-obtener-compras');
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);
  
  const chartData = data.map((row) => ({
    name: row.nombre,
    y: row.valorTotal,
  }));

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 500, 
    },
    title: {
      text: 'Total Value by Client',
    },
    xAxis: {
      categories: data.map(row => row.nombre),
    },
    yAxis: {
      title: {
        text: 'Total Value',
      },
    },
    series: [{
      name: 'Client',
      data: chartData,
      colorByPoint: true,
    }],
};

  return (
    <div >
      <HighchartsReact highcharts={Highcharts} options={chartOptions}  />
    </div>
  );
}
