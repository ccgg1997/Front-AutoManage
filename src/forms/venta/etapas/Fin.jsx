import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import {
  getUsuarioByIdentificacion,
  createVenta,
} from "../../../components/api/adress";

const useField = ({ type, placeholder, defaultValue }) => {
  const [value, setValue] = React.useState(defaultValue);
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

const formatearFecha = (fecha) => {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");

  const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  return fechaFormateada;
};

export default function Fin({ formData, actionAfterSubmit }) {
  const fechaActual = new Date();
  const { token, id } = useSelector((state) => state.auth);

  const estado = useField({ type: "select", defaultValue: "FINALIZADA" });
  const cliente = useField({ type: "test", defaultValue: "" });
  const [valorTotal, setValorTotal] = useState(0);
  const [idInventarioVehiculo, setIdInventarioVehiculo] = useState("");
  const [idCotizacion, setIdCotizacion] = useState("");
  const [idCliente, setIdCliente] = useState("");

  const model = {
    id: null,
    fecha_creacion: formatearFecha(fechaActual),
    estado: estado.value,
    valor_total: valorTotal,
    inventario_vehiculo: idInventarioVehiculo,
    cotizacion: idCotizacion,
    vendedor: id,
    cliente: idCliente,
  };

  useEffect(() => {
    setValorTotal(formData.valor_total);
    setIdInventarioVehiculo(formData.inventario_vehiculo);
    setIdCotizacion(formData.cotizacion ? formData.cotizacion : null);
    if (formData.identificacion_cliente) {
      cliente.onChange({ target: { value: formData.identificacion_cliente } });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let clienteBd = await getUsuarioByIdentificacion(cliente.value, token);
      if (!clienteBd) {
        toast.error("El Cliente no Existe.");
        return;
      }
      setIdCliente(clienteBd.id);
      const body = { ...model, ...{ cliente: clienteBd.id } };
      const response = await createVenta(body, token);
      toast.success("Venta creada con exito");
      setTimeout(function () {
        actionAfterSubmit();
      }, 1300);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Completar Venta:</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <div className="sm:grid-cols-12">
            <span className="text-xl font-medium  dark:text-white">
              Vehículo:
            </span>
            <span className="ml-2 text-xl font-bold dark:text-white">
              {formData.nombre_vehiculo}
            </span>
          </div>
          <div className="mt-10 sm:grid-cols-6">
            <label
              htmlFor="precio"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Precio pactado:
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                <input
                  disabled
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                                    focus:ring-0 sm:text-sm   dark:text-white"
                  value={formData.valor_total}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="cliente"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Cliente (Numero de Cédula):
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <input
                    {...cliente}
                    id="cliente"
                    autoComplete="cliente"
                    required
                    min="0"
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:grid-cols-6">
            <label
              htmlFor="estado"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Estado Venta
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                <select
                  {...estado}
                  id="estado"
                  autoComplete="estado"
                  required
                  className="dark:bg-sky-950 dark:border-white text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                                    focus:ring-0 sm:text-sm   dark:text-white"
                >
                  <option value="" disabled selected>
                    Seleccione un Estado
                  </option>
                  <option key="FINALIZADA" value="FINALIZADA">
                    FINALIZADA
                  </option>
                  <option key="PENDIENTE_ENTREGA" value="PENDIENTE_ENTREGA">
                    PENDIENTE POR ENTREGAR VEHÍCULO
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button className=" mb-5 mt-5 p-2 bg-lime-600 rounded " type="submit">
          Crear
        </button>
        <Toaster />
      </form>
    </>
  );
}
