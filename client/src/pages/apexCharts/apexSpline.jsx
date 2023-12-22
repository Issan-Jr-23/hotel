import React, { useState, useEffect } from 'react';
import AxiosInstances from '../../api/axios.js';
import { Chart } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
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

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Solicitar datos de ambas rutas
        const responseActivacion = await AxiosInstances.get("/pasadia-fecha-activacion");
        const responseFinalizacion = await AxiosInstances.get("/pasadia-fecha-finalizacion");

        const ultimos7Dias = [...Array(7)].map((_, i) => format(subDays(new Date(), i), 'MMM dd')).reverse();

        const datosActivacion = responseActivacion.data.filter(d => ultimos7Dias.includes(format(new Date(d.activacion), 'MMM dd')));
        const cantidadesActivos = ultimos7Dias.map(fecha => {
          const dato = datosActivacion.find(d => format(new Date(d.activacion), 'MMM dd') === fecha);
          return dato ? dato.cantidad : 0;
        });

        const datosFinalizacion = responseFinalizacion.data.filter(d => ultimos7Dias.includes(format(new Date(d.activacion), 'MMM dd')));
        const cantidadesFinalizados = ultimos7Dias.map(fecha => {
          const dato = datosFinalizacion.find(d => format(new Date(d.activacion), 'MMM dd') === fecha);
          return dato ? dato.cantidad: 0;
        });

        setChartData({
          labels: ultimos7Dias,
          datasets: [
            { ...chartData.datasets[0], data: cantidadesActivos },
            { ...chartData.datasets[1], data: cantidadesFinalizados }
          ]
        });
      } catch (err) {
        setError('Error al cargar los datos: ' + err.message);
        console.error('Error al realizar la petición:', err);
      }
    };

    fetchDatos();
  }, []);

  const options = {
    scales: {
      y: {
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
      {error ? (
        <p>{error}</p>
      ) : (
        <Chart type='bar' data={chartData} options={options} />
      )}
    </div>
  );
};

export default App;
