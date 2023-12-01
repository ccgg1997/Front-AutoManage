import { Input, AppBar } from "@mui/material";
import { useState } from "react";
import PropTypes, { func } from "prop-types";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/features/auth/auth";
import { ApiLogin } from "../components/api/adress";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Toaster, toast } from "sonner";
import NavbarLogin from "../components/NavBarLogin.jsx";
import Modal from "../components/Modal.jsx";
import Tarjet from "../components/Tarjet.jsx";

/**
 * Summary: This code defines a React functional component called 'Login' that handles the login functionality of a user.
 *
 * @param {Object} props - The props object containing the 'actualizar' prop.
 * @param {boolean} props.actualizar - A prop that determines whether to update the state after successful login.
 *
 * @returns {JSX.Element} The JSX element representing the login component.
 *
 * @example
 * <Login actualizar={true} />
 */
function LoginForm({ actualizar }) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiLogin(login);
      actualizar(true);
      var decode = jwt_decode(response.access);
      const data = {
        token: response.access,
        usuario: login.email,
        id: decode.user_id,
        name: decode.user_nombre,
        lastname: decode.user_apellido,
        rol: decode.user_rol,
        timeExp: decode.exp,
      };
      Cookies.set("userData", JSON.stringify(data));
      dispatch(setAuthData(data));
    } catch (error) {
      if (error.message === "Datos vacios") {
        toast.error(error.message);
      } else if (error.message === "Usuario o contraseña incorrectos") {
        toast.error(error.message);
      } else {
        // Manejar otros errores de solicitud aquí
        console.error("Error en la solicitud:", error.message);
        toast.error("Error Interno, lamentamos los inconvenientes");
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Toaster />
      <div className="w-full px-4 flex flex-wrap justify-center">
        <div className="mr-4 mb-12 md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
          <div className="hidden md:flex z-10 mb-6 text-4xl font-bold justify-center items-center">
            Bienvenido
          </div>
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample image"
          />
        </div>

        <div className="flex w-full md:w-8/12 lg:w-5/12 xl:w-5/12 justify-center items-center">
          <form onSubmit={handleSubmit} className="mt-5 md:mt-0">
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold">
                Inicio de sesión
              </p>
            </div>

            <div className="mb-6 flex flex-col">
              <Input
                type="email"
                placeholder="Correo electrónico"
                onChange={handleChange}
                name="email"
                className="mb-3"
              />

              <Input
                type="password"
                placeholder="Contraseña"
                size="lg mt-3"
                onChange={handleChange}
                name="password"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Login({ actualizar }) {
  return (
    <div className="flex flex-col h-screen">
      <NavbarLogin content={<LoginForm actualizar={actualizar} />} />
      <div className="flex w-full h-full justify-center  pb-40">
      <div className="flex w-full justify-center p-5 sm:p-20 lg:w-2/5">
          <Tarjet title="Órden de trabajo" description="Consulte detalles de una órden trabajo" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  actualizar: PropTypes.any.isRequired,
};

export default Login;
