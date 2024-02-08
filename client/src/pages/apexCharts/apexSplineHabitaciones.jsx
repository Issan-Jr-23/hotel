import React, { useState, useEffect } from 'react';
import AxiosInstances from '../../api/axios.js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PssCat = () => {
  const [data, setData] = useState([]);
  const [bar, setBar] = useState(0);
  const [restaurante, setRestaurante] = useState(0);
  const [recepcion, setRecepcion] = useState(0);
  const [descorche, setDescorche] = useState(0);
  const [adicional , setAdicional] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await AxiosInstances(`/habitaciones-productos-categoria`);
      const { bar, restaurante, recepcion, descorche , adicional} = response.data;
      setBar(bar);
      setRestaurante(restaurante);
      setRecepcion(recepcion);
      setDescorche(descorche);
      setAdicional(adicional)
    };
    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Distribución de productos por categoría',
    },
    series: [
      {
        name: 'Categorías',
        colorByPoint: true,
        data: [
          { name: 'Bar', y: bar },
          { name: 'Restaurante', y: restaurante },
          { name: 'Recepción', y: recepcion },
          { name: 'Descorche', y: descorche },
          { name: 'Adicional', y: adicional },
        ],
      },
    ],
  };

  return (
    <div >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PssCat;
