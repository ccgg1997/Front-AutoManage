import React from "react";
import { getOneOrden } from "../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import BasicTable from "../components/Table";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

export default function ConsultaReparacion() {
  /**
   * Renders a form for deleting a vehicle.
   *
   * @returns {JSX.Element} The delete vehicle form component.
   */
  const { token } = useSelector((state) => state.auth);
  const id = useField({ type: "number" });
  const [data, setData] = React.useState([]);
  const [mostrarTabla, setMostrarTabla] = React.useState(false);
  const [mostrarForm, setMostrarForm] = React.useState(true);
  const titles = [
    { field: "cliente", headerName: "Cliente", width: 130 },
    { field: "estado", headerName: "Estado", width: 130 },
    { field: "fecha_creacion", headerName: "Fecha de creacion", width: 130 },
    { field: "fecha_finalizacion", headerName: "Fecha de finalizacion", width: 130 },
    { field: "id", headerName: "ID", width: 130 },
    { field: "placa", headerName: "Placa", width: 130 },
    { field: "sucursal", headerName: "Sucursal", width: 130 },
    { field: "tipo", headerName: "Tipo", width: 130 },
    { field: "valor_mano_obra", headerName: "Valor mano de obra", width: 130 },
    { field: "valor_total", headerName: "Valor Total", width: 130 },
    { field: "vendendor", headerName: "Vendedor", width: 130 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getOneOrden(id.value, token);
      toast.success("Orden encontrada con exito");
      clearForm();
      setMostrarTabla(true);
      setMostrarForm(false);
      setData(res);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onClickVolver = () => {
    setMostrarTabla(false);
    setMostrarForm(true);
    setData([]);
    clearForm();
  };


  const clearForm = () => {
    id.onChange({ target: { value: "" } });
  };

  return (
    <div className="min-h-screen border-t p-12 border-b border-gray-900/10 pb-12">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2
            className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
          >
            Consulta de reparaciones
          </h2>
          <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-slate-300">
            Bienvenido al portal de reparaciones, Antes de consultar las
            reparaciones de un vehiculo tenga a la mano el id de la orden
          </p>
        </div>

        {mostrarForm && (
          <div>
            <label
              htmlFor="marca"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Id de la orden
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
                <input
                  {...id}
                  id="id"
                  autoComplete="id"
                  required
                  min="0"
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
               focus:ring-0 sm:text-sm sm:leading-6  dark:text-white"
                />
              </div>
            </div>
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">
              Consultar
            </button>

          </div>
        )}
        {mostrarTabla && (
          <div className="pl-10 pr-10 pt-6">
            <BasicTable data={[data]} titles={titles} />
            <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" onClick={onClickVolver}>
              Volver
            </button>
            
          </div>
        )}

        <Toaster />
      </form>
    </div>
  );
}
