import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AxiosInstance from '../../api/axios.js';

const MiComponente = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await AxiosInstance.get('/productos-mas-comprados');
        const data = respuesta.data.productosInfo;
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
        const productosTop10 = productosOrdenados.slice(0, 20);
        setProductos(productosTop10);
        console.log('Productos más comprados:', productosTop10);
      } catch (error) {
        console.error('Hubo un error al obtener los productos:', error);
      }
    };
    obtenerProductos();
  }, []);

  const options = {
    chart: {
      type: 'pie',
      showInLegend: true
    },
    title: {
      text: 'Productos Más Vendidos',
    },
    series: [
      {
        name: 'Valor Total',
        colorByPoint: true,
        data: productos.map((p) => ({
          name: p.nombre,
          y: p.total,
        })),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MiComponente;
