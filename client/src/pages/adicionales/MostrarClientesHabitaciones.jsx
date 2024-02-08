import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/axios.js'; // Asegúrate de que esta ruta es correcta
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Pagination, Box } from '@mui/material'

const MiComponente = () => {
  const [opcionesGrafica, setOpcionesGrafica] = useState({});
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await AxiosInstance.get(`/data-habitaciones?page=${pagina}`);
        const { data, page, pageSize, totalCount } = response.data;
        const totalDePaginas = Math.ceil(totalCount / pageSize);
        setTotalPaginas(totalDePaginas);

        configurarGrafica(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, [pagina]);

  const configurarGrafica = (datosCombinados) => {
    const categorias = datosCombinados.map(dato => dato.nombre);

    const series = [{
      name: 'Bebidas',
      data: datosCombinados.map(dato => dato.totalBebidas)
    }, {
      name: 'Restaurante',
      data: datosCombinados.map(dato => dato.totalRestaurante)
    }, {
      name: 'Descorche',
      data: datosCombinados.map(dato => dato.totalDescorche)
    }, {
      name: 'Recepción',
      data: datosCombinados.map(dato => dato.totalRecepcion)
    }, {
      name: 'Pago Total',
      data: datosCombinados.map(dato => dato.totalPago)
    }];

    setOpcionesGrafica({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Desglose de Pagos por Cliente y Usuario'
      },
      xAxis: {
        categories: categorias,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Pagado ($)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valuePrefix: '$',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },
      series: series
    });
  };




  const handleChange = (event, value) => {
    setPagina(value);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={opcionesGrafica}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <Pagination
          count={totalPaginas}
          page={pagina}
          onChange={handleChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default MiComponente;
