import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/axios.js';
import { Chart } from 'react-chartjs-2';
import { format, subMonths, subYears, eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, startOfYear, endOfYear } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        type: 'line',
        label: 'Activos',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4
      },
      {
        type: 'bar',
        label: 'Finalizados',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ],
  });
  const [error, setError] = useState('');
  const [fechaInicio, setFechaInicio] = useState(format(subYears(new Date(), 1), 'yyyy-MM-dd'));
  const [fechaFin, setFechaFin] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [filtroTipo, setFiltroTipo] = useState('mes'); // Opciones: 'dia', 'mes', 'año'

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responseActivacion = await AxiosInstance.get(`/pasadia-fecha-activacion?inicio=${fechaInicio}&fin=${fechaFin}`);
        const responseFinalizacion = await AxiosInstance.get(`/pasadia-fecha-finalizacion?inicio=${fechaInicio}&fin=${fechaFin}`);

        let intervalo;
        let formatoFecha;
        switch(filtroTipo) {
          case 'dia':
            intervalo = eachDayOfInterval({ start: new Date(fechaInicio), end: new Date(fechaFin) });
            formatoFecha = 'yyyy-MM-dd';
            break;
          case 'mes':
            intervalo = eachMonthOfInterval({ start: new Date(fechaInicio), end: new Date(fechaFin) });
            formatoFecha = 'MMM yyyy';
            break;
          case 'año':
            intervalo = eachYearOfInterval({ start: startOfYear(new Date(fechaInicio)), end: endOfYear(new Date(fechaFin)) });
            formatoFecha = 'yyyy';
            break;
          default:
            // Por defecto, usamos mes
            intervalo = eachMonthOfInterval({ start: new Date(fechaInicio), end: new Date(fechaFin) });
            formatoFecha = 'MMM yyyy';
        }

        let labels = intervalo.map(date => format(date, formatoFecha));
        let datosActivacion = new Array(labels.length).fill(0);
        let datosFinalizacion = new Array(labels.length).fill(0);

        responseActivacion.data.forEach(d => {
          const fechaFormateada = format(new Date(d.activacion), formatoFecha);
          const index = labels.indexOf(fechaFormateada);
          if (index !== -1) {
            datosActivacion[index] += d.cantidad;
          }
        });

        responseFinalizacion.data.forEach(d => {
          const fechaFormateada = format(new Date(d.activacion), formatoFecha);
          const index = labels.indexOf(fechaFormateada);
          if (index !== -1) {
            datosFinalizacion[index] += d.cantidad;
          }
        });

        setChartData({
          labels: labels,
          datasets: [
            { ...chartData.datasets[0], data: datosActivacion },
            { ...chartData.datasets[1], data: datosFinalizacion }
          ]
        });
      } catch (err) {
        setError('Error al cargar los datos: ' + err.message);
        console.error('Error al realizar la petición:', err);
      }
    };

    fetchDatos();
  }, [fechaInicio, fechaFin, filtroTipo]);

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const handleFiltroTipoChange = (e) => {
    setFiltroTipo(e.target.value);
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div>
        <label htmlFor="filtroTipo">Tipo de Filtro:</label>
        <select id="filtroTipo" value={filtroTipo} onChange={handleFiltroTipoChange}>
          <option value="dia">Día</option>
          <option value="mes">Mes</option>
          <option value="año">Año</option>
        </select>

        <label htmlFor="fechaInicio">Fecha Inicio:</label>
        <input type="date" id="fechaInicio" value={fechaInicio} onChange={handleFechaInicioChange} />

        <label htmlFor="fechaFin">Fecha Fin:</label>
        <input type="date" id="fechaFin" value={fechaFin} onChange={handleFechaFinChange} />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <Chart type='bar' data={chartData} options={options} />
      )}
    </div>
  );
};

export default App;
