import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DoughnutChart = () => {
  useEffect(() => {
    // Datos de ejemplo
    const data = [
      ['Producto A', 500],
      ['Producto B', 300],
      ['Producto C', 200],
      ['Producto D', 400],
    ];

    // Configuración de Highcharts
    const options = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Productos más vendidos',
      },
      plotOptions: {
        pie: {
          innerSize: '50%',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}',
          },
        },
      },
      series: [{
        name: 'Ventas',
        data: data,
      }],
    };

    // Crear la gráfica
    Highcharts.chart('chart-container', options);
  }, []);

  return <div id="chart-container"></div>;
};

export default DoughnutChart;