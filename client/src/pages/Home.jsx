// import { Navbar } from "../components/Navbar"
// import Table from './table/TablePrueba.jsx'
import hotel from '../images/hotel.jpeg'
import './global.css'
import Navbars from '../components/Navbars.jsx'
import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'
export const Home = () => {
  return (
    <div className='flex flex-col'>
        <Navbars/>
        <section className='flex flex-wrap  justify-around'>
          <article className=' article_cont_images text-center'>
            <img className=' img_home_h' src={hotel} alt="imagen" />
            <Button className='bg-blue-200 text-blue-600 w-40 text-lg mt-6 rounded-3xl'>
            <Link to="/hotel-graphs">
            coming soon
            </Link>
            </Button>
          </article>
          <article className=' article_cont_images text-center'>
            <img className=' img_home_h' src={hotel} alt="imagen" />
            <Button className='bg-blue-200 text-blue-600 w-40 text-lg mt-6 rounded-3xl'>
            coming soon
      </Button> 
          </article>
          <article className=' article_cont_images text-center'>
            <img className=' img_home_h' src={hotel} alt="imagen" />
            <Button className='bg-blue-200 text-blue-600 w-40 text-lg mt-6 rounded-3xl'>
            coming soon
      </Button>
          </article>
        </section>
        <section className='w-full flex flex-col justify-center items-center mt-20 '>
          <div className=' p-10 w-8/12 rounded-xl bg-white border-blue-500 border-3'>Informe de Avances: Implementación de Sistema Estadístico y Gráfico

<h2 className='text-red-500'>
  
Para el Hotel:
</h2>

<h2 className='text-red-500'>
Estadísticas de Visitas al Hotel:

</h2>

<p>
Desarrollo de un sistema de seguimiento para registrar la afluencia diaria, semanal y mensual de huéspedes.
Implementación de gráficos interactivos que muestren tendencias y patrones de visitas.
Estadísticas de Pasadía y Cabañas:

Creación de dashboards para visualizar la ocupación y rotación de cabañas y áreas de pasadía.
Comparativas de rendimiento entre temporadas altas y bajas.
</p>

<h2 className='text-red-500'>Para la Finca:</h2>

<h2 className='text-red-500'>Gráficos de Producción:</h2>

<p>Monitoreo de la producción agrícola con indicadores de rendimiento por hectárea.
Gráficos de evolución de la producción para identificar picos y caídas estacionales.
</p>

<h2 className='text-red-500'>Monitoreo de Paneles Solares:</h2>

<p>

Implementación de un sistema de seguimiento de la eficiencia y salida de energía de los paneles solares.
Análisis comparativo del rendimiento energético frente a las condiciones meteorológicas.
</p>

<h2 className='text-red-500'>

Próximos Pasos:
</h2>

<p>
Integración de los sistemas de seguimiento con la base de datos central del hotel y la finca.
Pruebas piloto en áreas seleccionadas para validar la precisión de los datos recogidos.
Capacitación del personal para el manejo y análisis de los nuevos sistemas estadísticos.
Meta de Finalización: El proyecto está programado para su completa implementación y lanzamiento al final del segundo trimestre del año, asegurando que todos los componentes estén funcionando sin problemas para el inicio de la temporada alta.

</p>
</div>
        </section>
    </div>
  )
}
