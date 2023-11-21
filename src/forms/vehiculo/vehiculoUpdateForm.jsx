import React, { useEffect, useState } from "react";
import { getVehiculo } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { updateVehiculo } from "../../components/api/adress";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

export default function VehiculoForm() {
  /**
   * Renders a form for editing a vehicle.
   *
   * @returns {JSX.Element} The rendered form for editing a vehicle.
   */
  const [seeForm, setSeeForm] = useState(false);
  const [seeIdForm, setSeeIdForm] = useState(true);

  const id = useField({ type: "number" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSeeForm(true);
    setSeeIdForm(false);
  };

  const clearForm = () => {
    id.onChange({ target: { value: "" } });
    setSeeForm(false);
    setSeeIdForm(true);
  };

  if (seeIdForm) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="border-t pt-12 border-b border-gray-900/10 pb-12">
          <h2
            className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
          >
            Editar un vehiculo
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
            Bienvenido al portal de vehiculos, Antes de editar un vehiculo tenga
            a la mano el id del vehiculo
          </p>
        </div>
        <div className="mt-10">
          <label
            htmlFor="id"
            className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
          >
            Id del vehiculo
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
        </div>

        <button className=" mb-5 p-2 bg-lime-600 rounded mt-5" type="submit">
          Editar
        </button>
        <Toaster />
      </form>
    );
  }

  if (seeForm) {
    return <InfoForm id={id.value} clearForm={clearForm} />;
  }

  return <div> Cargando....</div>;
}

/**
 * Renders a form for editing vehicle information.
 *
 * @param {Object} props - The component props.
 * @param {number} props.id - The id of the vehicle to edit.
 * @param {function} props.clearForm - A function to clear the form.
 * @returns {JSX.Element} The rendered form for editing a vehicle.
 */
const InfoForm = ({ id, clearForm }) => {
  const [dataVehiculo, setDataVehiculo] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const marca = useField({ type: "text" });
  const linea = useField({ type: "text" });
  const tipo = useField({ type: "text" });
  const precio = useField({ type: "number" });

  useEffect(() => {
    const getVehiculoData = async () => {
      try {
        const response = await getVehiculo(id, token);
        setDataVehiculo(response);
        marca.onChange({ target: { value: response.marca } });
        linea.onChange({ target: { value: response.linea } });
        tipo.onChange({ target: { value: response.tipo } });
        precio.onChange({ target: { value: response.precio } });
      } catch (error) {
        toast.error(error.message); // Muestra el mensaje de error en la interfaz de usuario
      } finally {
        setLoading(false);
      }
    };
    getVehiculoData();
  }, [id, token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const vehiculo = {
      id: id,
      marca: marca.value,
      linea: linea.value,
      tipo: tipo.value,
      precio: precio.value,
    };
    try {
      await updateVehiculo(vehiculo, token);
      toast.success("Vehiculo actualizado con exito, Redirigiendo...");
      setTimeout(() => {
        clearForm();
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="mt-10 dark:text-white overflow-auto">
      {loading ? (
        <div>Cargando...</div>
      ) : dataVehiculo ? (
        <div className="mt-10overflow-auto px-6">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/3 p-2 " onSubmit={onSubmit}>
              <label
                htmlFor="marca"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Marca
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    {...marca}
                    id="marca"
                    autoComplete="marca"
                    required
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <label
                htmlFor="linea"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Linea
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300 sm:max-w-md">
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

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <label
                htmlFor="tipo"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Tipo
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300 sm:max-w-md">
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

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <label
                htmlFor="precio"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Precio
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    {...precio}
                    id="precio"
                    autoComplete="precio"
                    required
                    min="1"
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <button
                className=" mb-5 p-2 bg-lime-600 rounded mt-5"
                onClick={onSubmit}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center dark:text-white">
          No se encontró el vehículo
          <div>
            <button
              className="mb-5 mt-5 p-2 bg-lime-600 rounded"
              onClick={clearForm}
            >
              Volver a la búsqueda por ID
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};
