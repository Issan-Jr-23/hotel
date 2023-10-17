import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import RegisterPage from "./pages/RegisterPage";
// import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
// import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { Home } from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            {/* <Navbar /> */}
            <Routes>
              
              <Route path="/" element={<LoginPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<Home/>}/>
                {/* <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} /> */}
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
