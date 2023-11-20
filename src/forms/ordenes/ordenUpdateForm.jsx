import React, { useEffect } from "react";
import { getOneOrden,updateOrden } from "../../components/api/adress";
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
export default function OrdenUpdateForm({ordenData}) {
  const { token } = useSelector((state) => state.auth);

  //formato de fechas a yyyy-mm-dd
  const fecha_creacion_formateada = ordenData.fecha_creacion.slice(0, 10);
  const fecha_finalizacion_formateada = ordenData.fecha_finalizacion.slice(0,10);

  const fecha_creacion = useField({ type: "date" });
  const fecha_finalizacion = useField({ type: "date" });
  const tipo = useField({ type: "text" });
  const placa = useField({ type: "text" });
  const valor_mano_obra = useField({ type: "number" });
  const valor_total = useField({ type: "number" });
  const estado = useField({ type: "text" });
  const id_cliente = useField({ type: "number" });
  const id_sucursal = useField({ type: "number" });
  const id_vendedor = useField({ type: "number" });

  const orden = {
    id: ordenData.id,
    fecha_creacion: fecha_creacion.value,
    fecha_finalizacion: fecha_finalizacion.value,
    tipo: tipo.value,
    placa: placa.value,
    valor_mano_obra: valor_mano_obra.value,
    valor_total: valor_total.value,
    estado: estado.value,
    cliente: id_cliente.value,
    sucursal: id_sucursal.value,
    vendedor: id_vendedor.value,
  };


  useEffect(() => {
    fecha_creacion.onChange({ target: { value: fecha_creacion_formateada } });
    fecha_finalizacion.onChange({
      target: { value: fecha_finalizacion_formateada },
    });
    tipo.onChange({ target: { value: ordenData.tipo } });
    placa.onChange({ target: { value: ordenData.placa } });
    valor_mano_obra.onChange({
      target: { value: ordenData.valor_mano_obra },
    });
    valor_total.onChange({ target: { value: ordenData.valor_total } });
    estado.onChange({ target: { value: ordenData.estado } });
    id_cliente.onChange({ target: { value: ordenData.cliente } });
    id_sucursal.onChange({ target: { value: ordenData.sucursal } });
    id_vendedor.onChange({ target: { value: ordenData.vendedor } });

  }, [ordenData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrden(orden, token);
      toast.success("Vehiculo actualizado con exito");
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
      <div className="mx-auto border-t pt-12 border-b border-gray-900/10 pb-12">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
        >
          Modificacion de ordenes de trabajo
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido a la seccion de modificacion de ordenes de trabajo, por favor
          ingrese los datos solicitados para modificar una orden de trabajo.
        </p>
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
                        <select
                            {...estado}

                            id="estado"
                            required
                            className="dark:bg-sky-950 dark:border-white text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                          >
                          <option value="Finalizado">Finalizado</option>
                          <option value="Cancelado">Cancelado</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-10 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="precio"
                            className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                          >
                            Id cliente
                          </label>
                          <div className="mt-2">
                            <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                              <input
                                {...id_cliente}
                                id="id_cliente"
                                autoComplete="id_cliente"
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
                              Id sucursal
                            </label>
                            <div className="mt-2">
                              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                                <input
                                  {...id_sucursal}
                                  id="id_sucursal"
                                  autoComplete="id_sucursal"
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
          </div>
        </div>
      </div>

      <button className=" mb-5 mt-5 p-2 bg-lime-600 rounded " type="submit">
        Actualizar
      </button>
      <Toaster />
    </form>
  );
}
