import React from "react";
import Table from "../../../components/Table.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SelectorSucursal from "../../../components/SelectorSucursal.jsx";
import { getVentasDetalle } from "../../../components/api/adress.js";

export default function Resumen({ actionVender }) {
    const { token, rol } = useSelector((state) => state.auth);
    const titles = [
        { field: "id", headerName: "ID",  minWidth: 50,maxWidth: 50 },
        { field: "fecha_creacion", headerName: "Fecha Creación",minWidth:120,with: 120 },
        { field: "estado", headerName: "Estado",minWidth:150,with: 150 },
        { field: "vehiculo", headerName: "Vehiculo",minWidth:200,with: 200},
        { field: "modelo", headerName: "Modelo",minWidth:90,with: 90 },
        { field: "valor_total", headerName: "Valor Total",minWidth:120,with: 120},
        { field: "sucursal", headerName: "Sucursal",minWidth:120,with: 120},
        { field: "cotizacion", headerName: "Nº Cotización",minWidth:120,with: 120 }
    ];
    const [dataSucursal, setDataSucursal] = useState({});
    const [dataVentas, setDataVentas] = useState([]);
    useEffect(() => {
        loadVentas(dataSucursal)
    }, [dataSucursal]);

    const loadVentas = async (sucursal) => {
        let ventas = [];
        if (Object.keys(sucursal).length === 0 && rol === "Gerente") {
            ventas = await getVentasDetalle(token);
        } else if (sucursal.id) {
            ventas = await getVentasDetalle(token, sucursal.id);
        }
        ventas = ventas.map((venta) => {
            return {
                id: venta.id,
                fecha_creacion: venta.fecha_creacion,
                estado: venta.estado,
                vehiculo: venta.inventario_vehiculo.vehiculo.marca + " " + venta.inventario_vehiculo.vehiculo.linea,
                modelo: venta.inventario_vehiculo.modelo,
                valor_total: venta.valor_total,
                sucursal: venta.inventario_vehiculo.sucursal.nombre,
                cotizacion: venta.cotizacion ? venta.cotizacion : "-"
            }
        })
        setDataVentas(ventas)
    }
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Historico de Ventas</h2>
            <div className="flex">
                <div className="ml-auto mt-2">
                    <FormControl sx={{ minWidth: 250 }}>
                        <SelectorSucursal onChange={setDataSucursal} />

                    </FormControl>
                    <button
                        className="ml-auto p-4 bg-blue-500 hover:bg-blue-700  text-black border dark:text-white border-gray-100 rounded w-40"
                        onClick={actionVender}
                    >
                        Vender
                    </button>

                </div>
            </div >
            <div className="flex justify-center mt-3">
                <Table data={dataVentas} titles={titles} />
            </div>
        </>
    )
}