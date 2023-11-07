import Navbar from '../components/Navbars.jsx'
import MuiTable from './tableHotel/TableClientCabania.jsx'

const Cabanias = () => {
  return (
    <div>
        <Navbar/>
      <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white '>CABANIAS</h1>
        <MuiTable/>
    </div>
  )
}

export default Cabanias