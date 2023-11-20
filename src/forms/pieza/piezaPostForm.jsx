import React from "react";
import { createPieza } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

/**
 * Renders a form for creating a vehicle.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export default function PiezaPostForm() {
  const { token } = useSelector((state) => state.auth);

  const nombre = useField({ type: "text" });
  const serie = useField({ type: "text" });
  const precio = useField({ type: "number" });

  const pieza = {
    nombre: nombre.value,
    serie: serie.value,
    precio: precio.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPieza(pieza, token);
      toast.success("Pieza creado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const clearForm = () => {
    nombre.onChange({ target: { value: "" } });
    serie.onChange({ target: { value: "" } });
    precio.onChange({ target: { value: "" } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-t pt-12 border-b border-gray-900/10 pb-12">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
        >
          Creacion de piezas
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido al portal de piezas, por favor ingrese informacion
          completa.
        </p>
      </div>

      <div className="mt-10 sm:grid-cols-6">
        <label
          htmlFor="nombre"
          className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
        >
          Nombre
        </label>
        <div className="mt-2">
          <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
            <input
              {...nombre}
              id="nombre"
              autoComplete="nombre"
              required
              className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6  dark:text-white"
            />
          </div>
        </div>

        <div className="mt-10 ">
          <div className="">
            <label
              htmlFor="serie"
              className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Serie
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                <input
                  {...serie}
                  id="serie"
                  autoComplete="serie"
                  required
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>
          </div>


          <div className="mt-10 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="precio"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Precio
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <input
                    {...precio}
                    id="precio"
                    autoComplete="precio"
                    required
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <button className=" mb-5 mt-5 p-2 bg-lime-600 rounded " type="submit">
        Crear
      </button>
      <Toaster />
    </form>
  );
}
