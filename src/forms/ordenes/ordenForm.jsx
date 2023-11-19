import React from "react";
import { createOrden } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { Wrench } from "@heroicons/react/24/outline";

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
export default function OrdenForm() {
  const { token } = useSelector((state) => state.auth);

  const fecha_creacion = useField({ type: "date" });
  const fecha_finalizacion = useField({ type: "date" });
  const tipo = useField({ type: "text" });
  const placa = useField({ type: "number" });
  const valor_mano_obra = useField({ type: "number" });
  const valor_total = useField({ type: "number" });
  const estado = useField({ type: "text" });
  const id_cliente = useField({ type: "number" });
  const id_sucursal = useField({ type: "number" });
  const id_vendedor = useField({ type: "number" });

  const orden = {
    fecha_creacion: fecha_creacion.value,
    fecha_finalizacion: fecha_finalizacion.value,
    tipo: tipo.value,
    placa: placa.value,
    valor_mano_obra: valor_mano_obra.value,
    valor_total: valor_total.value,
    estado: estado.value,
    id_cliente: id_cliente.value,
    id_sucursal: id_sucursal.value,
    id_vendedor: id_vendedor.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createOrden(orden, token);
      console.log(response);
      toast.success("Vehiculo creado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const clearForm = () => {
    fecha_creacion.onChange({ target: { value: "" } });
    fecha_finalizacion.onChange({ target: { value: "" } });
    tipo.onChange({ target: { value: "" } });
    placa.onChange({ target: { value: "" } });
    valor_mano_obra.onChange({ target: { value: "" } });
    valor_total.onChange({ target: { value: "" } });
    estado.onChange({ target: { value: "" } });
    id_cliente.onChange({ target: { value: "" } });
    id_sucursal.onChange({ target: { value: "" } });
    id_vendedor.onChange({ target: { value: "" } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-t border-b border-gray-900/10 flex items-center justify-center pt-10 pl-7 pr-7 pb-5">
      <Wrench
          className="h-10 w-10 mr-2 text-blue-500"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold dark:text-white">
          ORDENES DE TRABAJO
        </h1>
      </div>

      <div className="mt-10 sm:grid-cols-6">
        <label
          htmlFor="marca"
          className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
        >
          Fecha de creacion
        </label>
        <div className="mt-2">
          <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
            <input
              {...fecha_creacion}
              id="fecha_creacion"
              autoComplete="fecha_creacion"
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
              Fecha finalizacion
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                <input
                  {...fecha_finalizacion}
                  id="fecha_finalizacion"
                  autoComplete="fecha_finalizacion"
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
                  <input
                    {...tipo}
                    id="tipo"
                    autoComplete="tipo"
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
                  placa
                </label>
                <div className="mt-2">
                  <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      {...placa}
                      id="placa"
                      autoComplete="placa"
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
                    Valor mano de obra
                  </label>
                  <div className="mt-2">
                    <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                      <input
                        {...valor_mano_obra}
                        id="valor_mano_obra"
                        autoComplete="valor_mano_obra"
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
                      Valor total
                    </label>
                    <div className="mt-2">
                      <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                        <input
                          {...valor_total}
                          id="valor_total"
                          autoComplete="valor_total"
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
                        Estado
                      </label>
                      <div className="mt-2">
                        <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                          <input
                            {...estado}
                            id="estado"
                            autoComplete="estado"
                            required
                            className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
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
