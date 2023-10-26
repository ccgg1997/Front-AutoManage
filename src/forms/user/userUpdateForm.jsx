import React from "react";
import { createVehiculo } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

export default function UserUpdate() {
  const { token } = useSelector((state) => state.auth);

  const nombre = useField({ type: "text" });
  const correo = useField({ type: "mail" });
  const contrasena = useField({ type: "password" });

  const vehiculo = {
    nombre: nombre.value,
    correo: correo.value,
    contrasena: contrasena.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await createVehiculo(vehiculo, token);
      //console.log(response);
      toast.success("Vehiculo creado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const clearForm = () => {
    nombre.onChange({ target: { value: "" } });
    correo.onChange({ target: { value: "" } });
    contrasena.onChange({ target: { value: "" } });
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen py-12 bg-gray-50 dark:bg-slate-950 sm:px-6 lg:px-8">
      <form className=" w-1/2 mx-auto " onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2
            className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
          >
            Actualizacion de datos
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
            Bienvenido al portal de configuracion de cuenta
          </p>
        </div>

        <div className="mt-10 mb-10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <fieldset>
            <legend className="text-xl mb-5">
              Modificar informacion
            </legend>
            <label
              htmlFor="nombre"
              className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Nombre: Nombre quemado
              <div className="mt-3 mx-auto block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
                <button className="display flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white">
                  Editar
                </button>
              </div>
            </label>
          </fieldset>

          <fieldset className="mt-4 sm:col-span-4">
            <label
              htmlFor="correo"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Correo electronico: Correo quemado
              <div className="mt-2 mx-auto block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
                <button className="display flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white">
                  Editar
                </button>
              </div>
            </label>
          </fieldset>

          <fieldset className="mt-4 sm:col-span-4">
            <label
              htmlFor="contrasena"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              contraseña: ********
              <div className="mt-2 mx-auto flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                <button className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white">
                  Editar
                </button>
              </div>
            </label>
          </fieldset>
        </div>

        <button className=" mb-5 p-2 bg-lime-600 rounded" type="submit">
          Submit
        </button>
        <Toaster />
      </form>
    </section>
  );
}
