import React, { useEffect, useState } from "react";
import { getUsuarioById } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { updateUsers } from "../../components/api/adress";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};



/**
 * Renders a form for editing vehicle information.
 *
 * @param {Object} props - The component props.
 * @param {number} props.id - The id of the vehicle to edit.
 * @param {function} props.clearForm - A function to clear the form.
 * @returns {JSX.Element} The rendered form for editing a vehicle.
 */

export default function UsuariosUpdateForm({ id, clearForm }) {
  const [dataUsuario, setDataUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const nombre = useField({ type: "text" });
  const apellido = useField({ type: "text" });
  const identificacion = useField({ type: "number" });
  const email = useField({ type: "email" });
  const sucursal = useField({ type: "text" });
  const [password, setPassword] = useState("");
  const [rol_id, setRolId] = useState("");


  useEffect(() => {
    const getUsuarioData = async () => {
      try {
        const response = await getUsuarioById(id, token);
        setDataUsuario(response);
        nombre.onChange({ target: { value: response.nombre } });
        apellido.onChange({ target: { value: response.apellido } });
        identificacion.onChange({ target: { value: response.identificacion } });
        email.onChange({ target: { value: response.email } });
        sucursal.onChange({ target: { value: response.sucursal } });
        setRolId(response.rol.id)
      } catch (error) {
        toast.error(error.message); // Muestra el mensaje de error en la interfaz de usuario
      } finally {
        setLoading(false);
      }
    };
    getUsuarioData();
  }, [id, token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      id: id,
      nombre: nombre.value,
      apellido: apellido.value,
      identificacion: identificacion.value,
      email: email.value,
      rol_id: rol_id,
      sucursal_id: sucursal.value.id
    };
    try {
      await updateUsers(user, token);
      toast.success("Usuario actualizado con exito, Redirigiendo...");
      setTimeout(() => {
        clearForm();
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="mt-10 dark:text-white overflow-auto">
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="mt-10 sm:grid-cols-6 mx-auto">
            <div className="mx-auto ">
              <label
                htmlFor="nombre"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Nombre
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <input
                    {...nombre}
                    id="nombre"
                    autoComplete="nombre"
                    required
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6  dark:text-white "
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6">
              <label
                htmlFor="linea"
                className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Apellido
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                  <input
                    {...apellido}
                    id="apellido"
                    autoComplete="apellido"
                    required
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6">
              <label
                htmlFor="identificacion"
                className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Identificacion
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <input
                    {...identificacion}
                    id="identificacion"
                    autoComplete="identificacion"
                    required
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <input
                    {...email}
                    id="email"
                    autoComplete="email "
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Ingrese un correo electrónico válido"
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>


            <div className="mx-auto mt-6">
              <button
                className=" mb-5 p-2 bg-lime-600 rounded mt-5"
                onClick={onSubmit}
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      )}
      <Toaster />
    </div>
  );
};