import  Navbar  from "../components/Navbars.jsx"
import TableInventario from './table/TablaInventario.jsx'

const inventario = () => {
  return (
    <div>
        <Navbar/>
        <TableInventario />
    </div>
  )
}

export default inventario