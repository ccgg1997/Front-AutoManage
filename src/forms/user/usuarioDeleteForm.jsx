import React from "react";
import { deleteUsuario } from "../../components/api/adress";
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

export default function UsuarioDeleteForm() {
  /**
   * Renders a form for deleting a vehicle.
   *
   * @returns {JSX.Element} The delete vehicle form component.
   */
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const identificacion = useField({ type: "number" });

  const handleSubmit = async () => {
    const idUsuario = parseInt(identificacion.value);
    try {
      if (idUsuario === id) {
        toast.error("No puede eliminar su propio usuario");
        return;
      }
      await deleteUsuario(idUsuario, token);
      toast.success("Usuario eliminado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const clearForm = () => {
    identificacion.onChange({ target: { value: "" } });
  };

  return (
    <form onSubmit={openModal}>
      <div className="border-t pt-12 border-b border-gray-900/10 pb-12">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
        >
          Eliminación de usuarios
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido al portal de usuarios, Antes de eliminar un usuario tenga a
          la mano la identificación del usuario
        </p>
      </div>

      <div className="mt-10">
        <label
          htmlFor="marca"
          className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
        >
          Identificación del usuario
        </label>
        <div className="mt-2">
          <div className="mx-auto flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
            <input
              {...identificacion}
              id="identificacion"
              autoComplete="identificacion"
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

/**
 * Renders a modal dialog box with a confirmation message and two buttons: "Cancel" and "Eliminar" (Spanish for "Delete").
 *
 * @param {boolean} isOpen - Indicates whether the modal is open or closed.
 * @param {function} setIsOpen - A callback function to update the `isOpen` state.
 * @param {function} handleDelete - A callback function to handle the delete action.
 * @returns {JSX.Element} - The rendered modal dialog box.
 */
const SureModal = ({ isOpen, setIsOpen, handleDelete }) => {
  const handleClose = () => {
    setIsOpen(false);
    handleDelete();
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
    >
      <form onSubmit={handleClose}>
        <Box className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-10 sm:px-6">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-xl mb-3 sm:mb-5 dark:text-slate-300"
          >
            Eliminar usuario
          </Typography>
          <div className="mb-3 sm:mb-5 mt-3 sm:mt-5">
            <Typography className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300 whitespace-normal">
              Está seguro que desea eliminar el usuario?
            </Typography>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="mb-3 sm:mb-0 p-2 bg-red-600 rounded w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              className="mb-3 sm:mb-0 p-2 bg-lime-600 rounded w-full sm:w-auto"
              type="submit"
            >
              Eliminar
            </button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};
