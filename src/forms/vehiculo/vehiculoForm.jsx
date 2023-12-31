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

/**
 * Renders a form for creating a vehicle.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export default function VehiculoForm() {
  const { token } = useSelector((state) => state.auth);

  const marca = useField({ type: "text" });
  const linea = useField({ type: "text" });
  const tipo = useField({ type: "text", default: "Deportivo" });
  const precio = useField({ type: "number" });

  const vehiculo = {
    marca: marca.value,
    linea: linea.value,
    tipo: tipo.value,
    precio: precio.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehiculo(vehiculo, token);
      toast.success("Vehiculo creado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const clearForm = () => {
    marca.onChange({ target: { value: "" } });
    linea.onChange({ target: { value: "" } });
    tipo.onChange({ target: { value: "" } });
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
          Creacion de vehiculos
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido al portal de vehiculos, por favor ingrese informacion
          completa.
        </p>
      </div>

      <div className="mt-10 sm:grid-cols-6">
        <label
          htmlFor="marca"
          className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
        >
          Marca
        </label>
        <div className="mt-2">
          <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
            <input
              {...marca}
              id="marca"
              autoComplete="marca"
              required
              className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6  dark:text-white"
            />
          </div>
        </div>

        <div className="mt-10 ">
          <div className="">
            <label
              htmlFor="linea"
              className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Linea
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                <input
                  {...linea}
                  id="linea"
                  autoComplete="linea"
                  required
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="tipo"
                className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Tipo
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <select
                    {...tipo}
                    id="tipo"
                    autoComplete="tipo"
                    required
                    className="dark:bg-sky-950 dark:border-white text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Camioneta">Camioneta</option>
                    <option value="SUV">SUV</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Van">Van</option>
                    <option value="Deportivo">Deportivo</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Furgon">Furgon</option>
                    <option value="Microbus">Microbus</option>
                    <option value="Jeep">Jeep</option>
                    <option value="Todo terreno">Todo terreno</option>
                    <option value="Otros">Otros</option>
                  </select>
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
                      min="0"
                      className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                    />
                  </div>
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
