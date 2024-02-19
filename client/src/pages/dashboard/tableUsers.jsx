import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AxiosInstance from '../../api/axios.js'; // Asegúrate de que la ruta es correcta
import Pagination from '@mui/material/Pagination'; // Importa Pagination de Material-UI

const HorizontalBarChart = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    const obtenerProductos = async (page) => {
      try {
        const respuesta = await AxiosInstance.get(`/productos-mas-comprados-pass?page=${page}`);
        const data = respuesta.data;
        setProductos(data.productosInfo);
        setTotalPaginas(data.totalPaginas);
        console.log('Productos más comprados:', data.productosInfo);
      } catch (error) {
        console.error('Hubo un error al obtener los productos:', error);
      }
    };
    obtenerProductos(paginaActual);
  }, [paginaActual]);

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

  // Cambia la página actual
  const handleChangePage = (event, newPage) => {
    setPaginaActual(newPage);
  };

  return (
    <div className='bg-white'>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div className='h-12 flex justify-center'>
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default HorizontalBarChart;
