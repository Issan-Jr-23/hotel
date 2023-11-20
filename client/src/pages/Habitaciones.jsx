import Navbar from '../components/Navbars.jsx'
import TableHabitaciones from './tableHabitaciones/tableHabitaciones.jsx'

const Cabanias = () => {
  return (
    <div>
        <Navbar/>
      <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white '>HABITACIONES</h1>
        <TableHabitaciones/>
    </div>
  )
}

export default Cabanias