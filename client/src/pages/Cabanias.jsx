import Navbar from '../components/NavMenu.jsx'
import MuiTable from './tableHotel/TableClientCabania.jsx'
import "./global.css"
import { useMenu } from '../context/menuContext.jsx';

const Cabanias = () => {
  const { menuAbierto } = useMenu();
  return (
    <div className='movimiento globales pt-20'>
        {/* <Navbar/> */}
        <div className="w-full ">
      <h1 className='w-full h-16 flex justify-center items-center text-4xl mb-10'>CABAÑAS</h1>
        <MuiTable/>

        </div>
    </div>
  )
}

export default Cabanias