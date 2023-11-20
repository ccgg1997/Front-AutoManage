import React, { useEffect } from "react";
import { useState } from "react";
import { getVehiculos, getSucursales,createVehiculoInventario } from "../../components/api/adress";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const useField = ({ type }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, value, onChange };
};

const InventarioVehiculoCreate = () => {
  const { token } = useSelector((state) => state.auth);
  const [vehiculos, setVehiculos] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estado, setEstado] = useState("");
  const [condicion, setCondicion] = useState("");
  const modelo = useField({ type: "text" });
  const placa = useField({ type: "text" });
  const kilometraje = useField({ type: "number" });
  const color = useField({ type: "text" });
  const vehiculo_id = useField({ type: "number" });
  const sucursal_id = useField({ type: "number" });
  const getVehiculosData = async () => {
    const response = await getVehiculos(token);
    setVehiculos(response);
  };
  const getSucursalesData = async () => {
    const response = await getSucursales(token);
    setSucursales(response);
  };

  useEffect(() => {
    getVehiculosData();
    getSucursalesData();
  }, []);

  const clearForm = () => {
    modelo.onChange({ target: { value: "" } });
    placa.onChange({ target: { value: "" } });
    kilometraje.onChange({ target: { value: "" } });
    color.onChange({ target: { value: "" } });
    vehiculo_id.onChange({ target: { value: "" } });
    sucursal_id.onChange({ target: { value: "" } });
    };


  const enviarform = async(e) => {
    e.preventDefault();
    const vehiculo = {
      modelo: modelo.value,
      condicion: condicion,
      estado: estado,
      placa: placa.value,
      kilometraje: kilometraje.value,
      color: color.value,
      vehiculo_id: vehiculo_id.value,
      sucursal_id: sucursal_id.value,
    };
    try{
    await createVehiculoInventario(vehiculo, token);
    toast.success("Vehiculo creado con exito");
    clearForm();
}catch(error){
    
    toast.error(error.message);}
  };

  return (
    <form className=" p-2" onSubmit={enviarform}>
      <div className="mt-2 sm:grid-cols-6 gap-y-4">
        <label
          htmlFor="modelo"
          className="block text-xl font-medium text-gray-700 dark:text-white"
        >
          Modelo
        </label>
        <div>
          <input
            {...modelo}
            id="modelo"
            autoComplete="modelo"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-inherit mb-5 h-9"
          />
        </div>

        <label
          htmlFor="condicion"
          className="block text-xl font-medium text-grtext white"
        >
          Condicion
        </label>
        <div className="mt-1">
          <select
            id="condicion"
            value={condicion}
            onChange={(e) => setCondicion(e.target.value)}
            required
            className="mb-6 w-full  bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 dark:bg-sky-950 dark:border-white"
          >
            <option value="">Selecciona el estado</option>
            <option value="NUEVO">Nuevo</option>
            <option value="USADO">Usado</option>
          </select>
        </div>

        <label
          htmlFor="estado"
          className="block text-xl font-medium text-grtext white"
        >
          Estado
        </label>
        <div className="mt-1">
          <select
            id="estado"
            required
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="mb-6 w-full  bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 dark:bg-sky-950 dark:border-white"
          >
            <option value="">Selecciona el estado</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="VENDIDO">Vendido</option>
          </select>
        </div>

        <label
          htmlFor="placa"
          className="block text-xl font-medium text-grtext white"
        >
          Placa
        </label>
        <div className="mt-1">
          <input
            {...placa}
            id="placa"
            autoComplete="placa"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-white mb-5 h-9"
          />
        </div>

        <label
          htmlFor="kilometraje"
          className="block text-xl font-medium text-grtext white"
        >
          Kilometraje
        </label>
        <div className="mt-1">
          <input
            {...kilometraje}
            id="kilometraje"
            autoComplete="kilometraje"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-white mb-5 h-9"
          />
        </div>

        <label
          htmlFor="color"
          className="block text-xl font-medium text-grtext white"
        >
          Color
        </label>
        <div className="mt-1">
          <input
            {...color}
            id="color"
            autoComplete="color"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-white mb-5 h-9"
          />
        </div>

        <label
          htmlFor="vehiculo_id"
          className="block text-xl font-medium text-grtext white"
        >
          Vehiculo ID
        </label>
        <div className="mt-1">
          <select
            {...vehiculo_id}
            id="vehiculo_id"
            autoComplete="vehiculo_id"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-white mb-5 h-9"
          >
            <option value="">Selecciona el vehiculo</option>
            {vehiculos.map((vehiculo, index) => (
              <option key={index} value={vehiculo.id}>
                {vehiculo.id +
                  "-" +
                  vehiculo.marca +
                  "-" +
                  vehiculo.linea +
                  "-" +
                  parseInt(vehiculo.precio)}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="sucursal_id"
          className="block text-xl font-medium text-grtext white"
        >
          Sucursal ID
        </label>
        <div className="mt-1">
          <select
            {...sucursal_id}
            id="sucursal_id"
            autoComplete="sucursal_id"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-white mb-5 h-9"
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((sucursal, index) => (
              <option key={index} value={sucursal.id}>
                {sucursal.id +
                  "-" +
                  sucursal.nombre+"-"+
                  sucursal.direccion }
              </option>
            ))}

          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default InventarioVehiculoCreate;
