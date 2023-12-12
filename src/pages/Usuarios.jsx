import { getUsuarios } from "../components/api/adress";
import TableUser from "../components/TableUser";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UsuarioForm from "../forms/user/usuarioForm";
import UsuarioDeleteForm from "../forms/user/usuarioDeleteForm";
import UsuariosUpdateForm from "../forms/user/usuariosUpdateForm";
import { Button } from "@mui/material";
import { useRef } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table.jsx";

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [targetUser, setTargetUser] = useState({});
  const createRef = useRef();
  const editRef = useRef();
  const deleteRef = useRef();
  const tableRef = useRef();

  const [active, setActive] = useState(true);
  const [createActive, setCreateActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);

  const titless = ["ID", "Nombre", "Email", "Identificacion", "Estado", "Rol"];
  const titles = [
    { field: "id", headerName: "ID", maxWidth: 50 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "apellido", headerName: "Apellido", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "identificacion", headerName: "Identificación", width: 130 },
    { field: "estado", headerName: "Estado", width: 130 },
    { field: "rol_descripcion", headerName: "Rol", width: 130 },
    {
      field: "accion",
      headerName: "Acción",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onClickEdit(params.row)}
          >
            Editar
          </button>
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => onClickDelete(params.row)}
          >
            Deshabilitar
          </button>
        </div>
      ),
    },
  ];

  const { token } = useSelector((state) => state.auth);

  const fetchData = async () => {
    const usuarios = await getUsuarios(token);
    let usuariosData = usuarios.map((user) => {
      return {
        ...user,
        rol_descripcion: user.rol.nombre
      }
    });
    setData(usuariosData);

  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClick = async () => {
    try {
      if (!active) {
        fetchData();
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

  const onClickEdit = (user) => {
    setTargetUser(user);
    setEditActive(true);
    setActive(false);
    setCreateActive(false);
    setDeleteActive(false);

    editRef.current.scrollIntoView({ behavior: "smooth" });

  };

  const onClickDelete = (user) => {
    setTargetUser(user);
    setDeleteActive(true);
    setActive(false);
    setCreateActive(false);
    setEditActive(false);

    deleteRef.current.scrollIntoView({ behavior: "smooth" });
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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
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
        </div>
        <div className="mt-4" ref={tableRef}>
          {active && (
            <div className="flex justify-center">
              <Table data={data} titles={titles} />
            </div>
          )}
          <div className="mt-9">
            <div ref={createRef}>{createActive && <UsuarioForm />}</div>
            <div ref={editRef}>{editActive && <UsuariosUpdateForm id={targetUser.id} clearForm={onClick} />}</div>
            <div ref={deleteRef}>{deleteActive && <UsuarioDeleteForm targetId={targetUser.id} clearForm={onClick} />}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Usuarios;
