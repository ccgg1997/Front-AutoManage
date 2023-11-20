import React from "react";
import Tabs from "../components/Tabs.jsx";
import Table from "../components/Table.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getInventario, deleteVehiculoInventario, getRepuestos } from "../components/api/adress.js";
import InventarioCreate from "../forms/inventario/InventarioCreate.jsx";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

const Inventario = () => {
  const [dataVehiculo, setDataVehiculo] = useState([]);
  const [dataPiezas, setDataPiezas] = useState([]);
  const deleteItemInventarioClick = async(row) => {
    console.log(row);
    await deleteVehiculoInventario(row,token);
    
    setDataVehiculo(dataVehiculo.filter(vehiculo => vehiculo.id !== row));
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
        pieza.nombre = pieza.pieza.nombre,
        pieza.precio= pieza.pieza.precio,
        pieza.sucursal= pieza.sucursal.direccion
      })
      setDataPiezas(piezas);
    }
    piezasFetch();
  }, [setDataVehiculo, setDataPiezas]);

  //titulos de tabla de vehiculos
  const titles = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "marca", headerName: "Marca", width: 130 },
    { field: "linea", headerName: "Linea", width: 130 },
    { field: "precio", headerName: "Precio", width: 130 },
    { field: "modelo", headerName: "Modelo", width: 130 },
    { field: "condicion", headerName: "Condicion", width: 130 },
    { field: "concesionario", headerName: "Concesionario", width: 13 },
    { field: "color", headerName: "Color",  },
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
    {field:"cantidad_disponible", headerName:"Cantidad Disponible", width: 130},

  ];

  const tabs = [
    {
      label: "Vehiculo",
      content:<div className="pl-10 pr-10 pt-6"><Table data={dataVehiculo} titles={titles} /></div>,
    },
    { label: "Repuestos", content: <div className="pl-10 pr-10 pt-6"><Table data={dataPiezas} titles={titlePiezas} /></div> },
    { label: "Crear", content: <div className="pl-10 pr-10 pt-6"><InventarioCreate></InventarioCreate></div> }
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
    </>
  );
};

export default Inventario;
