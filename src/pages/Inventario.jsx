import Tabs from "../components/Tabs.jsx";
import Table from "../components/Table.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getInventario,
  deleteVehiculoInventario,
  getRepuestos,
  deleteInventarioPieza,
  updateInventarioPieza,
  getInventarioPiezaById,
  getSucursalesByRol,
} from "../components/api/adress.js";
import InventarioCreate from "../forms/inventario/InventarioCreate.jsx";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { Modal, Typography, Box } from "@mui/material";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

const Inventario = () => {
  const [dataVehiculo, setDataVehiculo] = useState([]);
  const [dataPiezas, setDataPiezas] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteModalVehiculo, setOpenDeleteModalVehiculo] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [row, setRow] = useState(null);
  const [rowDelete, setRowDelete] = useState(null);
  const sucursal = useField({ type: "text", placeholder: "Sucursal" });
  const cantidad = useField({ type: "number", placeholder: "Cantidad" });
  const [piezaId, setPiezaId] = useState(null);

  const deleteItemInventarioClick = async (row) => {
    setOpenDeleteModalVehiculo(true);
    setRowDelete(row);
  };

  const deleteItemInventario = async (rowDelete) => {
    await deleteVehiculoInventario(rowDelete, token);
    setOpenDeleteModalVehiculo(false);
    const vehiculos = await getInventario(token);
    vehiculos.map((vehiculo) => {
      vehiculo.concesionario = vehiculo.sucursal.direccion;
      vehiculo.marca = vehiculo.vehiculo.marca;
      vehiculo.precio = "$ " + vehiculo.vehiculo.precio;
      vehiculo.linea = vehiculo.vehiculo.linea;
    });
    setDataVehiculo(vehiculos);
  };

  const editItemInventarioPieza = async (row) => {
    const piezaEdit = {
      id: row,
      pieza_id: piezaId,
      sucursal_id: sucursal.value,
      cantidad_disponible: cantidad.value,
    };

    await updateInventarioPieza(piezaEdit, token);
    setOpenEditModal(false);
    const piezas = await getRepuestos(token);
    piezas.map((pieza) => {
      (pieza.nombre = pieza.pieza.nombre),
        (pieza.precio = pieza.pieza.precio),
        (pieza.sucursal = pieza.sucursal.direccion);
    });
    setDataPiezas(piezas);
  };

  const editItemInventarioPiezaClick = async (row) => {
    setOpenEditModal(true);
    setRow(row);
  };

  const deleteItemInventarioPiezaClick = async (row) => {
    setOpenDeleteModal(true);
    setRow(row);
  };

  const deleteItemInventarioPieza = async (row) => {
    await deleteInventarioPieza(row, token);
    setOpenDeleteModal(false);
    const piezas = await getRepuestos(token);
    piezas.map((pieza) => {
      (pieza.nombre = pieza.pieza.nombre),
        (pieza.precio = pieza.pieza.precio),
        (pieza.sucursal = pieza.sucursal.direccion);
    });
    setDataPiezas(piezas);
  };

  const { token } = useSelector((state) => state.auth);

  //info de la tabla de vehiculos
  useEffect(() => {
    const fetchData = async () => {
      const vehiculos = await getInventario(token);
      vehiculos.map((vehiculo) => {
        vehiculo.concesionario = vehiculo.sucursal.direccion;
        vehiculo.marca = vehiculo.vehiculo.marca;
        vehiculo.precio = "$ " + vehiculo.vehiculo.precio;
        vehiculo.linea = vehiculo.vehiculo.linea;
      });
      setDataVehiculo(vehiculos);
    };
    fetchData();

    const piezasFetch = async () => {
      const piezas = await getRepuestos(token);
      piezas.map((pieza) => {
        (pieza.nombre = pieza.pieza.nombre),
          (pieza.precio = pieza.pieza.precio),
          (pieza.sucursal = pieza.sucursal.direccion);
      });
      setDataPiezas(piezas);
    };
    piezasFetch();
  }, [setDataVehiculo, setDataPiezas]);

  useEffect(() => {
    if (row == null) return;
    const fetchData = async () => {
      const pieza = await getInventarioPiezaById(row, token);
      sucursal.onChange({ target: { value: pieza.sucursal.id } });
      cantidad.onChange({ target: { value: pieza.cantidad_disponible } });
      setPiezaId(pieza.pieza.id);
    };

    fetchData();
  }, [row]);

  useEffect(() => {
    const fetchData = async () => {
      const sucursales = await getSucursalesByRol(token);
      setSucursales(sucursales);
    };
    fetchData();
  }, []);

  //titulos de tabla de vehiculos
  const titles = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "marca", headerName: "Marca", width: 130 },
    { field: "linea", headerName: "Linea", width: 130 },
    { field: "precio", headerName: "Precio", width: 130 },
    { field: "modelo", headerName: "Modelo", width: 130 },
    { field: "condicion", headerName: "Condicion", width: 130 },
    { field: "concesionario", headerName: "Concesionario", width: 13 },
    { field: "color", headerName: "Color" },
    {
      field: "accion",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => deleteItemInventarioClick(params.row.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  //titulo de tabla de respuestos
  const titlePiezas = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "precio", headerName: "Precio", width: 130 },
    { field: "sucursal", headerName: "Sucursal", width: 130 },
    {
      field: "cantidad_disponible",
      headerName: "Cantidad Disponible",
      width: 130,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div className="flex flex-row">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => editItemInventarioPiezaClick(params.row.id)}
          >
            Editar
          </button>
          <div>
            <button
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
              onClick={() => deleteItemInventarioPiezaClick(params.row.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      label: "Vehiculo",
      content: (
        <div className="pl-10 pr-10 pt-6">
          <Table data={dataVehiculo} titles={titles} />
        </div>
      ),
    },
    {
      label: "Repuestos",
      content: (
        <div className="pl-10 pr-10 pt-6">
          <Table data={dataPiezas} titles={titlePiezas} />
        </div>
      ),
    },
    {
      label: "Crear",
      content: (
        <div className="pl-10 pr-10 pt-6">
          <InventarioCreate></InventarioCreate>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=" border-t border-b border-gray-900/10 flex items-center justify-center pt-10 pl-7 pr-7 pb-5">
        <ArchiveBoxIcon
          className="h-10 w-10 mr-2 text-blue-500"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold dark:text-white">
          INVENTARIO
        </h1>
      </div>
      <Tabs tabs={tabs} />
      <ModalEdit
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        sucursal={sucursal}
        cantidad={cantidad}
        editItemInventarioPieza={editItemInventarioPieza}
        row={row}
        sucursales={sucursales}
      />
      <ModalDelete
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        deleteItemInventarioPiezaClick={deleteItemInventarioPieza}
        row={row}
      />
      <ModalDeleteVehiculo
        open={openDeleteModalVehiculo}
        handleClose={() => setOpenDeleteModalVehiculo(false)}
        deleteItemInventario={deleteItemInventario}
        rowDelete={rowDelete}
      />
    </>
  );
};

const ModalEdit = ({
  open,
  handleClose,
  sucursal,
  cantidad,
  editItemInventarioPieza,
  row,
  sucursales,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-xl mb-9 dark:text-slate-300 "
        >
          Editar pieza
        </Typography>
        <div className="flex flex-col ">
          <Typography className="flex flex-col text-sm font-medium leading-6 text-gray-900 ">
            <label className="text-xl dark:text-white">Sucursal</label>
            <select
              className="border-2 border-gray-300 p-2 rounded-lg m-2 "
              {...sucursal}
            >
              <option value="">Seleccione una sucursal</option>
              {sucursales.map((sucursal) => (
                <option value={sucursal.id} key={sucursal.id}>
                  {sucursal.direccion}
                </option>
              ))}
            </select>
            <label className="text-xl dark:text-white">Cantidad</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg m-2"
              {...cantidad}
            ></input>
          </Typography>
        </div>
        <div className="flex flex-row center mt-5">
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => editItemInventarioPieza(row)}
          >
            Editar
          </button>
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => handleClose()}
          >
            Cancelar
          </button>
        </div>
      </Box>
    </Modal>
  );
};

const ModalDelete = ({
  open,
  handleClose,
  deleteItemInventarioPiezaClick,
  row,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-xl mb-9 dark:text-slate-300 "
        >
          Eliminar pieza
        </Typography>
        <Typography className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
          <label className="text-xl">
            ¿Está seguro que desea eliminar esta pieza?
          </label>
        </Typography>
        <div className="flex flex-row center mt-5">
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => deleteItemInventarioPiezaClick(row)}
          >
            Eliminar
          </button>
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => handleClose()}
          >
            Cancelar
          </button>
        </div>
      </Box>
    </Modal>
  );
};

const ModalDeleteVehiculo = ({
  open,
  handleClose,
  deleteItemInventario,
  rowDelete,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white dark:bg-slate-950 rounded-lg p-8 ">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-xl mb-9 dark:text-slate-300 "
        >
          Eliminar vehiculo
        </Typography>
        <Typography className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
          <label className="text-xl">
            ¿Está seguro que desea eliminar este vehiculo?
          </label>
        </Typography>
        <div className="flex flex-row center mt-5">
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => deleteItemInventario(rowDelete)}
          >
            Eliminar
          </button>
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => handleClose()}
          >
            Cancelar
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default Inventario;
