import Navbar from '../components/NavMenu.jsx'
import TableClientPasadia from './tablePasadia/TableClientPasadia.jsx'
import { useMenu } from '../context/menuContext.jsx';
import "./global.css"

const Pasadia = () => {
  const { menuAbierto } = useMenu();
  return (
    <div className='movimiento globales pt-20'>
        {/* <Navbar /> */}
      <div className= "w-full">
      
        <TableClientPasadia/> 
      </div>
    </div>
  )
}

export default Pasadia

