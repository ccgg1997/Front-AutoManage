import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./pages/Hero";
import Venta from "./pages/Venta";
import OrdenesTrabajo from "./pages/OrdenesTrabajo";
import Inventario from "./pages/Inventario";
import Error from "./pages/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/Ventas" element={<Venta />}></Route>
          <Route path="/Ordenes" element={<OrdenesTrabajo />}></Route>
          <Route path="/Inventario" element={<Inventario />}></Route>
          <Route path="*" element={<Error error={"404"} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
