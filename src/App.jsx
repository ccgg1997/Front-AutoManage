import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./pages/Hero";
import Venta from "./pages/Venta";
import OrdenesTrabajo from "./pages/OrdenesTrabajo";
import Inventario from "./pages/Inventario";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Profile from "./pages/profile"; 
import React from "react";
import { clearAuthData } from "./store/features/auth/auth";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const [auth, setAuth] = React.useState(false);

  const actualizarAuth = (auth) => {
    setAuth(auth);
  }

  const logOut = () => {
    Cookies.remove("token");
    clearAuthData();
    setAuth(false);
  };

  return (
    <div className="App dark:bg-slate-950">
      {!auth && <Login actualizar={actualizarAuth} />}
      {auth && <Router>
        <Navbar logOut={logOut} />
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/Ventas" element={<Venta />}></Route>
          <Route path="/Ordenes" element={<OrdenesTrabajo />}></Route>
          <Route path="/Inventario" element={<Inventario />}></Route>
          <Route path="/Usuarios" element={<Usuarios />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="*" element={<Error error={"404"} />}></Route>
        </Routes>
      </Router>}
    </div>
  );
}

export default App;
