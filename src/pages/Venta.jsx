
import React from "react";
import Tabs from '../components/Tabs.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getInventario } from '../components/api/adress.js';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import VentaForm from '../forms/venta/VentaForm.jsx';

export default function Venta() {
  const tabs = [
    { label: 'Cotizacion', content: <Cotizacion /> },
    { label: 'Venta', content: <VentaForm /> },
  ];
  return (
    <div className="min-h-screen dark:text-white">
      <div className=" border-t border-b border-gray-900/10 flex items-center justify-center pt-10 pl-7 pr-7 pb-5">
        <CurrencyDollarIcon
          className="h-10 w-10 mr-2 text-blue-500"
          aria-hidden="true"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold dark:text-white">
          VENTAS
        </h1>
      </div>
      <Tabs className="h-full" tabs={tabs} />
    </div>
  );
}


function Cotizacion() {
  const cedula = useField({ type: "text" });
  const fecha_creacion = useField({ type: "date" });
  const fecha_finalizacion = useField({ type: "date" });

  const [data, setData] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const { id } = useSelector((state) => state.auth);

  const [cedulaIngresada, setCedulaIngresada] = useState("");

  const [vehiculo, setVehiculo] = useState([]);

  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState([]);

  // Datos de inventario
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInventario(token);
      setData(response);
    };
    fetchData();
  }, []);

  // Obtenemos valores necesarios del inventario
  useEffect(() => {
    const filtrarVehiculo = (vehiculos) => {
      const vehiculosFiltrados = vehiculos.map((vehiculo) => ({
        id: vehiculo.id,
        marca: vehiculo.vehiculo.marca,
        modelo: vehiculo.modelo,
        kilometraje: vehiculo.kilometraje,
        color: vehiculo.color,
        valor: vehiculo.vehiculo.precio,
      }));

      return vehiculosFiltrados;
    };

    const vehiculosFiltrados = filtrarVehiculo(data);
    setVehiculo(vehiculosFiltrados);

  }, [data]);

  // Guardamos el valor del vehiculo seleccionado
  const seleccionarVehiculo = (e) => {

    setVehiculoSeleccionado(e.target.value);
    //console.log(e.target.value);
  }

  // Creamos objeto cotizacion
  const cotizacion = {
    id_inventario_vehiculo: vehiculoSeleccionado.id,
    id_vendedor: id,
    id_cliente: cedula.value,
    fecha_creacion: fecha_creacion.value,
    fecha_finalizacion: fecha_finalizacion.value,
    valor_total: vehiculoSeleccionado.valor,
  };

  //onClick para imprimir cotizacion
  const imprimirCotizacion = async (e) => {
    e.preventDefault();
    console.log(cotizacion);
  }

  //console.log(data);

  return (

    <div className="dark:text-white ">
      <main className="p-6">
        <form className="space-y-4">
          <div>
            <label htmlFor="marca-select">
              Elige un vehiculo:
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                <FormControl fullWidth>
                  <InputLabel className="dark: color-white" id="demo-simple-select-label">Vehiculos</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={vehiculoSeleccionado}
                    label="Vehiculo"
                    onChange={seleccionarVehiculo}
                  >
                    {vehiculo.map((vehiculo, index) => (
                      <MenuItem key={vehiculo.id} value={vehiculo}>
                        {
                          "Marca: " + vehiculo.marca + " - " + "Modelo: " + vehiculo.modelo + " - " + "Kms: " + vehiculo.kilometraje + " - " + "Color: " + vehiculo.color
                        }
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

        </form>

        <h2 className="mt-5 text-2xl font-bold mb-4">Introduzca los detalles del cliente</h2>

        <form>
          <div className="mt-2">
            <label
              htmlFor="marca-select">
              Ingrese su cedula:
            </label>
            <label htmlFor="marca-select">
              Ingrese su cedula:
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                <input
                  {...cedula}
                  id="cedula"
                  autoComplete="cedula"
                  required
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="linea"
              className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Fecha Creacion
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                <input
                  {...fecha_creacion}
                  id="fecha_creacion"
                  autoComplete="fecha_creacion"
                  required
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
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
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button className="mt-5 p-2 text-black border dark:text-white border-gray-300 rounded" onClick={imprimirCotizacion}>
            Obtener cotización
          </button>

        </form>

      </main>
      <section className="p-6 ">
        <h2 className="text-2xl font-bold mb-4">Resultados de la cotización</h2>
        <div className="p-4 border border-gray-300 rounded">
          <p className="text-lg">Aqui va la cotizacion</p>
        </div>
      </section>
    </div>
  )
}

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};
