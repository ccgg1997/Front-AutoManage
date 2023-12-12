import React, { useEffect, useState } from "react";
import { createOrden, getSucursales } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import ModalPieza from "./ordenPiezaForm";
import { Modal, Typography } from "@mui/material";
import { Description } from "@mui/icons-material";

const useField = ({ type, placeholder, defect }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange, defect };
};

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
  const description = useField({ type: "text" });

  const [valorTotalPiezas, setTotalPiezas] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [ordenPiezas, setOrdenPiezas] = React.useState([]);
  const [sucursales, setSucursales] = React.useState([]);
  const [idOrden, setIdOrden] = React.useState({});
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);
  const valor_mano_obra_parser = parseFloat(valor_mano_obra.value) || 0;
  const sumaTotal = valor_mano_obra_parser + valorTotalPiezas;

  const nextStep = () => currentStep < 2 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);
  const orden = {
    fecha_creacion: fecha_creacion.value,
    fecha_finalizacion: fecha_finalizacion.value,
    valor_mano_obra: valor_mano_obra.value,
    valor_total: sumaTotal,
    tipo: tipo.value,
    placa: placa.value,
    estado: estado.value,
    cliente_id: id_cliente.value,
    sucursal_id: id_sucursal.value,
    vendedor_id: id_vendedor.value,
    description: description.value,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
    description.onChange({ target: { value: "" } });
    setCurrentStep(0);
  };

  const obtenerSucursales = async () => {
    try {
      const data = await getSucursales(token);
      setSucursales(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    id_vendedor.onChange({ target: { value: id } });
    obtenerSucursales();
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-3 gap-4 p-6">
            <label
              htmlFor="fecha_creacion"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Fecha de creación
            </label>
            <input
              {...fecha_creacion}
              id="fecha_creacion"
              autoComplete="fecha_creacion"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />

            <label
              htmlFor="fecha_finalizacion"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Fecha finalización
            </label>
            <input
              {...fecha_finalizacion}
              id="fecha_finalizacion"
              autoComplete="fecha_finalizacion"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />

            <label
              htmlFor="tipo"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Tipo
            </label>
            <select
              {...tipo}
              id="tipo"
              autoComplete="tipo"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Procedimiento con repuestos">
                Procedimiento con repuestos
              </option>
              <option value="Procedimiento sin repuestos">
                Procedimiento sin repuestos
              </option>
              <option value="Solo repuestos">Solo repuestos</option>
            </select>
            <label
              htmlFor="placa"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Descripción
            </label>
            <input
              {...description}
              id="description"
              autoComplete="description"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-3 gap-4 p-6">
            <label
              htmlFor="placa"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Placa
            </label>
            <input
              {...placa}
              id="placa"
              autoComplete="placa"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />

            <label
              htmlFor="valor_mano_obra"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Valor mano de obra
            </label>
            <input
              {...valor_mano_obra}
              id="valor_mano_obra"
              autoComplete="valor_mano_obra"
              required
              min="0"
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />

            <label
              htmlFor="valor_total"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Valor total
            </label>
            <input
              {...valor_total}
              id="valor_total"
              autoComplete="valor_total"
              required
              value={sumaTotal}
              readOnly
              min="0"
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />
          </div>
        );

      // Caso 2
      case 2:
        return (
          <div className="grid grid-cols-3 gap-4 p-6">
            <label
              htmlFor="estado"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Estado
            </label>
            <select
              {...estado}
              id="estado"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            >
              <option value="" disabled>
                Seleccione un valor
              </option>
              <option value="Finalizado">Finalizado</option>
              <option value="En Proceso">En Proceso</option>
            </select>

            <label
              htmlFor="id_cliente"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Id cliente
            </label>
            <input
              {...id_cliente}
              id="id_cliente"
              autoComplete="id_cliente"
              required
              min="0"
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            />

            <label
              htmlFor="id_sucursal"
              className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Sucursal
            </label>
            <select
              {...id_sucursal}
              id="id_sucursal"
              required
              className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
            >
              <option value="">Seleccione una sucursal</option>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mt-4 flex flex-col gap-3 md:flex-row ">
        <div className="w-full flex flex-col justify-around content-center sm:w-1/2 rounded-xl border-2 border-black dark:border-white">
          <h2 className="mb-5 text-base font-semibold leading-7 text-gray-900 dark:text-slate-300 sm:text-3xl sm:truncate">
            Crear órden de trabajo
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col content-center justify-center"
          >
            {renderStep()}
            <div className="flex justify-between mt-4 p-4">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-orange-500 text-white rounded-md p-2"
                >
                  Anterior
                </button>
              )}
              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 text-white rounded-md p-2"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-md p-2"
                >
                  Enviar
                </button>
              )}
            </div>
            <p>Paso {currentStep + 1} de 3</p>
          </form>
        </div>
        <div className="w-full sm:w-1/2 rounded-xl border-2 border-black dark:border-white overflow-y-auto">
          <h2 className="mt-5 mb-5 text-base font-semibold leading-7 text-gray-900 dark:text-slate-300 sm:text-3xl sm:truncate">
            Orden de trabajo
          </h2>
          <div className="grid grid-cols-2 gap-4 p-6">
            {Object.keys(orden).map((key) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="col-span-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  value={orden[key]}
                  readOnly
                  className="col-span-2 dark:bg-sky-950 dark:border-white text-center w-full border-0 bg-slate-300 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Modal and Toaster components here */}
        <Modal open={openFirstModal} onClose={() => setOpenFirstModal(false)}>
          <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white dark:bg-slate-950 rounded-lg p-8 mb-5 sm:max-w-md ">
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                className="text-xl dark:text-slate-300 mb-4"
              >
                ¿ Desea agregar o modificar piezas a la orden ?
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
                    toast.success("Piezas agregadas con exito");
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Modal>
        {openSecondModal && (
          <>
            <ModalPieza
              open={open}
              setOpen={setOpen}
              setOrdenPiezas={setOrdenPiezas}
              idOrden={idOrden}
            />
          </>
        )}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                background: "red",
                color: "white",
              },
            },
          }}
        />
      </div>
    </>
  );
}
