import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AxiosInstance from '../../api/axios.js'; // Asegúrate de que la ruta es correcta

const HorizontalBarChart = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await AxiosInstance.get('/productos-mas-comprados-pass');
        const data = respuesta.data.productosInfo;
        console.log("response: ",data)
        const productosCombinados = data.reduce((acc, producto) => {
          if (acc[producto.id]) {
            acc[producto.id].total += producto.total;
          } else {
            acc[producto.id] = { ...producto };
          }
          return acc;
        }, {});
        const productosArray = Object.values(productosCombinados);
        const productosOrdenados = productosArray.sort((a, b) => b.total - a.total);
        const productosTop10 = productosOrdenados.slice(0, 10);
        setProductos(productosTop10);
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
