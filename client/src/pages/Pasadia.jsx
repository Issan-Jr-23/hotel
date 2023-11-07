import Navbar from '../components/Navbars.jsx'
import TableClientPasadia from './tablePasadia/TableClientPasadia.jsx'
import "./global.css"

const Pasadia = () => {
  return (
    <div className='movimiento'>
        <Navbar />
      <div className='w-full'>
      <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white'>PASADIA</h1>
        <TableClientPasadia/> 
      </div>
    </div>
  )
}

export default Pasadia

