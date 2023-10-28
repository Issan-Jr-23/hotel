
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import { Home } from "./pages/Home";
import Pasadia from "./pages/Pasadia.jsx";
import Cabanias from "./pages/Cabanias.jsx";
import InvBebidas from "./pages/Inventario.jsx";
import InvAlimentos from "./pages/InventarioAlimentos.jsx";
import Mekatos from "./pages/Mekatos.jsx"
import Food from "./pages/Food.jsx"
import Bebidas from "./pages/Bebidas.jsx"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare} from '@fortawesome/free-solid-svg-icons'

library.add( faCheckSquare)



function App() {
  
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="max-w-full">
            <Routes>
              
              <Route path="/" element={<LoginPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/Pasadia" element={<Pasadia/>} />
                <Route path="/cabanias" element={<Cabanias/>} />
                <Route path="/mekatos" element={<Mekatos/>} />
                <Route path="/inventario" element={<InvBebidas/>}/>
                <Route path="/alimentos" element={<InvAlimentos/>}/>
                <Route path="/food" element={<Food/>}/>
                <Route path="/drinks" element={<Bebidas/>}/>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
