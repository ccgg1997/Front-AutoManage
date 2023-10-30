import React from "react";
import { getVehiculo } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

export default function VehiculoForm() {
  const { token } = useSelector((state) => state.auth);

  const id = useField({ type: "number" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idVehiculo = id.value
    try {
      const response = await getVehiculo(idVehiculo, token);
      console.log(response);
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const clearForm = () => {
    id.onChange({ target: { value: "" } });
  };

  return (
    <form className=" w-1/2 mx-auto " onSubmit={handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
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
