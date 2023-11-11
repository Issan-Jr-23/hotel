import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  useEffect(() => {
    // Datos de ejemplo
    const data = [
      ['Reservaron', 80],
      ['No reservaron', 20],
    ];

    // Configuración de Highcharts
    const options = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Reservas de personas',
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
        name: 'Estado de reserva',
        data: data,
      }],
    };

    // Crear la gráfica
    Highcharts.chart('chart-container', options);
  }, []);

  return <div id="chart-container"></div>;
};

export default PieChart;