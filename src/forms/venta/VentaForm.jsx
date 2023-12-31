import { useEffect, useState } from 'react';
import Resumen from "./etapas/Resumen.jsx";
import Inicial from "./etapas/Inicial.jsx";
import SeleccionarCotizacion from "./etapas/SeleccionarCotizacion";
import SeleccionarVehiculo from "./etapas/SeleccionarVehiculo.jsx";
import Fin from "./etapas/Fin";

export default function VentaForm() {
  let content;
  const [etapaActivo, setEtapaActiva] = useState("RESUMEN");
  const [valorTotal, setValorTotal] = useState(0);
  // const precio = useField({ type: "number" });
  const [idInventarioVehiculo, setIdInventarioVehiculo] = useState("");
  const [idCliente, setICliente] = useState("");
  const [idCotizacion, setIdCotizacion] = useState("");
  const [nombreVehiculo, setNombreVehiculo] = useState("");
  const stateForm = {
    etapa: etapaActivo,
  };

  const model = {
    nombre_vehiculo: nombreVehiculo,
    valor_total: valorTotal,
    inventario_vehiculo: idInventarioVehiculo,
    id_cliente: idCliente,
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
    if (inventarioVehiculo.cliente_id) {
      setICliente(inventarioVehiculo.cliente_id);
    }
    if (inventarioVehiculo.id_cotizacion) {
      setIdCotizacion(inventarioVehiculo.id_cotizacion);
    }
  };

  switch (stateForm.etapa) {
    case 'RESUMEN':
      content = <Resumen
        actionVender={() => setEtapaActiva('INICIAL')}
      />
      break;
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
          actionVolver={() => setEtapaActiva('INICIAL')}
        />
      );
      break;
    case "SELECCIONAR_VEHICULO":
      content = (
        <SeleccionarVehiculo
          updateVehiculoInfo={updateVehiculoInfo}
          actionVehiculoSeleccionado={() => setEtapaActiva("FIN")}
          actionVolver={() => setEtapaActiva('INICIAL')}
        />
      );
      break;
    case "FIN":
      content = (
        <Fin
          formData={model}
          actionAfterSubmit={() => setEtapaActiva("RESUMEN")}
        />
      );
      break;

    default:
      setEtapaActiva("RESUMEN");
      break;
  }
  return (
    <div className="min-h-screen dark:text-white">
      <main className="p-6">
        {content}
      </main>
    </div>
  );
}
