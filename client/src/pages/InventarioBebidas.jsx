import  Navbar  from "../components/Navbars.jsx"
import InventarioBebidas from './table/TablaInventario.jsx'

const inventario = () => {
  return (
    <div>
        <Navbar/>
        <InventarioBebidas/>
    </div>
  )
}

export default inventario