import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/axios.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChartComponent = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 2,
        tension: 0.4, 
      },
    ],
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await AxiosInstance.get('/pasadia-fecha-compra');
        const datosFormateados = formatearDatosParaGrafica(response.data);
        setData(datosFormateados);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    obtenerDatos();
  }, []);

  const formatearDatosParaGrafica = (datos) => {
    datos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    const datosRecientes = datos.slice(-7);

    const fechas = datosRecientes.map(item => item.fecha);
    const cantidades = datosRecientes.map(item => item.cantidad);
    return {
      labels: fechas,
      datasets: [
        {
          ...data.datasets[0],
          data: cantidades,
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        display: false // Desactivar la leyenda
      }
    },
    scales: {
      x: {
        grid: {
          display: false 
        },
        ticks: {
          display: false 
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          display: false 
        },
        ticks: {
          display: false
        },
        border: {
          display: false
        }
      }
      
    }
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
