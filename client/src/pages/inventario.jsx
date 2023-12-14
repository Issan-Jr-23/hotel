import  Navbar  from "../components/Navbars.jsx"
import InventarioBebidas from './table/TablaInventario.jsx'

const inventario = () => {
  return (
    <div className="">
        {/* <Navbar/> */}
        <h1 className='w-full h-16 flex justify-center items-center text-4xl text-white '>INVENTARIO</h1>
        <InventarioBebidas/>
    </div>
  )
}

export default inventario