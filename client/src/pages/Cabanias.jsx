import Navbar from '../components/NavMenu.jsx'
import MuiTable from './tableHotel/TableClientCabania.jsx'
import "./global.css"
import { useMenu } from '../context/menuContext.jsx';

const Cabanias = () => {
  const { menuAbierto } = useMenu();
  return (
    <div className='movimiento globales'>
        {/* <Navbar/> */}
        <div className= { `w-full ${menuAbierto} ? 'globalesp1' : ''`} >
      <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white '>CABAÑAS</h1>
        <MuiTable/>

        </div>
    </div>
  )
}

export default Cabanias