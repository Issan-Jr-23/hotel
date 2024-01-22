import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AxiosInstance from '../../api/axios.js'; // Asegúrate de que la ruta es correcta

const HorizontalBarChart = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await AxiosInstance.get('/pasadia-productos-comprados');
        const data = respuesta.data.productosInfo;
        setProductos(data);
        console.log('Productos más comprados:', productosTop10);
      } catch (error) {
        console.error('Hubo un error al obtener los productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Productos comprados',
    },
    xAxis: {
      categories: ["Producto"],
      
    },
    yAxis: {
      title: {
        text: 'Total',
      },
    },
    series: productos.map(producto => ({
      name: producto.nombre,
      data: [producto.total],
    })),
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};


export default HorizontalBarChart;
