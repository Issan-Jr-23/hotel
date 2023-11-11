import React from 'react';
import LineChart from './ChartsHotel.jsx';
import DoughnutChart from './DoughnutAndPie.jsx';
import Navbars from '../components/Navbars.jsx';

const App = () => {
  const data = [
    { category: 'Enero', value: 200 },
    { category: 'Febrero', value: 180 },
    { category: 'Marzo', value: 220 },
    // ... más datos para cada mes
  ];

  console.log(data)

  console.log("hola")

  return (
    <div className='bg-slate-900 min-h-screen'>
        <Navbars/>
      <h1>Ventas Mensuales</h1>
      <div className='w-12/12 flex justify-evenly'>
        <article className='w-5/12'>
      <DoughnutChart/>

        </article>
        <article className='w-6-12'>
      <LineChart data={data} />

        </article>

      </div>
      <div></div>
    </div>
  );
};

export default App;
