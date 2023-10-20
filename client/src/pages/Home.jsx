// import { Navbar } from "../components/Navbar"
// import Table from './table/TablePrueba.jsx'
import hotel from '../images/hotel.jpeg'
import './global.css'
import Navbars from '../components/Navbars.jsx'
import { Button } from '@nextui-org/react'
export const Home = () => {
  return (
    <div className='flex flex-col'>
        <Navbars/>
        <section className='flex flex-wrap border-1 justify-around'>
          <article className=' border-1 article_cont_images text-center'>
            <img className=' img_home_h' src={hotel} alt="imagen" />
            <Button className='bg-blue-200 text-blue-600 w-40 text-lg mt-6 rounded-3xl'>
            Hotel
            </Button>
          </article>
          <article className=' border-1 article_cont_images text-center'>
            <img className=' img_home_h' src={hotel} alt="imagen" />
            <Button className='bg-blue-200 text-blue-600 w-40 text-lg mt-6 rounded-3xl'>
        Finca
      </Button> 
          </article>
          <article className=' border-1 article_cont_images text-center'>
            <img className=' img_home_h' src={hotel} alt="imagen" />
            <Button className='bg-blue-200 text-blue-600 w-40 text-lg mt-6 rounded-3xl'>
        Energia
      </Button>
          </article>
        </section>
    </div>
  )
}
