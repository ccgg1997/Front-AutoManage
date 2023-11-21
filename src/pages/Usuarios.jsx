import { getUsuarios } from "../components/api/adress";
import TableUser from "../components/TableUser";
import { useState } from "react";
import { useSelector } from "react-redux";
import UsuarioForm from "../forms/user/usuarioForm";
import UsuarioDeleteForm from "../forms/user/usuarioDeleteForm";
import UsuariosUpdateForm from "../forms/user/usuariosUpdateForm";
import { Button } from "@mui/material";
import { useRef } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const Usuarios = () => {
  const [data, setData] = useState([]);
  const createRef = useRef();
  const editRef = useRef();
  const deleteRef = useRef();
  const tableRef = useRef();

  const [active, setActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const titles = ["ID", "Nombre", "Email", "Identificacion", "Estado", "Rol"];

  const { token } = useSelector((state) => state.auth);

  const onClick = async () => {
    try {
      if (!active) {
        const response = await getUsuarios(token);
        setData(response);
        setActive(true);
        setCreateActive(false);
        setEditActive(false);
        setDeleteActive(false);

        tableRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickAdd = () => {
    if (!createActive) {
      setCreateActive(true);
      setActive(false);
      setEditActive(false);
      setDeleteActive(false);

      createRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onClickEdit = () => {
    if (!editActive) {
      setEditActive(true);
      setActive(false);
      setCreateActive(false);
      setDeleteActive(false);

      editRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onClickDelete = () => {
    if (!deleteActive) {
      setDeleteActive(true);
      setActive(false);
      setCreateActive(false);
      setEditActive(false);

      deleteRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section>
      <div className=" border-t border-b border-gray-900/10 flex items-center justify-center pt-10 pl-7 pr-7 pb-5">
        <UserIcon className="h-10 w-10 mr-2 text-blue-500" aria-hidden="true" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold dark:text-white">
          GESTIÓN DE USUARIOS
        </h1>
      </div>
      <div className="min-h-screen w-auto container mx-auto py-8">
        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
            onClick={onClickAdd}
          >
            <svg
              className=" h-8 w-8 dark:text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <h2 className="mt-2 font-semibold dark:text-white">
              Crear usuario
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Agregar un nuevo usuario al sistema
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
            onClick={onClick}
          >
            <svg
              className=" h-8 w-8  dark:text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <h2 className="mt-2 font-semibold  dark:text-white">
              Leer informacion de usuario
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Ver los detalles de usuarios existentes
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
            onClick={onClickEdit}
          >
            <svg
              className=" h-8 w-8 dark:text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <h2 className="mt-2 text-base font-semibold dark:text-white">
              Actualizar usuario
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Modificar los detalles de usuarios existentes
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
            onClick={onClickDelete}
          >
            <svg
              className=" h-8 w-8  dark:text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            <h2 className="mt-2 text-base font-semibold  dark:text-white">
              Desactivar usuario
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Desactivar usuarios del sistema
            </p>
          </div>
        </div>
        <div className="mt-4" ref={tableRef}>
          {active && (
            <div className="flex justify-center">
              <TableUser data={data} titles={titles} />
            </div>
          )}
          <div className="mt-9">
            <div ref={createRef}>{createActive && <UsuarioForm />}</div>
            <div ref={editRef}>{editActive && <UsuariosUpdateForm />}</div>
            <div ref={deleteRef}>{deleteActive && <UsuarioDeleteForm />}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Usuarios;
