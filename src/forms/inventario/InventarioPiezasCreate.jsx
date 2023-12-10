import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { createInventarioPieza,getSucursalesByRol, getPiezas } from "../../components/api/adress";

const useField = ({ type }) => {
  const [value, setValue] = useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, value, onChange };
};

const InventarioPiezasCreate = () => {
  const pieza = useField({ type: "select" });
  const sucursal = useField({ type: "select" });
  const cantidad = useField({ type: "number" });
  const { token } = useSelector((state) => state.auth);

  const [piezas, setPiezas] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  const clearForm = () => {
    pieza.onChange({ target: { value: "" } });
    sucursal.onChange({ target: { value: "" } });
    cantidad.onChange({ target: { value: "" } });
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    const piezaToSend = {
      pieza_id: pieza.value,
      sucursal_id: sucursal.value,
      cantidad_disponible: cantidad.value
    };
    try {
      await createInventarioPieza(piezaToSend, token);
      toast.success("Pieza creada con éxito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const sucursales = await getSucursalesByRol(token);
      const piezas = await getPiezas(token);
      setSucursales(sucursales);
      setPiezas(piezas);
    };
    fetchData();
  }, []);

  return (
    <form className="p-2" onSubmit={enviarForm}>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        Creacion de inventario de piezas
      </h1>
      <h6 className="mt-1 text-xl text-gray-600 dark:text-gray-200">
        Aqui puedes crear un inventario de piezas para una sucursal en especifico con las piezas previamente creadas
        (si no tiene la pieza deseada, crearla en la seccion de piezas)
      </h6>
      <div className="mt-6 sm:grid-cols-6 gap-y-4 ">
        <label
          htmlFor="Pieza"
          className="block text-xl font-medium text-gray-700 dark:text-white mb-2"
        >
          Pieza 
        </label>
        <select
          {...pieza}
          id="Pieza"
          autoComplete="Pieza"
          required
          className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-inherit mb-5 h-9"
        >
          <option value="">Seleccione una pieza</option>
          {piezas.map((pieza) => (
            <option key={pieza.id} value={pieza.id}>
              Nombre: {pieza.nombre}  Serie: {pieza.serie}  Precio: {pieza.precio}
            </option>
          ))}
        </select>

        <label
          htmlFor="Sucursal"
          className="block text-xl font-medium text-gray-700 dark:text-white mb-2"
        >
          Sucursal
        </label>
        <select
          {...sucursal}
          id="Sucursal"
          autoComplete="Sucursal"
          required
          className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-inherit mb-5 h-9"
        >
          <option value="">Seleccione una sucursal</option>
          {sucursales.map((sucursal) => (
            <option key={sucursal.id} value={sucursal.id}>
              {sucursal.nombre} - {sucursal.direccion}
            </option>
          ))}
        </select>

        <label
          htmlFor="Cantidad"
          className="block text-xl font-medium text-gray-700 dark:text-white  mb-2"
        >
          Cantidad
        </label>
        <input
          {...cantidad}
          id="Cantidad"
          autoComplete="Cantidad"
          min="0"
          className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-inherit mb-5 h-9"
        />

        <button
          type="submit"
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default InventarioPiezasCreate;
