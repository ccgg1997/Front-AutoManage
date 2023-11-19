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
      <div className="flex flex-col w-full  mx-auto bg-white shadow-md rounded-xl p-4 dark:bg-inherit ">
        <label
          htmlFor="dropdown"
          className="mb-2 text-lg font-bold text-gray-700"
        >
          Elige una categoría:
        </label>
        <div className="flex flex-col w-full lg:w-1/2 mx-auto justify-center items-center">
          <select
            id="dropdown"
            value={seleccion}
            onChange={manejarCambio}
            className="mb-6 w-full  bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 dark:bg-inherit dark:border-white"
          >
            <option value="default">Selecciona una opción</option>
            <option value="pieza">Pieza</option>
            <option value="vehiculo">Vehículo</option>
          </select>
        </div>
        {seleccion === "pieza" && <InventarioPiezaCreate className="pt-5" />}
        {seleccion === "vehiculo" && (
          <InventarioVehiculoCreate className="pt-5" />
        )}
      </div>
    </>
  );
};

export default InventarioCreate;
