
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import { TaskProvider } from "./context/tasksContext";
import { Home } from "./pages/Home";
import Pasadia from "./pages/Pasadia";
import Cabanias from "./pages/Cabanias";
import InvBebidas from "./pages/InventarioBebidas.jsx";
import InvAlimentos from "./pages/InventarioAlimentos.jsx";
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
                <Route path="/bebidas" element={<InvBebidas/>}/>
                <Route path="/alimentos" element={<InvAlimentos/>}/>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
