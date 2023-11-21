import React, { useEffect } from "react";
import { createOrden } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import ModalPieza from "./ordenPiezaForm";
import { Modal, Typography } from "@mui/material";

const useField = ({ type, placeholder, defect }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange, defect };
};

/**
 * Renders a form for creating a vehicle.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export default function OrdenForm() {
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const fecha_creacion = useField({ type: "date" });
  const fecha_finalizacion = useField({ type: "date" });
  const tipo = useField({ type: "text" });
  const placa = useField({ type: "text" });
  const valor_mano_obra = useField({ type: "number" });
  const valor_total = useField({ type: "number" });
  const estado = useField({ type: "select", defect: "Finalizado" });
  const id_cliente = useField({ type: "number" });
  const id_sucursal = useField({ type: "number" });
  const id_vendedor = useField({ type: "number" });

  const [open, setOpen] = React.useState(false);
  const [ordenPiezas, setOrdenPiezas] = React.useState([]);
  const [idOrden, setIdOrden] = React.useState({});
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const orden = {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //comparamos si la fecha de creacion es mayor a la fecha de finalizacion
      if (orden.fecha_creacion > orden.fecha_finalizacion) {
        toast.error(
          "La fecha de creacion no puede ser mayor a la de finalizacion"
        );
        return;
      }
      const data = await createOrden(orden, token);
      toast.success("Orden creada con exito");
      setIdOrden(data.id);
      setOpenFirstModal(true);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const onClickOpen = () => {
    setOpenFirstModal(false);
    setOpenSecondModal(true);
    setOpen(true);
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

  useEffect(() => {
    id_vendedor.onChange({ target: { value: id } });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto border-t pt-12 border-b border-gray-900/10 pb-12">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
        >
          Creacion de ordenes de trabajo
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido a la seccion de creacion de ordenes de trabajo, por favor
          ingrese los datos solicitados para crear una orden de trabajo.
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
                        min="0"
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
                          min="0"
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
                                min="0"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openFirstModal} onClose={() => setOpenFirstModal(false)}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white dark:bg-slate-950 rounded-lg p-8 mb-5 sm:max-w-md ">
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              className="text-xl dark:text-slate-300 mb-4"
            >
              ¿ Desea agregar piezas a la orden ?
            </Typography>
            <div className="flex mb-2 justify-center mt-4">
            <button
              className="bg-lime-600 text-white rounded-md p-2  w-16"
              onClick={onClickOpen}
            >
              Si
            </button>
            <button
              className="bg-red-600 text-white rounded-md p-2 ml-2 w-16"
              onClick={() => {
                setOpenFirstModal(false);
                clearForm();
              }
              }
            >
              No
            </button>
            </div>
          </div>
        </div>
      </Modal>
      {openSecondModal && <ModalPieza
        open={open}
        setOpen={setOpen}
        setOrdenPiezas={setOrdenPiezas}
        idOrden={idOrden}
      />}
      <button className=" mb-5 mt-5 p-2 bg-lime-600 rounded " type="submit">
        Crear
      </button>
      <Toaster />
    </form>
  );
}
