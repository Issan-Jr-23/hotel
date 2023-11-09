import "./App.css"
import {  Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import { Home } from "./pages/Home";
import Pasadia from "./pages/Pasadia.jsx";
import Cabanias from "./pages/Cabanias.jsx";
import InvBebidas from "./pages/inventario.jsx";
import Habitaciones from "./pages/Habitaciones.jsx";

 


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
            </Routes>
          </main>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
