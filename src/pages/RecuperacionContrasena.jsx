import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import {
  getUsuarioByEmail,
  userUpdatePasswordLost,
  sendEmail,
} from "../components/api/adress";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};

export default function RecuperacionContrasena() {
  const [mostrarIingreseCorreo, setMostrarIingreseCorreo] = useState(true);
  const [mostrarIngreseCodigo, setMostrarIngreseCodigo] = useState(false);
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);
  const generarCodigoNumerico = () => {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleAgain, setPasswordVisibleAgain] = useState(false);

  const navigate = useNavigate();

  const correo = useField("email");
  const codigoIngresado = useField("number");
  const password = useField("password");
  const passwordAgain = useField("password");
  const [codigo, setCodigo] = useState(generarCodigoNumerico());

  const enviarCorreo = async () => {
    const emailToSend = {
      email: correo.value,
      codigo: codigo,
    };
    const response = await sendEmail(emailToSend);
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getUsuarioByEmail(correo.value);
      if (response === null) {
        toast.error("El correo ingresado no se encuentra registrado");
      } else {
        enviarCorreo();
        toast.success(
          "Se ha enviado un correo con el enlace de recuperación, revisa tu bandeja de entrada"
        );
        setMostrarIingreseCorreo(false);
        setMostrarIngreseCodigo(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al enviar el correo de recuperación");
    }
  };

  const handleSublmitCodigo = (e) => {
    e.preventDefault();

    //verificamos si el codigo es numerico
    if (isNaN(codigoIngresado.value)) {
      toast.error("El código ingresado no es correcto");
      return;
    }
    //verificamos si el codigo es correcto
    const parsetCodigo = parseInt(codigoIngresado.value);
    if (parsetCodigo === codigo) {
      toast.success("El código ingresado es correcto");
      setMostrarIngreseCodigo(false);
      setMostrarNuevaContrasena(true);
    } else {
      toast.error("El código ingresado no es correcto");
    }
  };

  const handleSubmitNuevaContrasena = (e) => {
    e.preventDefault();
    if (password.value === passwordAgain.value) {
      if (!validarContrasenaSegura(password.value)) {
        toast.error(
          "La contraseña debe tener solo al menos 8 caracteres, una letra mayuscula, una minuscula, un numero y un caracter especial"
        );
        return;
      } else {
        try {
          const user = {
            email: correo.value,
            new_password: password.value,
          };
          const response = userUpdatePasswordLost(user);
          if (response === null) {
            toast.error("Error al cambiar la contraseña");
            return;
          } else {
            toast.success(
              "La contraseña se ha cambiado correctamente, rediriendo..."
            );
            setTimeout(() => {
              navigate("/login");
            }, 1500);
          }
          console.log(response);
        } catch (error) {
          console.log(error);
          toast.error("Error inesperado al cambiar la contraseña");
        }
      }
    } else {
      toast.error("Las contraseñas no coinciden");
    }
  };

  const validarContrasenaSegura = (contrasena) => {
    //Valida que la contraseña tenga al menos 8 caracteres, una letra mayuscula, una minuscula y un numero
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(contrasena);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {mostrarIingreseCorreo && (
        <div className="flex flex-col items-center justify-center h-screen">
          <Card className="mx-auto max-w-md">
            <CardContent className="space-y-1">
              <h1 className="text-3xl font-bold">Recuperar Contraseña</h1>
              <p className="text-sm text-neutral-500">
                Ingrese su correo electrónico y le enviaremos un enlace para
                restablecer su contraseña.
              </p>
            </CardContent>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-bold">
                    {" "}
                    Correo electrónico{" "}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      {...correo}
                      id="correo"
                      type="email"
                      autoComplete="correo"
                      required
                      autoFocus
                      className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
                    />
                  </div>
                </div>
                <button
                  className="w-full btn btn-primary text-white p-3 rounded  bg-black"
                  onClick={handleSubmit}
                >
                  Enviar enlace de recuperación
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="text-neutral-500">
                  Recuerdas tu contraseña?
                </span>{" "}
                <a
                  className="text-primary hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </a>
              </div>
            </CardContent>
          </Card>
          <Toaster />
        </div>
      )}

      {mostrarIngreseCodigo && (
        <div className="flex flex-col items-center justify-center h-screen">
          <Card className="mx-auto max-w-md">
            <CardContent className="space-y-1">
              <h1 className="text-3xl font-bold">Recuperar Contraseña</h1>
              <p className="text-sm text-neutral-500">
                Ingrese el código que se le envió a su correo electrónico.
              </p>
            </CardContent>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-bold">
                    {" "}
                    Código{" "}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      {...codigoIngresado}
                      autoComplete="codigo"
                      required
                      autoFocus
                      className="text-center flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black  dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
                    />
                  </div>
                </div>
                <button
                  className="w-full btn btn-primary text-white p-3 rounded  bg-black"
                  onClick={handleSublmitCodigo}
                >
                  Enviar enlace de recuperación
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="text-neutral-500">
                  Recuerdas tu contraseña?
                </span>{" "}
                <a
                  className="text-primary hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </a>
              </div>
            </CardContent>
          </Card>
          <Toaster />
        </div>
      )}
      {mostrarNuevaContrasena && (
        <div className="flex flex-col items-center justify-center h-screen">
          <Card className="mx-auto max-w-md">
            <CardContent className="space-y-1">
              <h1 className="text-3xl font-bold">Recuperar Contraseña</h1>
              <p className="text-sm text-neutral-500">
                Ingrese su nueva contraseña.
              </p>
            </CardContent>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-bold">
                    {" "}
                    Nueva Contraseña{" "}
                  </label>
                  <div
                    className="flex items-center text-center flex-1 bg-transparent pl-1 text-gray-900 placeholder:text-gray-400
      focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
                  >
                    <input
                      {...password}
                      type= {passwordVisible ? "text" : "password"}
                      required
                      autoFocus
                      className="flex-1 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      className="p-2 focus:outline-none"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-bold">
                    {" "}
                    Verificar Contraseña{" "}
                  </label>
                  <div
                    className="flex items-center text-center flex-1 bg-transparent pl-1 text-gray-900 placeholder:text-gray-400
      focus:ring-0 sm:text-sm sm:leading-6 border rounded-full border-black dark:text-white w-full dark:bg-slate-950 dark:border-white mb-4 mt-2"
                  >
                    <input
                      {...passwordAgain}
                      type = {passwordVisibleAgain ? "text" : "password"}
                      required
                      autoFocus
                      className="flex-1 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      className="p-2 focus:outline-none"
                      onClick={() =>
                        setPasswordVisibleAgain(!passwordVisibleAgain)
                      }
                    >
                      {passwordVisibleAgain ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>
                <button
                  className="w-full btn btn-primary text-white p-3 rounded  bg-black"
                  onClick={handleSubmitNuevaContrasena}
                >
                  Cambiar contraseña
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="text-neutral-500">
                  Recuerdas tu contraseña?
                </span>{" "}
                <a
                  className="text-primary hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </a>
              </div>
            </CardContent>
          </Card>
          <Toaster />
        </div>
      )}
    </div>
  );
}
