import React, { useEffect } from "react";
import OrdenForm from "../forms/ordenes/ordenForm";
import OrdenUpdateForm from "../forms/ordenes/ordenUpdateForm";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { getOrdenes } from "../components/api/adress";
const OrdenesTrabajo = () => {
  const {token } = useSelector((state) => state.auth);
  console.log(token);
  const [ordenFormActive, setOrdenFormActive] = React.useState(false);
  const [tableActive, setTableActive] = React.useState(false);

  useEffect(() => {
    try {
      const getOrdenesData = async () => {
        const ordenes = await getOrdenes(token);
        console.log(ordenes);
      };
      getOrdenesData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const orderFormView = () => {
    setOrdenFormActive(true);
    console.log("Crear vehiculo");
  };
  return (
    <section className="dark:text-white">
      <div className="min-h-screen w-auto container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center dark:text-white">
          Gestión de Ordenes de Trabajo
        </h1>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <div
            className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer"
            onClick={orderFormView}
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
            <h2 className="mt-2 font-semibold dark:text-white">Crear orden</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Agregar una nueva orden al sistema
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border-2 border-black dark:border-white rounded-lg cursor-pointer">
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
              Leer informacion de las ordenes
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Ver los detalles de las ordenes existentes
            </p>
          </div>
        </div>
        <div>
          {ordenFormActive && <OrdenForm />}
          {tableActive && <Table />}{/** sin terminar */}
        </div>
      </div>
    </section>
  );
};

export default OrdenesTrabajo;
