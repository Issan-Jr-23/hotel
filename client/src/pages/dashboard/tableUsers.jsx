import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AxiosInstance from '../../api/axios.js'; // Asegúrate de que la ruta es correcta

const HorizontalBarChart = () => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-obtener-productosCop');
        processData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const categories = data.map(item => item.nombre);
    const cantidadVendida = data.map(item => item.cantidad);
    const valorTotal = data.map(item => item.total);

    // Define un arreglo de colores para las barras
    const barColors = [ '#33FF57', '#3357FF', /* más colores según sea necesario */];

    setChartOptions({
      chart: {
        type: 'bar',
        spacingBottom: 30 // Ajusta el espacio en la parte inferior
      },
      colors: barColors, // Asigna el arreglo de colores aquí
      title: {
        text: 'Venta de productos'
      },
      xAxis: {
        categories: categories,
        title: {
          text: null
        },
        labels: {
          rotation: 0, // Rota las etiquetas del eje X
          style: {
            fontSize: '10px' // Reduce el tamaño de la fuente si es necesario
          },
          overflow: 'justify'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Cantidad Vendida',
        data: cantidadVendida
      }, {
        name: 'Valor Total',
        data: valorTotal
      }]
    });
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default HorizontalBarChart;
