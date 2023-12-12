import React from "react";
import { deleteUsuario } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { Modal, Box, Typography } from "@mui/material";

export default function UsuarioDeleteForm({ targetId, clearForm }) {
  /**
   * Renders a form for deleting a vehicle.
   *
   * @returns {JSX.Element} The delete vehicle form component.
   */
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (targetId === id) {
        toast.error("No puede eliminar su propio usuario");
        return;
      }
      await deleteUsuario(targetId, token);
      toast.success("Usuario eliminado con exito");
      setTimeout(() => {
        clearForm();
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="border-t pt-12 border-b border-gray-900/10 pb-12">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
      dark:text-slate-300 sm:text-3xl sm:truncate
      "
        >
          Deshabilitación de usuarios
        </h2>
        <h4>
          ¿Está seguro de deshabilitar el usuario?
        </h4>
      </div>
      <button
        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded "
        type="submit"
      >
        Deshabilitar
      </button>
      <button
        className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded "
        type="button"
        onClick={() => clearForm()}
      >
        Cancelar
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
