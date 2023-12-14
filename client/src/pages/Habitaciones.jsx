import Navbar from '../components/NavMenu.jsx'
import TableHabitaciones from './tableHabitaciones/tableHabitaciones.jsx'

const Cabanias = () => {
  return (
    <div className='movimiento globales'>
        {/* <Navbar/> */}
        <div className='w-full' >
      <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white '>HABITACIONES</h1>
        <TableHabitaciones/>
        </div>
    </div>
  )
}

export default Cabanias