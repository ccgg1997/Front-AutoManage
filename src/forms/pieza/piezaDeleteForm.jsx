import React, { useState, useEffect } from "react";
import { deletePieza } from "../../components/api/adress";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";

/**
 * Renders a form for creating a vehicle.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export default function PiezaDeleteForm({ idPieza, nombrePieza, afterSubmit, onCancelAction }) {
    const { token } = useSelector((state) => state.auth);

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");


    useEffect(() => {
        setId(idPieza)
        setNombre(nombrePieza)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deletePieza(id, token);
            console.log(response);
            toast.success("Pieza eliminada con exito");
            // clearForm();
            afterSubmit();
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="border-t pt-12 border-b border-gray-900/10 pb-12">
                <h2
                    className="text-base font-semibold leading-7 text-gray-900
        dark:text-slate-300 sm:text-3xl sm:truncate
        "
                >
                    Eliminación de piezas
                </h2>
                <h4>Está seguro de eliminar la pieza: "{idPieza} - {nombrePieza}"</h4>
            </div>
            <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded " type="submit">
                Eliminar
            </button>
            <button className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded " type="button" onClick={() => onCancelAction()} >
                Cancelar
            </button>
            <Toaster />
        </form>
    );
}
