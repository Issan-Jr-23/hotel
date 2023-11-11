import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const LineChart = ({ data = [] }) => { // Valor predeterminado para data
  useEffect(() => {
    if (data.length > 0) { // Verificación para asegurarse de que data tiene elementos
      Highcharts.chart('lineChartContainer', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Gráfico Lineal de Ejemplo'
        },
        xAxis: {
          categories: data.map(item => item.category)
        },
        yAxis: {
          title: {
            text: 'Valores'
          }
        },
        series: [{
          name: 'Datos',
          data: data.map(item => item.value)
        }]
      });
    }
  }, [data]);

  return <div id="lineChartContainer" />;
};

export default LineChart;
