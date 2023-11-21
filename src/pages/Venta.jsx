import Tabs from "../components/Tabs.jsx";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import VentaForm from "../forms/venta/VentaForm.jsx";
import CotizacionForm from "../forms/venta/CotizacionForm.jsx";

export default function Venta() {
  const tabs = [
    { label: "Cotizacion", content: <CotizacionForm /> },
    { label: "Venta", content: <VentaForm /> },
  ];

  return (
    <div className="min-h-screen dark:text-white">
      <div className=" border-t border-b border-gray-900/10 flex items-center justify-center pt-10 pl-7 pr-7 pb-5">
        <CurrencyDollarIcon
          className="h-10 w-10 mr-2 text-blue-500"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold dark:text-white">
          VENTAS
        </h1>
      </div>
      <Tabs className="h-full" tabs={tabs} />
    </div>
  );
}
