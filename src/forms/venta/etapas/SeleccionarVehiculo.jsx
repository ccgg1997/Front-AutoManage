import React from "react";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Table from "../../../components/Table.jsx"
import { getInventario } from "../../../components/api/adress.js";




export default function SeleccionarVehiculo({ updateVehiculoInfo, actionVehiculoSeleccionado }) {
    const { token } = useSelector((state) => state.auth);
    const [dataVehiculo, setDataVehiculo] = useState([]);
    const titles = [
        { field: "id", headerName: "ID", width: 130 },
        { field: "marca", headerName: "Marca", width: 130 },
        { field: "linea", headerName: "Linea", width: 130 },
        { field: "precio", headerName: "Precio", width: 130 },
        { field: "modelo", headerName: "Modelo", width: 130 },
        { field: "condicion", headerName: "Condicion", width: 130 },
        { field: "concesionario", headerName: "Concesionario", width: 13 },
        { field: "color", headerName: "Color", },
        {
            field: "accion",
            headerName: "Acción",
            width: 200,
            renderCell: (params) => (
                <div>
                    <button
                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
                        onClick={() => {
                            updateVehiculoInfo(params.row);
                            actionVehiculoSeleccionado();
                        }}
                    >
                        Seleccionar
                    </button>
                </div>
            ),
        },
    ];

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

    }, []);

    return (
        <>
            <h1 className="text-xl font-bold mb-4">Seleccione el vehículo a adquirir</h1>
            <div className="flex justify-center">
                <Table data={dataVehiculo} titles={titles} />
            </div>
        </>
    )
}