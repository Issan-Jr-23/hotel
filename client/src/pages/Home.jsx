// import { Navbar } from "../components/Navbar"
// import Table from './table/TablePrueba.jsx'
import pasadia from '../images/cocktail.png'
import habitacion from '../images/hotel.png'
import cabania from '../images/beach-cabana.png'
import change from '../images/change.png'
import inventory from '../images/inventory.png'
import technical from '../images/technical.png'
import './global.css'
import Navbars from '../components/Navbars.jsx'
import { Link } from 'react-router-dom'
export const Home = () => {
  return (
    <div className='flex flex-col'>
        <Navbars/>
        <div className='flex justify-center flex-col items-center'>
        <h1 className='text-6xl text-white uppercase mt-10'>Meqo soft</h1>
        <p className='text-white uppercase'>Software admnistrativo</p>

        </div>

        <section className='flex flex-wrap  justify-around'>
          <Link to="/pasadia">
          <article className='rounded-xl article_cont_images text-center '>
            <img className=' img_home_h' src={pasadia} alt="imagen"/>
            <h2 className='text-3xl'>Pasadia</h2>
          </article>
          </Link>
          <Link to="/cabanias">
          <article className='rounded-xl article_cont_images text-center '>
            <img className=' img_home_h' src={habitacion} alt="imagen" />
            <h2 className='text-3xl'>Habitaciones</h2>
          </article>
          </Link>
          <Link to="/habitaciones">
          <article className='rounded-xl article_cont_images text-center '>
            <img className=' img_home_h' src={cabania} alt="imagen" />
            <h2 className='text-3xl'>Cabañas</h2>
          </article>
          </Link>
        </section>
        <section className='flex flex-wrap  justify-around'>
          <Link to="/inventario">
          <article className='rounded-xl article_cont_images text-center '>
            <img className=' img_home_h' src={inventory} alt="imagen"/>
            <h2 className='text-3xl'>Inventario</h2>
          </article>
          </Link>
          <Link to="/message">
          <article className='rounded-xl article_cont_images text-center '>
            <img className=' img_home_h' src={change} alt="imagen"/>
            <h2 className='text-3xl'>Captura de acciones</h2>
          </article>
          </Link>
          <Link to="#">
          <article className='rounded-xl article_cont_images text-center '>
            <img className=' img_home_h' src={technical} alt="imagen"/>
            <h2 className='text-3xl'>Soporte</h2>
          </article>
          </Link>
        </section>
    </div>
  )
}
