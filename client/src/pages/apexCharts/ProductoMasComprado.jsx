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
        // Ordenar los productos por total en orden descendente
        const productosOrdenados = data.sort((a, b) => b.total - a.total);
        // Tomar los primeros 10 productos o menos si no hay 10 productos
        const productosTop10 = productosOrdenados.slice(0, 10);
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
