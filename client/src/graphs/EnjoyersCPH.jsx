import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { API_URL } from '../config';

const MyChart = () => {
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [loading, setLoading] = useState(false);
  const [vista, setVista] = useState('7dias'); // Estado para la vista seleccionada

  // Función para obtener fechas de los últimos 7 días
  const obtenerFechasUltimos7Dias = () => {
    const fechas = [];
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      fechas.push(fecha.toISOString().split('T')[0]);
    }
    return fechas;
  };

  // Función para obtener los días correspondientes de cada mes del último año
  const obtenerDiasUltimoAño = () => {
    const fechas = [];
    const hoy = new Date();
    for (let i = 0; i < 12; i++) {
      const fecha = new Date(hoy.getFullYear() - (i === 0 ? 0 : 1), hoy.getMonth() - i, hoy.getDate());
      fechas.unshift(fecha.toISOString().split('T')[0]); // Añade al inicio para mantener el orden
    }
    return fechas;
  };

  // Función para contar reservaciones por fecha para los últimos 7 días
  const contarReservacionesPorFecha = (reservaciones, tipo, fechas) => {
    const contadores = Array(fechas.length).fill(0);

    reservaciones.forEach(reservacion => {
      const fechaReservacion = reservacion.fechaPasadia.split('T')[0];
      const index = fechas.indexOf(fechaReservacion);
      if (index > -1) {
        contadores[index]++;
      }
    });

    return {
      name: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      data: contadores
    };
  };

  // Función para contar reservaciones por mes y año para la vista anual
  const contarReservacionesAnuales = (reservaciones, tipo, fechas) => {
    const contadores = Array(fechas.length).fill(0);
    const hoy = new Date().toISOString().split('T')[0]; // Fecha actual en formato 'YYYY-MM-DD'

    reservaciones.forEach(reservacion => {
      const fechaReservacion = reservacion.fechaPasadia.split('T')[0];

      if (fechaReservacion <= hoy) {
        const mesYAnoReservacion = fechaReservacion.substring(0, 7); // 'YYYY-MM'
        const index = fechas.findIndex(fecha => fecha.startsWith(mesYAnoReservacion));
        if (index > -1) {
          contadores[index]++;
        }
      }
    });

    return {
      name: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      data: contadores
    };
  };

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(API_URL+'/cantidad-reservaciones');
      const { pasadias, cabanias, habitaciones } = await response.json();

      let fechas;
      let contarReservaciones;
      if (vista === '7dias') {
        fechas = obtenerFechasUltimos7Dias();
        contarReservaciones = contarReservacionesPorFecha;
      } else {
        fechas = obtenerDiasUltimoAño();
        contarReservaciones = contarReservacionesAnuales;
      }

      const series = [
        contarReservaciones(pasadias, 'Pasadias', fechas),
        contarReservaciones(cabanias, 'Cabañas', fechas),
        contarReservaciones(habitaciones, 'Habitaciones', fechas)
      ];

      setChartData({ categories: fechas, series });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    let intervalId;
    if (vista === '7dias') {
      intervalId = setInterval(fetchData, 3600000); // Actualiza cada hora
    }
    return () => intervalId && clearInterval(intervalId); // Limpieza en el desmontaje
  }, [vista]);

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: vista === '7dias' ? 'Cantidad de Reservaciones en los Últimos 7 Días' : 'Crecimiento Mensual de Reservaciones'
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Cantidad de Reservaciones'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} reservaciones</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: chartData.series
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
      <select value={vista} onChange={(e) => setVista(e.target.value)}>
        <option value="7dias">Últimos 7 días</option>
        <option value="anual">Crecimiento Mensual</option>
      </select>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MyChart;
