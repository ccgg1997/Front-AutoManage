import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BuscarClienteModal from "./BuscarClienteModal.jsx";
import { getUsuarioById } from "./api/adress.js";

const useField = ({ type, placeholder, defaultValue }) => {
    const [value, setValue] = React.useState(defaultValue);
    const onChange = ({ target }) => {
        setValue(target.value);
    };
    return { type, placeholder, value, onChange };
};


export default function BuscarClienteInput({ idClientePreSeleccionado, handleSelection }) {
    const { token } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const clienteField = useField({ type: "select", defaultValue: "" });
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClientSelection = (cliente) => {
        handleSelection(cliente);
        setOpen(false);
        clienteField.onChange({ target: { value: cliente.identificacion + " - " + cliente.nombre } })
    }

    useEffect(() => {
        if (idClientePreSeleccionado) {
            clienteField.onChange({ target: { value: "..." } })
            const fetchClientData = async (idClientePreSeleccionado) => {
                const cliente = await getUsuarioById(idClientePreSeleccionado, token);
                clienteField.onChange({ target: { value: cliente.identificacion + " - " + cliente.nombre + " " + cliente.apellido } })
            }
            fetchClientData(idClientePreSeleccionado);
        }
    }, []);

    return (
        <div className="w-full">
            <label
                htmlFor="cliente"
                className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
                Cliente:
            </label>
            <div className="mt-2 flex">
                <div className="grow h-10 rounded-md border mr-2">
                    <input
                        {...clienteField}
                        id="cliente"
                        disabled
                        required
                        min="0"
                        className="w-full h-full border border-gray-300 text-center  bg-transparenttext-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white bg-transparent"
                    />
                </div>
                <div className="w-10">
                    <button
                        className="w-full h-full bg-blue-500 text-white flex items-center justify-center rounded-md "
                        type="button"
                        onClick={handleOpen}
                        disabled={idClientePreSeleccionado ? true : false}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
            </div>
            <BuscarClienteModal open={open} handleClose={handleClose} handleSelection={handleClientSelection} disabled={idClientePreSeleccionado ? true : false} />
        </div>
    )
}