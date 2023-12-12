import React from "react";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { Modal, Typography, Box } from "@mui/material";
import { useState } from "react";
import { userUpdate, userUpdatePassword } from "../../components/api/adress";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

/**
 * The `UserUpdate` function is a React component that allows users to update their personal information such as name, email, and password.
 * It uses Redux for state management and Material-UI for styling.
 * The function renders a form with input fields for each piece of information and handles the submission of the form to update the user's data.
 *
 * @example
 * ```javascript
 * <UserUpdate />
 * ```
 * This component can be used in a React application to provide a user interface for updating user information.
 *
 * @returns {JSX.Element} The rendered UserUpdate component.
 */
export default function UserUpdate() {
  const { usuario, name } = useSelector((state) => state.auth);
  const [openNombreModal, setOpenNombreModal] = useState(false);
  const [openCorreoModal, setOpenCorreoModal] = useState(false);
  const [openContrasenaModal, setOpenContrasenaModal] = useState(false);

  const nombre = useField({ type: "text" });
  const correo = useField({ type: "email" });
  const contrasenaAnterior = useField({ type: "password" });
  const contrasena = useField({ type: "password" });
  const confirmarContrasena = useField({ type: "password" });

  const clearForm = () => {
    nombre.onChange({ target: { value: "" } });
    correo.onChange({ target: { value: "" } });
    contrasena.onChange({ target: { value: "" } });
    contrasenaAnterior.onChange({ target: { value: "" } });
    confirmarContrasena.onChange({ target: { value: "" } });
  };

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        nombre.onChange({ target: { value: name } });
        correo.onChange({ target: { value: usuario } });
      } catch (error) {
        toast.error(error.message); // Muestra el mensaje de error en la interfaz de usuario
      }
    };
    getUserData();
  }, []);

  

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen py-12 bg-gray-50 dark:bg-slate-950 sm:px-6 lg:px-8">
      <ul className=" w-1/2 mx-auto ">
        <div className="border-b border-slate-900 dark:border-slate-50 pb-12">
          <h2
            className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
          >
            Actualizacion de datos
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
            Bienvenido al portal de configuracion de cuenta
          </p>
        </div>

        <div className="mt-10 mb-10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <li>
            <legend className="text-xl mb-5 dark:text-slate-300">
              Modificar informacion
            </legend>
            <label
              htmlFor="nombre"
              className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Nombre: {nombre.value}
              <div className="mt-3 mx-auto block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
                <div
                  onClick={() => setOpenNombreModal(true)}
                  className="display flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white cursor-pointer"
                >
                  Editar
                </div>
                <ModalName
                  openNombreModal={openNombreModal}
                  setOpenNombreModal={setOpenNombreModal}
                  nombre={nombre}
                />
              </div>
            </label>
          </li>

          <li className="mt-4 sm:col-span-4 border-t border-b border-slate-900 dark:border-slate-50 py-3">
            <label
              htmlFor="correo"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Correo electronico: {correo.value}
              <div className="mt-2 mx-auto block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
                <div
                  onClick={() => setOpenCorreoModal(true)}
                  className="display flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white cursor-pointer"
                >
                  Editar
                </div>
                <ModalCorreo
                  openCorreoModal={openCorreoModal}
                  setOpenCorreoModal={setOpenCorreoModal}
                  correo={correo}
                />
              </div>
            </label>
          </li>

          <li className="mt-4 sm:col-span-4 px-3  dark:border-slate-50 ">
            <label
              htmlFor="contrasena"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              contraseña: ********
              <div className="mt-2 mx-auto flex px-3 rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                <div
                  onClick={() => setOpenContrasenaModal(true)}
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 cursor-pointer dark:text-white"
                >
                  Editar
                </div>
                <ModalContrasena
                  openContrasenaModal={openContrasenaModal}
                  setOpenContrasenaModal={setOpenContrasenaModal}
                  contrasenaAnterior={contrasenaAnterior}
                  contrasena={contrasena}
                  confirmarContrasena={confirmarContrasena}
                  clearForm={clearForm}
                />
              </div>
            </label>
          </li>
        </div>
        <Toaster />
      </ul>
    </section>
  );
}

/**
 * Renders a modal for changing the user's name.
 *
 * @param {boolean} openNombreModal - Controls the visibility of the modal.
 * @param {function} setOpenNombreModal - Updates the value of openNombreModal.
 * @param {object} nombre - Contains the current name value and an onChange function to update it.
 * @returns {JSX.Element} - Modal dialog for changing the user's name.
 */
const ModalName = ({ openNombreModal, setOpenNombreModal, nombre }) => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const user = {
    nombre: nombre.value,
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      if (nombre.value !== "") {
        await userUpdate(id, user, token);
        toast.success("Informacion actualizada con exito");
        setOpenNombreModal(false);
      } else {
        toast.error("introduzca un nombre valido");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={openNombreModal}
      onClose={() => setOpenNombreModal(false)}
      aria-labelledby="modal-modal-title"
    >
      <form onSubmit={handleOnClick}>
        <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-xl mb-5 dark:text-slate-300"
          >
            Cambiar Nombre
          </Typography>
          <div className="mb-5 mt-5">
            <input
              {...nombre}
              id="nombre"
              autoComplete="nombre"
              required
              placeholder="Nuevo nombre"
              className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white"
            />
          </div>
          <div className="flex justify-between">
            <button className="mb-5 p-2 bg-blue-500 hover:bg-blue-700 rounded mr-7">Actualizar</button>
            <button
              onClick={() => setOpenNombreModal(false)}
              className="mb-5 p-2 bg-red-500 hover:bg-red-700 rounded"
            >
              Cancelar
            </button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};

/**
 * Renders a modal dialog for changing the email address and handles the form submission.
 *
 * @param {boolean} openCorreoModal - Determines whether the modal is open or closed.
 * @param {function} setOpenCorreoModal - Updates the value of openCorreoModal.
 * @param {object} correo - Contains the current email address value and an onChange function to update it.
 *
 * @returns {JSX.Element} The rendered modal dialog.
 */
const ModalCorreo = ({ openCorreoModal, setOpenCorreoModal, correo }) => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.auth);
  const user = {
    email: correo.value,
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      if (correo.value !== "") {
        await userUpdate(id, user, token);
        toast.success("Informacion actualizada con exito");
        setOpenCorreoModal(false);
      } else {
        toast.error("introduzca un correo valido");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={openCorreoModal}
      onClose={() => setOpenCorreoModal(false)}
      aria-labelledby="modal-modal-title"
    >
      <form onSubmit={handleOnClick}>
        <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-xl mb-5 dark:text-slate-300"
          >
            Cambiar Correo electronico
          </Typography>
          <div className="mb-5 mt-5">
            <input
              {...correo}
              id="correo"
              autoComplete="correo"
              required
              placeholder="Nuevo correo"
              className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white"
            />
          </div>
          <div className="flex justify-between">
            <button className="mb-5 p-2 bg-blue-500  hover:bg-blue-700 rounded ">Actualizar</button>
            <button
              onClick={() => setOpenCorreoModal(false)}
              className="mb-5 p-2  bg-red-500 hover:bg-red-700 rounded "
            >
              Cancelar
            </button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};

/**
 * Displays a modal for changing the user's password.
 *
 * @param {boolean} openContrasenaModal - Controls the visibility of the modal.
 * @param {function} setOpenContrasenaModal - Updates the value of openContrasenaModal.
 * @param {object} contrasenaAnterior - Contains the input field value and onChange function for the previous password.
 * @param {object} contrasena - Contains the input field value and onChange function for the new password.
 * @param {object} confirmarContrasena - Contains the input field value and onChange function for confirming the new password.
 * @param {function} clearForm - Clears the values of all input fields.
 */
const ModalContrasena = ({
  openContrasenaModal,
  setOpenContrasenaModal,
  contrasenaAnterior,
  contrasena,
  confirmarContrasena,
  clearForm,
}) => {
  const { token } = useSelector((state) => state.auth);
  const user = {
    old_password: contrasenaAnterior.value,
    new_password: contrasena.value,
  };

  const differentPasswords = () => {
    if (contrasenaAnterior.value !== confirmarContrasena.value) {
      return true;
    } else {
      return false;
    }
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      if (verifyPasswords()) {
        if (differentPasswords()) {
          if (!validarContrasenaSegura(contrasena.value)) {
            toast.error(
              "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una minuscula y un numero"
            );
            clearForm();
            return;
          } else {
          await userUpdatePassword(user, token);
          toast.success("Informacion actualizada con exito");
          clearForm();
          setOpenContrasenaModal(false);
          }
        } else {
          toast.error("La contraseña anterior no puede ser igual a la nueva");
          clearForm();
        }
      } else {
        toast.error("Las contraseñas no coinciden");
        clearForm();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyPasswords = () => {
    if (contrasena.value === confirmarContrasena.value) {
      return true;
    } else {
      return false;
    }
  };

  const validarContrasenaSegura = (contrasena) => {
    //Valida que la contraseña tenga al menos 8 caracteres, una letra mayuscula, una minuscula y un numero
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(contrasena);
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={openContrasenaModal}
      onClose={() => setOpenContrasenaModal(false)}
      aria-labelledby="modal-modal-title"
    >
      <form onSubmit={handleOnClick}>
        <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-xl mb-5 dark:text-slate-300"
          >
            Cambiar Contraseña
          </Typography>
          <div className="mb-5 mt-5">
            <Typography className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
              Contraseña anterior:
            </Typography>
            <input
              {...contrasenaAnterior}
              id="contrasenaAnterior"
              required
              autoFocus
              className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
            />
            <Typography className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
              Nueva contraseña:
            </Typography>
            <input
              {...contrasena}
              id="contrasena"
              required
              className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
            />
            <Typography className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
              Confirmar contraseña:
            </Typography>
            <input
              {...confirmarContrasena}
              id="contrasenaConfirm"
              required
              className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
            />
          </div>
          <div className="flex justify-between">
            <button className="mb-5 p-2 bg-blue-500 hover:bg-blue-700 rounded" type="submit">
              Actualizar
            </button>
            <button
              onClick={() => setOpenContrasenaModal(false)}
              className="mb-5 p-2 bg-red-500 hover:bg-red-700 rounded "
            >
              Cancelar
            </button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};
