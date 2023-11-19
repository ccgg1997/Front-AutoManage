import  { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { deleteOrden } from "../../components/api/adress";

/**
 * Renders a form for creating a vehicle.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export default function OrderDeleteForm({ orden , onCancelAction}) {
    const { token } = useSelector((state) => state.auth);
    const [id, setId] = useState("");

    useEffect(() => {
        setId(orden.id)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deleteOrden(id, token);
            console.log(response);
            toast.success("Orden eliminada con exito, redireccionando...");
            setTimeout(() => {
                onCancelAction();
            }, 2000);
            
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
                    Eliminación de orden
                </h2>
                <h4>Está seguro de eliminar la orden con id: "{orden.id}"</h4>
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