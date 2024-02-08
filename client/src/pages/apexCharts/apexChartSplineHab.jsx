import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/axios.js';
import { Chart } from 'react-chartjs-2';
import { format, subDays, eachDayOfInterval, eachMonthOfInterval } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import { Button } from '@mui/material';

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
        tension: 0.4,
      },
      {
        type: 'bar',
        label: 'Finalizados',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [error, setError] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('dia');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  useEffect(() => {
    const labels = [];
    let fechaInicioFiltro;
    let fechaFinFiltro;

    if (filtroTipo === 'dia') {
      fechaInicioFiltro = fechaInicio;
      fechaFinFiltro = fechaFin;
      labels.push(...eachDayOfInterval({ start: fechaInicioFiltro, end: fechaFinFiltro }).map(date => format(date, 'yyyy-MM-dd')));
    } else if (filtroTipo === 'mes') {
      fechaInicioFiltro = subDays(new Date(), 365);
      fechaFinFiltro = new Date();
      labels.push(...eachMonthOfInterval({ start: fechaInicioFiltro, end: fechaFinFiltro }).map(date => format(date, 'yyyy-MM')));
    }

    const fetchDatos = async () => {
      try {
        const responseFinalizacion = await AxiosInstance.get(
          `/pasadia-fecha-finalizacion?inicio=${format(
            fechaInicioFiltro,
            'yyyy-MM-dd'
          )}&fin=${format(fechaFinFiltro, 'yyyy-MM-dd')}&filtroTipo=${filtroTipo}`
        );

        const responseActivacion = await AxiosInstance.get(
          `/pasadia-fecha-activacion?inicio=${format(
            fechaInicioFiltro,
            'yyyy-MM-dd'
          )}&fin=${format(fechaFinFiltro, 'yyyy-MM-dd')}&filtroTipo=${filtroTipo}`
        );

        const { datosActivacion, datosFinalizacion } = procesarDatos(
          responseFinalizacion.data,
          responseActivacion.data,
          labels
        );

        setChartData((prevState) => ({
          labels: labels,
          datasets: [
            { ...prevState.datasets[0], data: datosActivacion },
            { ...prevState.datasets[1], data: datosFinalizacion },
          ],
        }));
      } catch (err) {
        setError('Error al cargar los datos: ' + err.message);
        console.error('Error al realizar la petición:', err);
      }
    };

    fetchDatos();

    const intervalId = setInterval(() => {
      fetchDatos();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [filtroTipo, fechaInicio, fechaFin]);

  const procesarDatos = (dataFinalizacion, dataActivacion, labels) => {
    const datosFinalizacion = new Array(labels.length).fill(0);
    const datosActivacion = new Array(labels.length).fill(0);

    dataFinalizacion.forEach((d) => {
      const fechaFormateada = filtroTipo === 'mes' ? format(new Date(d.fecha), 'yyyy-MM') : format(new Date(d.fecha), 'yyyy-MM-dd');
      const index = labels.indexOf(fechaFormateada);
      if (index !== -1) {
        if (filtroTipo === 'mes') {
          datosFinalizacion[index] += d.cantidad || 0;
        }
      }
    });
    dataFinalizacion.forEach((d) => {
      const fechaFormateada = filtroTipo === 'mes' ? format(new Date(d.fecha), 'yyyy-MM') : format(new Date(d.fecha), 'yyyy-MM-dd');
      const index = labels.indexOf(fechaFormateada);
      if (index !== -1) {
        if (filtroTipo === 'dia') {
          datosFinalizacion[index] += d.cantidad || 0;
        }
      }
    });

    dataActivacion.forEach((d) => {
      const fechaFormateada = filtroTipo === 'mes' ? format(new Date(d.fecha), 'yyyy-MM') : format(new Date(d.fecha), 'yyyy-MM-dd');
      const index = labels.indexOf(fechaFormateada);
      if (index !== -1) {
        if (filtroTipo === 'mes') {
          datosActivacion[index] += d.cantidad || 0;
        } else {
          datosActivacion[index] = d.cantidad || 0;
        }
      }
    });

    return {
      datosActivacion: datosActivacion,
      datosFinalizacion: datosFinalizacion,
    };
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleFiltroTipoChange = (e) => {
    setFiltroTipo(e.target.value);
  };

  const handleChangeFechaInicio = (date) => {
    if (date <= fechaFin || !fechaFin) {
      setFechaInicio(date);
    } else {
      alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
    }
  };

    const handleChangeFechaFin = (date) => {
    if (date >= fechaInicio || !fechaInicio) {
      setFechaFin(date);
    } else {
      alert('La fecha de fin no puede ser menor que la fecha de inicio.');
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div>
        <label htmlFor="filtroTipo">Tipo de Filtro:</label>
        <select
          className="rounded-xl h-6 outline-none bg-teal-50 mr-2 text-gray-700"
          id="filtroTipo"
          value={filtroTipo}
          onChange={handleFiltroTipoChange}
          style={{ backgroundColor: 'white', border: '2px solid #8cd4d7' }}
        >
          <option value="dia">Día</option>
          <option value="mes">Mes</option>
        </select>

        <DatePicker
          selected={fechaInicio}
          onChange={handleChangeFechaInicio}
          dateFormat="yyyy-MM-dd"
          className="rounded-xl h-6 outline-none w-24 text-center cursor-pointer bg-teal-50 mr-2 text-gray-700"
          style={{
            backgroundColor: 'white',
            border: '2px solid #8cd4d7',
            marginLeft: '10px',
            pointerEvents: 'none',
          }}
          onFocus={(e) => {
            e.target.blur();
          }}
        />

        <DatePicker
          selected={fechaFin}
          onChange={handleChangeFechaFin}
          dateFormat="yyyy-MM-dd"
          className="rounded-xl h-6 outline-none w-24 text-center  cursor-pointer bg-teal-50 mr-2 text-gray-700"
          style={{
            backgroundColor: 'white',
            border: '2px solid #8cd4d7',
            marginLeft: '10px',
            pointerEvents: 'none',
          }}
          onFocus={(e) => {
            e.target.blur();
          }}
        />
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <Chart type="bar" data={chartData} options={options} />
      )}
    </div>
  );
};

export default App;
