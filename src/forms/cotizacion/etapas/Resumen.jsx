import React from "react";
import Table from "../../../components/Table.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SelectorSucursal from "../../../components/SelectorSucursal.jsx";
import { getCotizacionesDetalle } from "../../../components/api/adress.js";

export default function Resumen({ actionVender }) {
    const { token, rol } = useSelector((state) => state.auth);
    const titles = [
        { field: "id", headerName: "ID", maxWidth: 50 },
        { field: "fecha_creacion", headerName: "Fecha Creación",minWidth:120,with: 120 },
        { field: "fecha_vencimiento", headerName: "Fecha Vencimiento",minWidth:130,with: 130 },
        { field: "vehiculo", headerName: "Vehiculo",minWidth:200,with: 200 },
        { field: "modelo", headerName: "Modelo",minWidth:90,with: 90 },
        { field: "valor_total", headerName: "Valor Total",minWidth:120,with: 120},
        { field: "sucursal", headerName: "Sucursal",minWidth:100,with: 100 }
    ];
    const [dataSucursal, setDataSucursal] = useState({});
    const [dataCotizaciones, setDataCotizaciones] = useState([]);
    useEffect(() => {
        loadCotizaciones(dataSucursal)
    }, [dataSucursal]);

    const loadCotizaciones = async (sucursal) => {
        let cotizaciones = [];
        if (Object.keys(sucursal).length === 0 && rol === "Gerente") {
            cotizaciones = await getCotizacionesDetalle(token, null, false);
        } else if (sucursal.id) {
            cotizaciones = await getCotizacionesDetalle(token, sucursal.id, false);
        }
        cotizaciones = cotizaciones.map((cotizacion) => {
            return {
                id: cotizacion.id,
                fecha_creacion: cotizacion.fecha_creacion,
                fecha_vencimiento: cotizacion.fecha_vencimiento,
                vehiculo: cotizacion.inventario_vehiculos.vehiculo.marca + " " + cotizacion.inventario_vehiculos.vehiculo.linea,
                modelo: cotizacion.inventario_vehiculos.modelo,
                valor_total: cotizacion.valor_total,
                sucursal: cotizacion.inventario_vehiculos.sucursal.nombre,
                cotizacion: cotizacion.cotizacion ? cotizacion.cotizacion : "-"
            }
        })
        setDataCotizaciones(cotizaciones)
    }
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Historico de Cotizaciones</h2>
            <div className="flex">
                <div className="ml-auto mt-2">
                    <FormControl sx={{ minWidth: 250 }}>
                        <SelectorSucursal onChange={setDataSucursal} />

                    </FormControl>
                    <button
                        className="ml-auto p-4 bg-blue-500 hover:bg-blue-700  text-black border dark:text-white border-gray-100 rounded w-40"
                        onClick={actionVender}
                    >
                        Cotizar
                    </button>

                </div>
            </div >
            <div className="flex justify-center mt-3">
                <Table data={dataCotizaciones} titles={titles} />
            </div>
        </>
    )
}