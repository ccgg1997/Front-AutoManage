import React from "react";
import { deleteVehiculo } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { Modal, Box, Typography } from "@mui/material";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

export default function VehiculoDeleteForm() {
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const id = useField({ type: "number" });

  const handleSubmit = async () => {
    const idVehiculo = id.value
    try {
      await deleteVehiculo(idVehiculo, token);
      toast.success("Vehiculo eliminado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const clearForm = () => {
    id.onChange({ target: { value: "" } });
  };

  return (
    <form className=" w-1/2 mx-auto " onSubmit={openModal}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
        >
          Eliminación de vehiculos
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido al portal de vehiculos, Antes de eliminar un vehiculo tenga
          a la mano el id del vehiculo
        </p>
      </div>

      <div className="mt-10">
        <label
          htmlFor="marca"
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

      <SureModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleSubmit}
      />
      <button className=" mb-5 p-2 bg-lime-600 rounded mt-5" type="submit">
        Eliminar
      </button>
      <Toaster />
    </form>
  );
}

const SureModal = ({ isOpen, setIsOpen, handleDelete }) => {
  return (
    <Modal
      className="flex items-center justify-center"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
    >
      <form onSubmit={handleDelete}>
        <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-xl mb-5 dark:text-slate-300"
          >
            Eliminar Vehiculo
          </Typography>
          <div className="mb-5 mt-5">
            <Typography className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
              Está seguro que desea eliminar el vehiculo?
            </Typography>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-5 p-2 bg-lime-600 rounded "
            >
              Cancel
            </button>
            <button className="mb-5 p-2 bg-lime-600 rounded" type="submit">
              Eliminar
            </button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};
