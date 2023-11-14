import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductosMasVendidos = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  // Datos de ejemplo para los productos más vendidos con fechas
  const data = [
    { fecha: new Date('2023-01-01'), producto: 'Producto A', ventas: 100 },
    // ... más datos aquí
  ];

  // Filtro de datos basado en el rango de fechas seleccionado
  const filtrarDatosPorFecha = () => {
    const filtered = data.filter(d => 
      d.fecha >= startDate && d.fecha <= endDate
    );
    setFilteredData(filtered);
  };

  // Configuración de la gráfica
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Productos más vendidos'
    },
    xAxis: {
      categories: filteredData.map(item => item.producto)
    },
    yAxis: {
      title: {
        text: 'Ventas'
      }
    },
    series: [
      {
        name: 'Ventas',
        data: filteredData.map(item => item.ventas)
      }
    ]
  };

  return (
    <div>
      <div>
        <label>
          Fecha de inicio:
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </label>
        <label>
          Fecha de fin:
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </label>
        <button onClick={filtrarDatosPorFecha}>Filtrar</button>
      </div>
      <div id="chart-container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default ProductosMasVendidos;
