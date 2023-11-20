import React from "react";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { createCotizacion, getInventario, getUsuarioByIdentificacion } from '../../components/api/adress.js';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Toaster, toast } from "sonner";

export default function CotizacionForm() {

    const cedula = useField({ type: "number" });
    const fecha_creacion = useField({ type: "date" });
    const fecha_finalizacion = useField({ type: "date" });
  
    const [data, setData] = useState([]);
  
    const { token } = useSelector((state) => state.auth);
    const { id } = useSelector((state) => state.auth);
  
    const [idCliente, setIdCliente] = useState("");
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
    }
  
    // Creamos objeto cotizacion
    const cotizacion = {
      fecha_creacion: fecha_creacion.value,
      fecha_vencimiento: fecha_finalizacion.value,
      valor_total: parseInt(vehiculoSeleccionado.valor),
      inventario_vehiculos: vehiculoSeleccionado.id,
      vendedor: id,
      cliente: idCliente
    };
  
    // Limpiamos el formulario
    const clearForm = () => {
      cedula.onChange({ target: { value: "" } });
      fecha_creacion.onChange({ target: { value: "" } });
      fecha_finalizacion.onChange({ target: { value: "" } });
    };
  
    // Enviamos la cotizacion
    const enviarCotizacion = async (e) => {
      e.preventDefault();
      try {
        //comparamos si la fecha de creacion es mayor a la fecha de finalizacion
        if (cotizacion.fecha_creacion > cotizacion.fecha_vencimiento) {
          toast.error("La fecha de creacion no puede ser mayor a la de finalizacion");
          return;
        }
        let clienteBd = await getUsuarioByIdentificacion(cedula.value, token);
        if (!clienteBd) {
          toast.error("El Cliente no Existe.");
          return;
        }
        setIdCliente(clienteBd.id);
        const body = { ...cotizacion, ...{ cliente: clienteBd.id } }
        await createCotizacion(body, token);
        toast.success("Cotizacion creada con exito");
        clearForm();
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  
    return (
  
      <div className="dark:text-white ">
        <main className="p-6">
          <form className="space-y-4" onSubmit={enviarCotizacion}>
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
  
            <h2 className="mt-5 text-2xl font-bold mb-4">Introduzca los detalles del cliente</h2>
  
            <div className="mt-2">
              <label
                htmlFor="marca-select">
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
  
            <button className="mt-5 p-2 text-black border dark:text-white border-gray-300 rounded" type="submit" /*onClick={imprimirCotizacion}*/>
              Obtener cotización
            </button>
  
            <Toaster />
  
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