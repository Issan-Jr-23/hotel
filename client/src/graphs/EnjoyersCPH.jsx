import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ColumnChart = () => {
  useEffect(() => {
    // Datos de ejemplo
    const data = [
      ['Cabañas', 150],
      ['Pasadías', 100],
      ['Habitaciones', 200],
    ];

    // Configuración de Highcharts
    const options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Personas que llegan a disfrutar de cabañas, pasadías y habitaciones',
      },
      xAxis: {
        categories: ['Tipo de alojamiento'],
      },
      yAxis: {
        title: {
          text: 'Cantidad de personas',
        },
      },
      series: [{
        name: 'Cantidad',
        data: data,
      }],
    };

    // Crear la gráfica
    Highcharts.chart('chart-container', options);
  }, []);

  return <div id="chart-container"></div>;
};

export default ColumnChart;