import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getSucursalesByRol } from "../components/api/adress.js";
export default function SelectorSucursal({ onChange }) {
    const { token } = useSelector((state) => state.auth);
    const [dataSucursales, setDataSucursales] = useState([]);
    const [defaultSelected, setDefaultSelected] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const sucursales = await getSucursalesByRol(token);
            setDataSucursales(sucursales);
            if (sucursales.length == 1) {
                setDefaultSelected(sucursales[0])
                onChange(sucursales[0]);
            } else {
                onChange({});
            }
        };
        fetchData();
    }, []);
    const seleccionarSucursal = (e) => {
        setDefaultSelected(e.target.value);
        onChange(e.target.value);
    };

    return (
        <Select
            value={defaultSelected}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            className="dark:bg-sky-950 dark:border-white text-white dark:text-white"
            onChange={seleccionarSucursal}
        >
            <MenuItem value="">
                <em>Sucursal</em>
            </MenuItem>
            {dataSucursales.map((sucursal) => (
                <MenuItem key={sucursal.id} value={sucursal}>
                    {sucursal.nombre}
                </MenuItem>
            ))}
        </Select>
    )
}