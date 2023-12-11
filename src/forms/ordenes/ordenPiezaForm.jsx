import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import {
  createOrdenPieza,
  getPiezas,
  getOrdenPiezaById,
  deleteOrdenPieza,
} from "../../components/api/adress";
import { Modal } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { XCircleIcon } from "@heroicons/react/24/outline";
const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

const ModalPieza = ({ open, setOpen, setOrdenPiezas, idOrden, setValorTotalPiezas = () => {} }) => {
  const { token } = useSelector((state) => state.auth);
  const [piezas, setPiezas] = React.useState([]);
  const [piezasOrden, setPiezasOrden] = React.useState([]);
  const [pieza, setPieza] = React.useState({});
  const [formActive, setFormActive] = React.useState(false);
  const [ordenModificada, setOrdenModificada] = React.useState(false);
  const [valorTotal, setValorTotal] = React.useState(0);
  const [piezasAgregadasActive, setPiezasAgregadasActive] =
    React.useState(false);

  const nombre = useField({
    type: "select",
  });

  const precio = useField({
    type: "number",
  });

  const cantidad = useField({
    type: "number",
  });

  const obtenerPiezas = async () => {
    try {
      const piezas = await getPiezas(token);
      setPiezas(piezas);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const piezaToOrden = {
    orden: idOrden,
    pieza: pieza.id_pieza,
    precio: pieza.precio,
    cantidad: pieza.cantidad,
    valor_total: pieza.precio* pieza.cantidad,
  };

  const generarValorTotal = () => {
    let valorTotal = 0;
    piezasOrden.forEach((pieza,index) => {
      console.log("probnado las piezas" + index)
      console.log(pieza.precio);
      console.log(pieza.cantidad);
      const precioParseado = parseInt(pieza.precio);
      const cantidadParseada = infoPieza(pieza.cantidad);
      valorTotal += precioParseado * cantidadParseada;
    });
    console.log("valor total" + valorTotal);
    setValorTotal(valorTotal);
    setValorTotalPiezas(valorTotal);
  };

  const onClickDelete = async (id) => {
    try {
      await deleteOrdenPieza(id, token);
      toast.success("Pieza eliminada con exito");
      obtenerPiezas();
      setOrdenPiezas(piezasOrden);
      setOrdenModificada(!ordenModificada);
      obtenerPiezas();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrdenPieza(piezaToOrden, token);
      toast.success("Pieza agregada con exito");
      setOrdenPiezas(piezasOrden);
      setFormActive(false);
      setOpen(false);
      clearForm();
      setPiezasAgregadasActive(true);
      setOrdenModificada(!ordenModificada);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const onClickCancelar = () => {
    setFormActive(false);
    setPiezasAgregadasActive(true);
  };

  const clearForm = () => {
    setPieza({});
  };

  useEffect(() => {
    obtenerPiezas();
  }, []);

  useEffect(() => {
    const piezaSeleccionada = infoPieza(nombre.value);
    setPieza({
      ...pieza,
      id_orden: idOrden,
      id_pieza: piezaSeleccionada ? piezaSeleccionada.id : "",
      precio: piezaSeleccionada ? parseInt(piezaSeleccionada.precio) : "",
      cantidad: parseInt(cantidad.value, 10),
    });

    precio.onChange({
      target: { value: piezaSeleccionada ? piezaSeleccionada.precio : "" },
    });

    generarValorTotal();
  }, [nombre.value, piezas, cantidad.value]);

  const infoPieza = (id) => {
    const piezaSeleccionada = piezas.find((p) => p.id === parseInt(id, 10));
    return piezaSeleccionada;
  };

  useEffect(() => {
    const obtenerPiezasOrden = async () => {
      try {
        const piezas = await getOrdenPiezaById(idOrden, token);
        if (piezas.length > 0) {
          setPiezasAgregadasActive(true);
          setFormActive(false);
          setPiezasOrden(piezas);
        } else {
          setPiezasAgregadasActive(false);
          setFormActive(true);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };
    obtenerPiezasOrden();
  }, [idOrden, ordenModificada]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="flex justify-center items-center min-h-screen">
        {piezasAgregadasActive && (
          <div className="bg-white dark:bg-slate-950 rounded-lg p-8 mb-5">
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              className="text-xl dark:text-slate-300 mb-4"
            >
              Piezas agregadas
            </Typography>
            {piezasOrden.map((pieza) => (
              <div className="flex justify-between mb-2 mt-4" key={pieza.id}>
                <Typography
                  id="modal-modal-title"
                  variant="h9"
                  component="h2"
                  className="text-xl mb-5 dark:text-slate-300 "
                >
                  {infoPieza(pieza.pieza).nombre}
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-xl mb-5 dark:text-slate-300"
                >
                  {pieza.cantidad}
                </Typography>
                <XCircleIcon
                  className="h-7 w-7 text-red-600 hover:text-red-900 cursor-pointer"
                  onClick={() => {
                    onClickDelete(pieza.id);
                  }}
                />
              </div>
            ))}
            <button
              className="bg-lime-600 text-white rounded-md p-2 mt-4"
              onClick={() => {
                setFormActive(true);
                setPiezasAgregadasActive(false);
              }}
            >
              Agregar pieza
            </button>
            <button
              className="bg-red-600 text-white rounded-md p-2 ml-2"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        )}
        {formActive && (
          <form onSubmit={handleSubmit}>
            <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-xl mb-5 dark:text-slate-300"
              >
                Nombre
              </Typography>
              <select
                {...nombre}
                id="nombre"
                className="border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Seleccione una pieza</option>
                {piezas.map((pieza) => (
                  <option key={pieza.id} value={pieza.id}>
                    {pieza.nombre}
                  </option>
                ))}
              </select>
              <div className="mb-5 mt-5">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-xl mb-5 dark:text-slate-300"
                >
                  Precio
                </Typography>
                <input
                  {...precio}
                  id="precio"
                  className="border border-gray-300 rounded-md p-2"
                  disabled
                  required
                  min="1"
                />
              </div>
              <div className="flex flex-col mb-5">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="text-xl mb-5 dark:text-slate-300"
                >
                  Cantidad
                </Typography>
                <input
                  {...cantidad}
                  id="cantidad"
                  className="border border-gray-300 rounded-md p-2"
                  required
                  min="1"
                />
              </div>
              <button className="bg-lime-600 text-white rounded-md p-2">
                Agregar
              </button>
              <button
                className="bg-red-600 text-white rounded-md p-2 ml-2"
                onClick={onClickCancelar}
              >
                Cancelar
              </button>
            </Box>
          </form>
        )}
        <Toaster />
      </div>
    </Modal>
  );
};

export default ModalPieza;
