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

export default function UsuariosUpdateForm() {
  /**
   * Renders a form for editing a vehicle.
   *
   * @returns {JSX.Element} The rendered form for editing a vehicle.
   */
  const [seeForm, setSeeForm] = useState(false);
  const [seeIdForm, setSeeIdForm] = useState(true);

  const id = useField({ type: "number" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSeeForm(true);
    setSeeIdForm(false);
  };

  const clearForm = () => {
    id.onChange({ target: { value: "" } });
    setSeeForm(false);
    setSeeIdForm(true);
  };

  if (seeIdForm) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="border-t pt-12 border-b border-gray-900/10 pb-12">
          <h2
            className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
          >
            Editar un usuario
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
            Bienvenido al portal de usuarios, antes de editar un usuario tenga
            a la mano el id del usuario
          </p>
        </div>
        <div className="mt-10">
          <label
            htmlFor="id"
            className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
          >
            Id del usuario
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

        <button className=" mb-5 p-2 bg-lime-600 rounded mt-5" type="submit">
          Editar
        </button>
        <Toaster />
      </form>
    );
  }

  if (seeForm) {
    return <InfoForm id={id.value} clearForm={clearForm} />;
  }

  return <div> Cargando....</div>;
}

/**
 * Renders a form for editing vehicle information.
 *
 * @param {Object} props - The component props.
 * @param {number} props.id - The id of the vehicle to edit.
 * @param {function} props.clearForm - A function to clear the form.
 * @returns {JSX.Element} The rendered form for editing a vehicle.
 */
const InfoForm = ({ id, clearForm }) => {
  const [dataUsuario, setDataUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const nombre = useField({ type: "text" });
  const apellido = useField({ type: "text" });
  const identificacion = useField({ type: "number" });
  const email = useField({ type: "email" });
  const sucursal = useField({ type: "text" });


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
      ) : dataUsuario ? (
        <div className="mt-10overflow-auto px-6">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/3 p-2 " onSubmit={onSubmit}>
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

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
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

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
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

            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
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


            <div className="w-full sm:w-1/2 md:w-1/3 p-2">
              <button
                className=" mb-5 p-2 bg-lime-600 rounded mt-5"
                onClick={onSubmit}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center dark:text-white">
          No se encontró el usuario
          <div>
            <button
              className="mb-5 mt-5 p-2 bg-lime-600 rounded"
              onClick={clearForm}
            >
              Volver a la búsqueda por ID
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};