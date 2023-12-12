// import { Navbar } from "../components/Navbar"
// import Table from './table/TablePrueba.jsx'
import  DoughnutChart from "../graphs/DoughnutAndPie.jsx"
import './global.css'
import Navbars from '../components/Navbars.jsx'
import { Link } from 'react-router-dom'
export const Home = () => {
  return (
    <div className='flex flex-col pb-10 '>
        <Navbars/>
        <div className='flex justify-center flex-col items-center mb-5'>
        <h1 className='text-6xl text-white uppercase mt-10'>Meqo soft</h1>
        <p className='text-white uppercase'>Software admnistrativo</p>

        </div>
        <DoughnutChart/>
    </div>
  )
}
