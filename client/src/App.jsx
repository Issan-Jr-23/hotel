import "./App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import { MenuProvider } from "./context/menuContext.jsx";
import { Home } from "./pages/Home";
import Register from "./pages/RegisterPage.jsx";
// import Pasadia from "./pages/Pasadia.jsx";
// import Cabanias from "./pages/Cabanias.jsx";
import InvBebidas from "./pages/inventario.jsx";
// import Habitaciones from "./pages/Habitaciones.jsx";
import Precios from "./pages/Price.jsx";
import Hotel_graphs from "./graphs/LinearCharts.jsx";
import FincaVisualizacion from "./pages/FincaVisualizacion.jsx"; 
import FincaInventario from "./pages/FincaInv.jsx";
import InventarioRanch from "./pages/finca/InvRanch.jsx"
import PreciosRanch from "./pages/finca/Precios.jsx"
import Message from "./pages/Mesagge.jsx";
import HomeSu from "./pages/HomeSu.jsx";
import TransferenciaData from "./pages/tablePasadia/TransferirData.jsx";
import AppWithAuth from './context/apiWitchAuth.jsx';
import HistorialCompras from "./pages/HistorialCompras.jsx";
import HistorialUsuario from "./pages/Historial.jsx";
import NotFoundPage from "./pages/Page404.jsx"
import DashboardPasadia from "./pages/dashboard/dashboardPasadia.jsx";
import DashboardCabania from "./pages/dashboard/DashboardCabania.jsx";
import DashboardHabitaciones from "./pages/dashboard/DashboardHabitaciones.jsx";
import Adicionales from "./pages/adicionales/Adicionales.jsx";
import AdicionalesHabitaciones from "./pages/adicionales/Adicionales.habitaciones.jsx";
import AdicionalesCabanias from "./pages/adicionales/Adicionales.cabania.jsx";
import CabaniasStock from "./pages/stock/CabaniasStock.jsx";
import RegistroAnimales from "./pages/finca/Registro.jsx"
import Pasadia from "./pages/table-component/PasadiaTable.jsx"
import Cabanias from "./pages/table-component/CabaniaTable.jsx"
import Habitaciones from "./pages/table-component/HabitacionesTable.jsx"



function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <MenuProvider>
          <BrowserRouter basename="/meqo-soft">
            <AppWithAuth/>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/meqo-soft" element={<LoginPage />}/>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                {/* <Route path="/home" element={<Home/>} /> */}
                <Route path="/home" element={<HomeSu/>} />
                <Route path="/Pasadia" element={<Pasadia />} />
                <Route path="/cabanias" element={<Cabanias />} />
                <Route path="/inventario" element={<InvBebidas />} />
                <Route path="/habitaciones" element={<Habitaciones />} />
                <Route path="/historial/:id" element={<HistorialUsuario />} />
                <Route path="/adicional/:id" element={<Adicionales />} />
                <Route path="/cabanias-adicional/:id" element={<AdicionalesCabanias />} />
                <Route path="/habitaciones-adicional/:id" element={<AdicionalesHabitaciones />} />
                <Route path="/crear-registro" element={<RegistroAnimales/>}></Route>
                <Route path="/review" element={<Habitaciones/>}></Route>
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["superUser"]}/>}>
                <Route path="/hotel-graphs" element={<Hotel_graphs />}/>
                <Route path="/finca" element={<FincaVisualizacion/>}/>
                <Route path="/message" element={<Message/>}/>
                <Route path="/price" element={<Precios/>}/>
                <Route path="/inventario-finca" element={<FincaInventario/>}/>
                <Route path="/inventario-ranch" element={<InventarioRanch/>}/>
                <Route path="/precios" element={<PreciosRanch/>}/>
                <Route path="/transferencia-data" element={<TransferenciaData/>}/>
                <Route path="/historial-compras" element={<HistorialCompras/>}/>
                <Route path="/dashboard-pasadia" element={<DashboardPasadia/>} ></Route>
                <Route path="/dashboard-cabania" element={<DashboardCabania/>} ></Route>
                <Route path="/dashboard-habitaciones" element={<DashboardHabitaciones/>} ></Route>
                {/* <Route path="/cabania-stock" element={<CabaniasStock/>} ></Route> */}
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["editor"]} />}>
                <Route path="/Register" element={<Register/>} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </MenuProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;