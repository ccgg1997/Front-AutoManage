import React from "react";

export default function Inicial({ actionCotizacionSi, actionCotizacionNo }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">¿Cuenta con una cotización previa?</h2>
            <button
                className="mt-5 p-2 text-black border dark:text-white border-gray-300 rounded w-24"
                onClick={actionCotizacionNo}>
                No
            </button>
            <button
                className="mt-5 mx-2 p-2 bg-blue-500 hover:bg-blue-700 border dark:text-white border-gray-300 rounded w-24"
                onClick={actionCotizacionSi}>
                Si
            </button>
        </>
    )
}