import React from "react";
import Tabs from "../components/Tabs.jsx";
import Table from "../components/Table.jsx";
import { editItem, deleteItem } from "./funciones.js"; // Asegúrate de que la ruta sea correcta
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getInventario } from "../components/api/adress.js";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

const Inventario = () => {
  const [data, setData] = useState([]);

  // Datos de ejemplo para la tabla
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      const vehiculos = await getInventario(token);
      vehiculos.map((vehiculo) => {
        vehiculo.concesionario = vehiculo.sucursal.direccion;
        vehiculo.marca = vehiculo.vehiculo.marca;
        vehiculo.precio = "$ " + vehiculo.vehiculo.precio;
        vehiculo.linea = vehiculo.vehiculo.linea;
      });
      setData(vehiculos);
      console.log(vehiculos);
    };
    fetchData();
  }, []);

  const deleteItemInventarioClick = (row) => {
    deleteItem(row);
  };

  const titles = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "marca", headerName: "Marca", width: 130 },
    { field: "linea", headerName: "Linea", width: 130 },
    { field: "precio", headerName: "Precio", width: 130 },
    { field: "modelo", headerName: "Modelo", width: 130 },
    { field: "condicion", headerName: "Condicion", width: 130 },
    { field: "concesionario", headerName: "Concesionario", width: 130 },
    { field: "color", headerName: "Color", width: 130 },
    {
      field: "accion",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => deleteItemInventarioClick(params.row)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const datosDeLaTabla = data;

  const tabs = [
    {
      label: "Vehiculo",
      content:<div className="p-10"><Table data={datosDeLaTabla} titles={titles} /></div>,
    },
    { label: "Repuestos", content: "Contenido del Item Two" },
    { label: "Taller", content: "Contenido del Item Three" },
  ];

  return (
    <>
      <div className="flex items-center justify-center p-9">
        <ArchiveBoxIcon
          className="h-10 w-10 mr-2 text-blue-500"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold dark:text-white">
          INVENTARIO
        </h1>
      </div>
      <Tabs tabs={tabs} />
    </>
  );
};

export default Inventario;
