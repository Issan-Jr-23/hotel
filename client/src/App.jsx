import "./App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import { Home } from "./pages/Home";
import Register from "./pages/RegisterPage.jsx";
import Pasadia from "./pages/Pasadia.jsx";
import Cabanias from "./pages/Cabanias.jsx";
import InvBebidas from "./pages/inventario.jsx";
import Habitaciones from "./pages/Habitaciones.jsx";
import Precios from "./pages/Price.jsx";
import Hotel_graphs from "./graphs/LinearCharts.jsx";
import FincaVisualizacion from "./pages/FincaVisualizacion.jsx";
import FincaInventario from "./pages/FincaInv.jsx";
import Message from "./pages/Mesagge.jsx";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
          <BrowserRouter basename="/meqo-soft">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/meqo-soft" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/Pasadia" element={<Pasadia />} />
                <Route path="/cabanias" element={<Cabanias />} />
                <Route path="/inventario" element={<InvBebidas />} />
                <Route path="/habitaciones" element={<Habitaciones />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["editor"]}/>}>
                <Route path="/hotel-graphs" element={<Hotel_graphs />}/>
                <Route path="/finca" element={<FincaVisualizacion/>}/>
                <Route path="/message" element={<Message/>}/>
                <Route path="/price" element={<Precios/>}/>
                <Route path="/inventario-finca" element={<FincaInventario/>}/>
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["editor"]} />}>
                <Route path="/Register" element={<Register/>} />
              </Route>
            </Routes>
          </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;