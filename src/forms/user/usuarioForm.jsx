import React, { useState } from "react";
import { createUsuario } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";

const useField = ({ type, placeholder, options }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange, options };
};

const roles = [
  { id: "2", nombre: "Gerente" },
  { id: "3", nombre: "Vendedor" },
  { id: "4", nombre: "Jefe_Taller" },
  { id: "5", nombre: "Cliente" },
]; //Posibles roles que puede tomar un usuario

/**
 * Renders a form for creating a user.
 *
 * @returns {JSX.Element} The rendered form component.
 */

export default function UsuarioForm() {
  const { token } = useSelector((state) => state.auth);

  const nombre = useField({ type: "text" });
  const apellido = useField({ type: "text" });
  const identificacion = useField({ type: "number" });
  const email = useField({ type: "email" });
  const sucursal = useField({ type: "number" });
  const password = useField({ type: "password" });
  const estado = "ACTIVO";
  const [is_superuser, setIsSuperuser] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const usuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    identificacion: identificacion.value,
    email: email.value,
    sucursal_id: sucursal.value,
    is_superuser,
    password: password.value,
    estado,
    rol_id: opcionSeleccionada,
  };

  const [showPassword, setShowPassword] = useState(false); //Controla la visibilidad de la contraseña

  const alternarVisibilidadContraseña = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validarContrasenaSegura(password.value)) {
        toast.error(
          "La contraseña debe tener al menos 8 caracteres, una letra mayuscula, una minuscula y un numero"
        );
        return;
      }
      await createUsuario(usuario, token);
      toast.success("Usuario creado con exito");
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    setOpcionSeleccionada(event.target.value);
  };

  const validarContrasenaSegura = (contrasena) => {
    //Valida que la contraseña tenga al menos 8 caracteres, una letra mayuscula, una minuscula y un numero
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(contrasena);
  };

  const clearForm = () => {
    nombre.onChange({ target: { value: "" } });
    apellido.onChange({ target: { value: "" } });
    identificacion.onChange({ target: { value: "" } });
    email.onChange({ target: { value: "" } });
    sucursal.onChange({ target: { value: "" } });
    password.onChange({ target: { value: "" } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-t pt-12 border-b border-gray-900/10 pb-12 ">
        <h2
          className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
        >
          Creacion de usuarios
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-300">
          Bienvenido al portal de usuarios, por favor ingrese informacion
          completa.
        </p>
      </div>

      <div className="mt-10 sm:grid-cols-6 ">
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

        <div className="mt-10 ">
          <div className="">
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

          <div className="mt-10 sm:grid-cols-6">
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
                  min="0"
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-10 sm:grid-cols-6">
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

              <div className="mt-10 sm:grid-cols-6">
                <label
                  htmlFor="sucursal"
                  className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  Sucursal
                </label>
                <div className="mt-2">
                  <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      {...sucursal}
                      id="sucursal"
                      autoComplete="sucursal"
                      min="1"
                      required
                      className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6  dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:grid-cols-6">
                <label
                  htmlFor="rol"
                  className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  Rol
                </label>
                <div className="mt-2">
                  <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <select
                      onChange={handleSelectChange}
                      value={opcionSeleccionada}
                      id="rol"
                      autoComplete="rol"
                      required
                      className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
          focus:ring-0 sm:text-sm sm:leading-6  dark:text-white dark:bg-sky-950 dark:border-white"
                    >
                      <option value="" disabled selected>
                        Seleccione un rol
                      </option>
                      {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                          {rol.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:grid-cols-6">
                <label
                  htmlFor="contraseña"
                  className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  Contraseña
                </label>
                <div className="mt-2">
                  <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      {...password}
                      id="password"
                      autoComplete="password"
                      required
                      pattern='^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$'
                      minLength="8"
                      title="La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial (!@#$%^&*(),.?\:{ }|<>)"
                      type={showPassword ? "text" : "password"}
                      className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                        focus:ring-0 sm:text-sm sm:leading-6  dark:text-white"
                    />
                        <button
                          type="button"
                          className="ml-2 p-2 focus:outline-none"
                          onClick={alternarVisibilidadContraseña}
                        >
                          {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <button className=" mb-5 mt-5 p-2 bg-lime-600 rounded " type="submit">
            Crear
          </button>
          <Toaster />
        </form>
        );
}
