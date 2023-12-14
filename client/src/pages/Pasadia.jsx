import Navbar from '../components/NavMenu.jsx'
import TableClientPasadia from './tablePasadia/TableClientPasadia.jsx'
import { useMenu } from '../context/menuContext.jsx';
import "./global.css"

const Pasadia = () => {
  const { menuAbierto } = useMenu();
  return (
    <div className='movimiento globales'>
        {/* <Navbar /> */}
      <div className= { `w-full ${menuAbierto} ? 'globalesp1' : ''`}>
      <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white'>PASADIA</h1>
        <TableClientPasadia/> 
      </div>
    </div>
  )
}

export default Pasadia

