import React from 'react';
import LineChart from './ChartsHotel.jsx';
import DoughnutChart from './DoughnutAndPie.jsx';
import PeopleReservations from './EnjoyersCPH.jsx';
import Navbars from '../components/Navbars.jsx';
import '../App.css'

const App = () => {
  return (
    <div className='mb-20'>
      <Navbars/>
      <div className='flex justify-center mt-10'>
      <div className='lineChart flex justify-center'>
        <article className='linearContent '>
      <PeopleReservations/>

        </article>

      </div>

      </div>
      <div className='pieContent mt-10'>
        <article className='content-pie'>
      <DoughnutChart/>

        </article>
        <article className='content-line'>
      <LineChart/>
        </article>
      </div>
    </div>
  );
};

export default App;
