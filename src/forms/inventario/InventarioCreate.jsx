import React from "react";
import { useState } from "react";
import InventarioVehiculoCreate from "./InventarioVehiculoCreate";
import InventarioPiezaCreate from "./InventarioPiezasCreate";

const InventarioCreate = () => {
  const [seleccion, setSeleccion] = useState("");

  const manejarCambio = (e) => {
    setSeleccion(e.target.value);
    // Aquí puedes agregar lógica adicional para manejar la selección
  };

  return (
    <>
      <div className="flex flex-col w-full  mx-auto bg-white shadow-md rounded-xl p-4 dark:bg-inherit lg:w-1/2 ">
        <label
          htmlFor="dropdown"
          className="block text-xl font-medium text-gray-700 dark:text-white"
        >
          Elige una categoría:
        </label>

        <select
          id="dropdown"
          value={seleccion}
          onChange={manejarCambio}
          className="mb-6 w-full  bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 dark:bg-sky-950 dark:border-white"
        >
          <option value="default">Selecciona una opción</option>
          <option value="pieza">Pieza</option>
          <option value="vehiculo">Vehículo</option>
        </select>

        {seleccion === "pieza" && <InventarioPiezaCreate className="pt-5" />}
        {seleccion === "vehiculo" && (
          <InventarioVehiculoCreate className="pt-5" />
        )}
      </div>
    </>
  );
};

export default InventarioCreate;
