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
        borderWidth: 3,
        tension: 0.4,
        type: 'line'
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
    // Ordenamos los datos por fecha
    datos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // Obtenemos los últimos 7 días de datos
    const datosRecientes = datos.slice(-7);

    // Extraemos las fechas y las cantidades
    const fechas = datosRecientes.map(item => item.fecha);
    const cantidades = datosRecientes.map(item => item.cantidad);

    // Nos aseguramos de tener datos para los últimos 7 días, incluso si faltan algunos en la respuesta de la API
    const fechasCompletas = completarFechas(fechas);

    return {
      labels: fechasCompletas,
      datasets: [
        {
          ...data.datasets[0],
          data: cantidades,
        },
      ],
    };
  };

  // Función para asegurarse de que hay una entrada para cada uno de los últimos 7 días
  const completarFechas = (fechas) => {
    let fechasCompletas = [];
    let fechaActual = new Date();
    for (let i = 0; i < 7; i++) {
      let fechaFormateada = fechaActual.toISOString().split('T')[0];
      if (!fechas.includes(fechaFormateada)) {
        fechasCompletas.push(fechaFormateada);
      } else {
        fechasCompletas.push(fechas.shift());
      }
      fechaActual.setDate(fechaActual.getDate() - 1);
    }
    return fechasCompletas.reverse();
  };

  const options = {
    // tus opciones...
  };

  return (
    <div className="app h-full">
      <div className="row h-full">
        <div className="mixed-chart clone h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
