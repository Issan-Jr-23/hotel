import Navbar from '../components/Navbars.jsx'
import TableClientPasadia from './tablePasadia/TableClientPasadia.jsx'
import "./global.css"

const Pasadia = () => {
  return (
    <div className='movimiento'>
        <Navbar />
      <div className='w-full'>
      <h1 className='text-4xl tracking-wider font-medium text-white w-full h-12 flex justify-center items-center'>PASADIA</h1>
        <TableClientPasadia/>
      </div>
    </div>
  )
}

export default Pasadia

