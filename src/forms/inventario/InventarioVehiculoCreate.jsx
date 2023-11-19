import React from "react";
import { useState } from "react";

const InventarioVehiculoCreate = () => {
  const [modelo, setModelo] = useState("");
  const [condicion, setCondicion] = useState("");
  const [estado, setEstado] = useState("");
  const [placa, setPlaca] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [color, setColor] = useState("");
  const [vehiculo_id, setVehiculo_id] = useState("");
  const [sucursal_id, setSucursal_id] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <form onSubmit={handleSubmit} className=" p-2">
      <div className="mt-2 sm:grid-cols-6 gap-y-4">
        <label
          htmlFor="modelo"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Modelo
        </label>
        <div>
          <input
            {...modelo}
            id="modelo"
            autoComplete="modelo"
            required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          />
        </div>

        <label
          htmlFor="condicion"
          className="block text-sm font-medium text-grtext white"
        >
          Condicion
        </label>
        <div className="mt-1">
          <input
            {...condicion}
            id="condicion"
            autoComplete="condicion"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>

        <label
          htmlFor="estado"
          className="block text-sm font-medium text-grtext white"
        >
          Estado
        </label>
        <div className="mt-1">
          <input
            {...estado}
            id="estado"
            autoComplete="estado"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>

        <label
          htmlFor="placa"
          className="block text-sm font-medium text-grtext white"
        >
          Placa
        </label>
        <div className="mt-1">
          <input
            {...placa}
            id="placa"
            autoComplete="placa"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>

        <label
          htmlFor="kilometraje"
          className="block text-sm font-medium text-grtext white"
        >
          Kilometraje
        </label>
        <div className="mt-1">
          <input
            {...kilometraje}
            id="kilometraje"
            autoComplete="kilometraje"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>

        <label
          htmlFor="color"
          className="block text-sm font-medium text-grtext white"
        >
          Color
        </label>
        <div className="mt-1">
          <input
            {...color}
            id="color"
            autoComplete="color"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>

        <label
          htmlFor="vehiculo_id"
          className="block text-sm font-medium text-grtext white"
        >
          Vehiculo ID
        </label>
        <div className="mt-1">
          <input
            {...vehiculo_id}
            id="vehiculo_id"
            autoComplete="vehiculo_id"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>

        <label
          htmlFor="sucursal_id"
          className="block text-sm font-medium text-grtext white"
        >
          Sucursal ID
        </label>
        <div className="mt-1">
          <input
            {...sucursal_id}
            id="sucursal_id"
            autoComplete="sucursal_id"
           required
            className="shadow-sm focus:ring-indigo-500 focus:border-black w-full md:w-1/2 border-2 border-black rounded-md  dark:bg-inherit dark:border-white mb-4"
          
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default InventarioVehiculoCreate;
