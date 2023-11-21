import { useState } from "react";
import Inicial from "./etapas/Inicial.jsx";
import SeleccionarCotizacion from "./etapas/SeleccionarCotizacion";
import SeleccionarVehiculo from "./etapas/SeleccionarVehiculo.jsx";
import Fin from "./etapas/Fin";

export default function VentaForm() {
  let content;
  const [etapaActivo, setEtapaActiva] = useState("INICIAL");
  const [valorTotal, setValorTotal] = useState(0);
  // const precio = useField({ type: "number" });
  const [idInventarioVehiculo, setIdInventarioVehiculo] = useState("");
  const [identificacionCliente, setIdentificacionCliente] = useState("");
  const [idCotizacion, setidCotizacion] = useState("");
  const [nombreVehiculo, setNombreVehiculo] = useState("");
  const stateForm = {
    etapa: etapaActivo,
  };

  const model = {
    nombre_vehiculo: nombreVehiculo,
    valor_total: valorTotal,
    inventario_vehiculo: idInventarioVehiculo,
    identificacion_cliente: identificacionCliente,
    cotizacion: idCotizacion,
  };

  const updateVehiculoInfo = (inventarioVehiculo) => {
    setIdInventarioVehiculo(inventarioVehiculo.id);
    setValorTotal(inventarioVehiculo.vehiculo.precio);
    setNombreVehiculo(
      inventarioVehiculo.vehiculo.marca +
        " " +
        inventarioVehiculo.vehiculo.linea
    );
    if (inventarioVehiculo.identificacion_cliente) {
      setIdentificacionCliente(inventarioVehiculo.identificacion_cliente);
    }
    if (inventarioVehiculo.id_cotizacion) {
      setidCotizacion(inventarioVehiculo.id_cotizacion);
    }
  };

  switch (stateForm.etapa) {
    case "INICIAL":
      content = (
        <Inicial
          actionCotizacionSi={() => setEtapaActiva("SELECCIONAR_COTIZACION")}
          actionCotizacionNo={() => setEtapaActiva("SELECCIONAR_VEHICULO")}
        />
      );
      break;
    case "SELECCIONAR_COTIZACION":
      content = (
        <SeleccionarCotizacion
          updateVehiculoInfo={updateVehiculoInfo}
          actionVehiculoSeleccionado={() => setEtapaActiva("FIN")}
        />
      );
      break;
    case "SELECCIONAR_VEHICULO":
      content = (
        <SeleccionarVehiculo
          updateVehiculoInfo={updateVehiculoInfo}
          actionVehiculoSeleccionado={() => setEtapaActiva("FIN")}
        />
      );
      break;
    case "FIN":
      content = (
        <Fin
          formData={model}
          actionAfterSubmit={() => setEtapaActiva("INICIAL")}
        />
      );
      break;

    default:
      setEtapaActiva("INICIAL");
      break;
  }
  return (
    <div className="min-h-screen dark:text-white">
      <main className="p-6">
        {content}
        {/* <button type="button" onClick={() => setEtapaActiva(stateForm.etapa + 1)}>Adelante</button>
        <button type="button" onClick={() => setEtapaActiva(stateForm.etapa - 1)}>Atras</button> */}
      </main>
    </div>
  );
}
