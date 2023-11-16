import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import { getPiezas } from "../components/api/adress";
import BasicTable from "../components/Table";
import { useSelector } from "react-redux";
import PiezaPostForm from "../forms/pieza/piezaPostForm";
import PiezaDeleteForm from "../forms/pieza/piezaDeleteForm";
import PiezaUpdateForm from "../forms/pieza/piezaUpdateForm";
import { Button } from "@mui/material";


const Pieza = () => {
    const [data, setData] = useState([]);
    const [targetPieza, setTargetPieza] = useState({});
    const createRef = useRef();
    const editRef = useRef();
    const deteleRef = useRef();
    const tableRef = useRef();

    const [active, setActive] = useState(true);
    const [createActive, setCreateActive] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    const titles = ["ID", "Nombre", "Serie", "Precio", "Acciones"];

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        listPiezas();
    }, []); // useEffect con un arreglo de dependencias vacío se ejecuta solo una vez al montar el componente



    const listPiezas = async () => {
        try {
            const response = await getPiezas(token);
            setData(response);
        } catch (error) {
            console.error(error);
        }
    };

    const switchViewToList = async () => {
        listPiezas()
        setActive(true);
        setCreateActive(false);
        setEditActive(false);
        setDeleteActive(false);

        tableRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const switchViewToCreate = async () => {
        if (!createActive) {
            setCreateActive(true);
            setActive(false);
            setEditActive(false);
            setDeleteActive(false);

            createRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const switchViewToEdit = async () => {
        if (!editActive) {
            setEditActive(true);
            setActive(false);
            setCreateActive(false);
            setDeleteActive(false);

            editRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const editPiezaClick = (piezaData) => {
        setTargetPieza(piezaData)
        if (!editActive) {
            setEditActive(true);
            setActive(false);
            setCreateActive(false);
            setDeleteActive(false);

            //     editRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const deletePiezaClick = (piezaData) => {
        setTargetPieza(piezaData)
        if (!editActive) {
            setDeleteActive(true);
            setEditActive(false);
            setActive(false);
            setCreateActive(false);

            //     editRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <section className='dark:text-white'>
            <div className="min-h-screen w-auto container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center dark:text-white">
                    Gestión de Piezas
                </h1>
                <div className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <div
                        className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
                        onClick={switchViewToCreate}
                    >
                        <svg
                            className=" h-8 w-8 dark:text-white"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        <h2 className="mt-2 font-semibold dark:text-white">
                            Crear vehiculo
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Agregar un nuevo vehiculo al sistema
                        </p>
                    </div>
                    <div
                        className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
                        onClick={switchViewToList}
                    >
                        <svg
                            className=" h-8 w-8  dark:text-white"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <h2 className="mt-2 font-semibold  dark:text-white">
                            Leer informacion de piezas
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Ver los detalles de piezas existentes
                        </p>
                    </div>
                </div>
                <div className="mt-4" ref={tableRef}>
                    {active && (
                        <div className="flex">
                            <BasicTable data={data} titles={titles} editAction={editPiezaClick} deleteAction={deletePiezaClick} />
                        </div>
                    )}
                    <div className="mt-9">
                        <div ref={createRef}>{createActive && <PiezaPostForm />}</div>
                        <div ref={editRef}>{editActive && <PiezaUpdateForm passPieza={targetPieza} afterSubmit={() => setData([])} />}</div>
                        <div ref={deteleRef}>{deleteActive && <PiezaDeleteForm idPieza={targetPieza.id} nombrePieza={targetPieza.nombre} afterSubmit={switchViewToList} onCancelAction={switchViewToList} />}</div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Pieza;