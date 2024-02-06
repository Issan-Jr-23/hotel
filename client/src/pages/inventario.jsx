// import  Navbar  from "../components/Navbars.jsx"
import InventarioBebidas from './table/TablaInventario.jsx'
import RanchInventario from "../pages/finca/RanchInventario.jsx"

const inventario = () => {
  return (
    <div className="mb-20 pt-20">
        {/* <Navbar/> */}
        {/* <h1 className='w-full h-16 flex justify-center items-center text-4xl '>SUBPRODUCTOS Y PRODUCTOS</h1> */}
        {/* <InventarioBebidas/> */}
        {/* <h2 className='w-full h-20 mt-5 mb-5 flex justify-center items-center text-4xl'>SUBPRODUCTOS Y PRODUCTOS</h2> */}
        <RanchInventario/>
    </div>
  )
}

export default inventario