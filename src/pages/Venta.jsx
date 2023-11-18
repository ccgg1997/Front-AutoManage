
import React from "react";
import Tabs from '../components/Tabs.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getInventario } from '../components/api/adress.js';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Venta() {
  const tabs = [
    { label: 'Cotizacion', content: <Cotizacion /> },
    { label: 'Venta', content: <h1>Hola</h1> },
  ];
  return (
    <div className="min-h-screen dark:text-white">
      <Tabs className="h-full" tabs={tabs} />
    </div>
  );
}


function Cotizacion() {
  const cedula = useField({ type: "text"});
  const fecha_creacion = useField({ type: "date" });
  const fecha_finalizacion = useField({ type: "date" });

  const [data, setData] = useState([]);

  const { token } = useSelector((state) => state.auth);

  const [marcasUnicas, setMarcasUnicas] = useState([]);
  const [modelosUnicos, setModelosUnicos] = useState([]);
  const [kilometrajesUnicos, setKilometrajesUnicos] = useState([]);

  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState("");
  const [kilometrajeSeleccionado, setKilometrajeSeleccionado] = useState("");

  // Datos de inventario
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInventario(token);
      setData(response);
    };
    fetchData();
    console.log
  }, []);

  //Filtramos por marca
  useEffect(() => {
    const obtenerMarcasUnicas = (vehiculos) => {
      const marcas = vehiculos.map(vehiculo => vehiculo.vehiculo.marca);
      return [...new Set(marcas)];
    };
    setMarcasUnicas(obtenerMarcasUnicas(data));
  }, [data]);

  //Filtramos por modelo
  useEffect(() => {
    const obtenerModelosUnicos = (vehiculos) => {
      const modelos = vehiculos.map(vehiculo => vehiculo.modelo);
      return [...new Set(modelos)];
    };
    setModelosUnicos(obtenerModelosUnicos(data));
  }, [data]);

  //Filtramos por kilometraje
  useEffect(() => {
    const obtenerKilometrajeUnicos = (vehiculos) => {
      const kilometraje = vehiculos.map(vehiculo => vehiculo.kilometraje);
      return [...new Set(kilometraje)];
    };
    setKilometrajesUnicos(obtenerKilometrajeUnicos(data));
  }, [data]);

  console.log(data);

  return (
    <div className="dark:text-white min-h-screen">

      <main className="p-6">

        <h2 className="text-2xl font-bold mb-4">Introduzca los detalles del auto</h2>
        <p className="mt-1 text-sm leading-6 mb-2 text-gray-600 dark:text-slate-300">
          Bienvenido a la seccion de cotizaciones de vehiculos, por favor ingrese informacion
          completa.
        </p>

        <form className="space-y-4">

        <div>
          <label htmlFor="marca-select">
            Elige una marca:
          </label>
          <div className="mt-2">
            <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">  
              <FormControl fullWidth>
                <InputLabel className="dark: color-white" id="demo-simple-select-label">Marca</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Marca"
                    //onChange={handleChange}
                  >
                    {marcasUnicas.map((marca, index) => (
                      <MenuItem key={index} value={marca}>{marca}</MenuItem>
                    ))}
        
                  </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="marca-select">
            Elige el modelo:
          </label>
          <div className="mt-2">
            <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">  
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Modelo"
                    //onChange={handleChange}
                  >
                    {modelosUnicos.map((modelo, index) => (
                      <MenuItem key={index} value={modelo}>{modelo}</MenuItem>
                    ))}
        
                  </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="marca-select">
            Elige su kilometraje:
          </label>
          <div className="mt-2">
            <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">  
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kilometraje</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    //value={age}
                    label="Kilometraje"
                    //onChange={handleChange}
                  >
                    {kilometrajesUnicos.map((kilometraje, index) => (
                      <MenuItem key={index} value={kilometraje}>{kilometraje}</MenuItem>
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

        <button className="mt-5 p-2 text-black border dark:text-white border-gray-300 rounded">
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
