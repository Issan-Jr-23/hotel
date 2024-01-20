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
        const datos = respuesta.data;

        let productosCombinados = [...datos.bebidas, ...datos.restaurante];
        productosCombinados.sort((a, b) => b.valorTotal - a.valorTotal);

        setProductos(productosCombinados);
      } catch (error) {
        console.error('Hubo un error al obtener los productos:', error);
      }
    };
    obtenerProductos();
  }, []);

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Productos Más Vendidos'
    },
    series: [{
      name: 'Valor Total',
      colorByPoint: true,
      data: productos.map(p => ({
        name: p.nombre,
        y: p.valorTotal
      }))
    }]
  };

  return (
    <div >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MiComponente;
