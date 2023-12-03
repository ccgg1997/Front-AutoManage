import { useEffect, useState } from 'react';
import SeleccionarVehiculo from "./etapas/SeleccionarVehiculo.jsx";
import Fin from "./etapas/Fin.jsx";
import Resumen from "./etapas/Resumen.jsx";

export default function CotizacionForm() {
  let content;
  const [etapaActivo, setEtapaActiva] = useState("RESUMEN");
  const [valorTotal, setValorTotal] = useState(0);
  // const precio = useField({ type: "number" });
  const [idInventarioVehiculo, setIdInventarioVehiculo] = useState("");
  const [identificacionCliente, setIdentificacionCliente] = useState("");
  const [nombreVehiculo, setNombreVehiculo] = useState("");
  const stateForm = {
    etapa: etapaActivo,
  };

  const model = {
    nombre_vehiculo: nombreVehiculo,
    valor_total: valorTotal,
    inventario_vehiculos: idInventarioVehiculo,
    id_cliente: identificacionCliente,
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
      setIdentificacionCliente(inventarioVehiculo.cliente_id);
    }
  };

  switch (stateForm.etapa) {
    case 'RESUMEN':
      content = <Resumen
        actionVender={() => setEtapaActiva('SELECCIONAR_VEHICULO')}
      />
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
