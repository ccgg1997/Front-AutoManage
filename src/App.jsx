import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./pages/Hero";
import Venta from "./pages/Venta";
import OrdenesTrabajo from "./pages/OrdenesTrabajo";
import Inventario from "./pages/Inventario";
import Error from "./pages/Error";
import Login from "./pages/Login";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [auth, setAuth] = React.useState(false);
  const actualizarAuth = (auth) => {
    setAuth(auth);
  }
  return (
    <div className="App">
      {!auth && <Login actualizar={actualizarAuth} />}
      {auth && <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/Ventas" element={<Venta />}></Route>
          <Route path="/Ordenes" element={<OrdenesTrabajo />}></Route>
          <Route path="/Inventario" element={<Inventario />}></Route>
          <Route path="*" element={<Error error={"404"} />}></Route>
        </Routes>
      </Router>}
    </div>
  );
}

export default App;
