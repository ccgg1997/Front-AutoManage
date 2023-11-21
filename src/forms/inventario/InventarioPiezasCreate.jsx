import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { createPieza } from "../../components/api/adress";

const useField = ({ type }) => {
  const [value, setValue] = useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, value, onChange };
};

const InventarioPiezasCreate = () => {
  const nombre = useField({ type: "text" });
  const serie = useField({ type: "text" });
  const precio = useField({ type: "number" });
  const { token } = useSelector((state) => state.auth);

  const clearForm = () => {
    nombre.onChange({ target: { value: "" } });
    serie.onChange({ target: { value: "" } });
    precio.onChange({ target: { value: "" } });
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    const pieza = {
      nombre: nombre.value,
      serie: serie.value,
      precio: precio.value,
    };
    try {
      await createPieza(pieza, token);
      toast.success("Pieza creada con éxito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="p-2" onSubmit={enviarForm}>
      <div className="mt-2 sm:grid-cols-6 gap-y-4">
        <label
          htmlFor="nombre"
          className="block text-xl font-medium text-gray-700 dark:text-white"
        >
          Nombre
        </label>
        <input
          {...nombre}
          id="nombre"
          autoComplete="nombre"
          required
          className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-inherit mb-5 h-9"
        />

        <label
          htmlFor="serie"
          className="block text-xl font-medium text-gray-700 dark:text-white"
        >
          Serie
        </label>
        <input
          {...serie}
          id="serie"
          autoComplete="serie"
          required
          className="shadow-sm focus:ring-indigo-500 focus:border-black w-full border-2 border-black rounded-md  dark:bg-sky-950 dark:border-inherit mb-5 h-9"
        />

        <label
          htmlFor="precio"
          className="block text-xl font-medium text-gray-700 dark:text-white"
        >
          Precio
        </label>
        <input
          {...precio}
          id="precio"
          autoComplete="precio"
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
