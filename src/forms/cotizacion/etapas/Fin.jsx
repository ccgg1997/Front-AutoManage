import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import {
    getUsuarioByIdentificacion,
    createCotizacion,
} from "../../../components/api/adress";
import BuscarClienteInput from "../../../components/BuscarClienteInput.jsx"

const useField = ({ type, placeholder, defaultValue }) => {
    const [value, setValue] = React.useState(defaultValue);
    const onChange = ({ target }) => {
        setValue(target.value);
    };
    return { type, placeholder, value, onChange };
};

const formatearFecha = (fecha) => {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");

    const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
};

export default function Fin({ formData, actionAfterSubmit }) {
    const fechaActual = new Date();
    const { token, id } = useSelector((state) => state.auth);

    const fecha_finalizacion = useField({ type: "date" });
    const [valorTotal, setValorTotal] = useState(0);
    const [idInventarioVehiculo, setIdInventarioVehiculo] = useState("");
    const [idCliente, setIdCliente] = useState("");

    const model = {
        id: null,
        fecha_creacion: formatearFecha(fechaActual),
        fecha_vencimiento: fecha_finalizacion.value,
        valor_total: valorTotal,
        inventario_vehiculos: idInventarioVehiculo,
        vendedor: id,
        cliente: idCliente,
    };


    useEffect(() => {
        setValorTotal(formData.valor_total);
        setIdInventarioVehiculo(formData.inventario_vehiculos);
        if (formData.id_cliente) {
            setIdCliente(formData.id_cliente);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createCotizacion(model, token);
            toast.success("Cotizacion creada con exito");
            setTimeout(function () {
                actionAfterSubmit();
            }, 1300);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleClienteSelection = (cliente) => {
        setIdCliente(cliente.id)
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Completar Cotización:</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <div className="sm:grid-cols-12">
                        <span className="text-xl font-medium  dark:text-white">
                            Vehículo:
                        </span>
                        <span className="ml-2 text-xl font-bold dark:text-white">
                            {formData.nombre_vehiculo}
                        </span>
                    </div>
                    <div className="mt-10 sm:grid-cols-6">
                        <label
                            htmlFor="precio"
                            className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                        >
                            Precio pactado:
                        </label>
                        <div className="mt-2">
                            <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                                <input
                                    disabled
                                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                                    focus:ring-0 sm:text-sm   dark:text-white"
                                    value={formData.valor_total}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 sm:grid-cols-6">
                        <div className="sm:col-span-4 sm:max-w-md mx-auto">
                            <BuscarClienteInput handleSelection={handleClienteSelection} idClientePreSeleccionado={formData.id_cliente} />
                        </div>
                    </div>
                    <div className="mt-4 sm:grid-cols-6">
                        <label
                            htmlFor="linea"
                            className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                        >
                            Fecha Finalizacion
                        </label>
                        <div className="mt-2">
                            <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                                <input
                                    {...fecha_finalizacion}
                                    id="fecha_finalizacion"
                                    autoComplete="fecha_finalizacion"
                                    required
                                    className="dark:bg-sky-950 dark:border-white text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <button className=" mb-5 mt-5 p-2 bg-lime-600 rounded " type="submit">
                    Crear
                </button>
                <Toaster />
            </form>
        </>
    );
}
