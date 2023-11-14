import "./App.css"
import {  Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import { Home } from "./pages/Home";
import  Register  from "./pages/RegisterPage.jsx";
import Pasadia from "./pages/Pasadia.jsx";
import Cabanias from "./pages/Cabanias.jsx";
import InvBebidas from "./pages/inventario.jsx";
import Habitaciones from "./pages/Habitaciones.jsx";
import Hotel_graphs from "./graphs/LinearCharts.jsx";



 


function App() {

 
  return (
    <AuthProvider>
        
      <TaskProvider>
          <main className="">
            
            <Routes>
              <Route path="/" element={<LoginPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/Pasadia" element={<Pasadia/>} />
                <Route path="/cabanias" element={<Cabanias/>} />
                <Route path="/inventario" element={<InvBebidas/>}/>
                <Route path="/habitaciones" element={<Habitaciones/>}/>
                
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["editor"]} />}>
              <Route path="/Hotel-graphs" element={<Hotel_graphs />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={["editor"]} />}>
              <Route path="/Register" element={<Register />} />
              </Route>

            </Routes>
          </main>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
