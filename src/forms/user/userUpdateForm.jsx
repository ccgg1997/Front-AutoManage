import React from "react";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { Modal, Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

export default function UserUpdate() {
  const { token } = useSelector((state) => state.auth);
  const [openNombreModal, setOpenNombreModal] = useState(false);
  const [openCorreoModal, setOpenCorreoModal] = useState(false);
  const [openContrasenaModal, setOpenContrasenaModal] = useState(false);

  const nombre = useField({ type: "text" });
  const correo = useField({ type: "email" });
  const contrasenaAnterior = useField({ type: "password" });
  const contrasena = useField({ type: "password" });
  const confirmarContrasena = useField({ type: "password" });

  const user = {
    nombre: nombre.value,
    correo: correo.value,
    contrasena: contrasena.value,
  };

  const clearForm = () => {
    nombre.onChange({ target: { value: "" } });
    correo.onChange({ target: { value: "" } });
    contrasena.onChange({ target: { value: "" } });
    contrasenaAnterior.onChange({ target: { value: "" } });
    confirmarContrasena.onChange({ target: { value: "" } });
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen py-12 bg-gray-50 dark:bg-slate-950 sm:px-6 lg:px-8">
      <ul className=" w-1/2 mx-auto ">
        <div className="border-b border-gray-900/10 pb-12">
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
                <button
                  onClick={() => setOpenNombreModal(true)}
                  className="display flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                >
                  Editar
                </button>
                <ModalName
                  openNombreModal={openNombreModal}
                  setOpenNombreModal={setOpenNombreModal}
                  nombre={nombre}
                />
              </div>
            </label>
          </li>

          <li className="mt-4 sm:col-span-4">
            <label
              htmlFor="correo"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Correo electronico: {correo.value}
              <div className="mt-2 mx-auto block rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md dark:text-slate-300">
                <button
                  onClick={() => setOpenCorreoModal(true)}
                  className="display flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                >
                  Editar
                </button>
                <ModalCorreo
                  openCorreoModal={openCorreoModal}
                  setOpenCorreoModal={setOpenCorreoModal}
                  correo={correo}
                />
              </div>
            </label>
          </li>

          <li className="mt-4 sm:col-span-4">
            <label
              htmlFor="contrasena"
              className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              contraseña: ********
              <div className="mt-2 mx-auto flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                <button
                  onClick={() => setOpenContrasenaModal(true)}
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                >
                  Editar
                </button>
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
 * Modal correspondiente al cambio de nombre de usuario
 * @param {*} param0
 * @returns
 */
const ModalName = ({ openNombreModal, setOpenNombreModal, nombre }) => {
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      //const response = await updateVehiculo(vehiculo, token);
      //console.log(response);
      toast.success("Informacion actualizada con exito");
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
            <button
              onClick={() => setOpenNombreModal(false)}
              className="mb-5 p-2 bg-lime-600 rounded mr-4"
            >
              Cancel
            </button>
            <button className="mb-5 p-2 bg-lime-600 rounded">Submit</button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};

/**
 * Modal correspondiente al cambio de correo electronico
 * @param {*} param0
 * @returns
 */
const ModalCorreo = ({ openCorreoModal, setOpenCorreoModal, correo }) => {
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      //const response = await updateVehiculo(vehiculo, token);
      //console.log(response);
      toast.success("Informacion actualizada con exito");
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
            <button
              onClick={() => setOpenCorreoModal(false)}
              className="mb-5 p-2 bg-lime-600 rounded mr-4"
            >
              Cancel
            </button>
            <button className="mb-5 p-2 bg-lime-600 rounded">Submit</button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};

/**
 * Modal correspondiente al cambio de contraseña
 * @param {*} param0
 * @returns
 */
const ModalContrasena = ({ openContrasenaModal, setOpenContrasenaModal,contrasenaAnterior,contrasena, confirmarContrasena,clearForm }) => {
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      if(verifyPasswords()){
      toast.success("Informacion actualizada con exito");
      clearForm();
      }else{
        toast.error("Las contraseñas no coinciden");
        clearForm();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const verifyPasswords = () => {
    if (contrasena.value === confirmarContrasena.value) {
      return true;
    } else {
      return false;
    }
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
            <button
              onClick={() => setOpenContrasenaModal(false)}
              className="mb-5 p-2 bg-lime-600 rounded "
            >
              Cancel
            </button>
            <button className="mb-5 p-2 bg-lime-600 rounded" type="submit">
              Submit
            </button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};
