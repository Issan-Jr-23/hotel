import React from 'react';
import LineChart from './ChartsHotel.jsx';
import DoughnutChart from './DoughnutAndPie.jsx';
import PeopleReservations from './EnjoyersCPH.jsx';
import Navbars from '../components/Navbars.jsx';

const App = () => {

  return (
    <div className='' style={{backgroundColor: "#0f111a"}}>
      <Navbars/>
      <h1>Ventas Mensuales</h1>
      <div className='ml-5 mr-5 w-12/12 flex justify-center border-3 border-white'>
        <article className='w-9/12  border-3 border-white'>
      <PeopleReservations/>

        </article>

      </div>
      <div className='w-12/12 flex justify-evenly mt-10'>
        <article className='w-6/12 mt-1'>
      <DoughnutChart/>

        </article>
        <article className='w-4/12 mt-14'>
      <LineChart/>
        </article>
      </div>
    </div>
  );
};

export default App;
