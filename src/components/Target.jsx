// Tarjet.js
import React from "react";
import {
  WrenchIcon,
  BookmarkIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { TextField, Box } from "@mui/material";
import { useState } from "react";
import { getOneOrden } from "./api/adress";

const Tarjet = ({
  iconType,
  title = "Título predeterminado",
  description = "Descripción predeterminada",
}) => {
  const Icon =
    {
      wrench: WrenchIcon,
      bookmark: BookmarkIcon,
      star: StarIcon,
      arrowRight: ArrowRightIcon,
    }[iconType] || WrenchIcon; // Default Icon

  const [inputOrden, setInputOrden] = useState("");
  const [orden, setOrden] = useState({});
  const [placa, setPlaca] = useState("");
  const [existOrden, setExistOrden] = useState(false);
  const [isCargando, setCargando] = useState(false);

  const consultarHandler = async (e) => {
    e.preventDefault();
    if (inputOrden === "") return;

    try {

      setCargando(!isCargando);
      const orden = await getOneOrden(inputOrden, placa);
      orden.cliente= orden.cliente.nombre + " " + orden.cliente.apellido;
      orden.vendedor= orden.vendedor.nombre;
      orden.sucursal_direccion= orden.sucursal.direccion;
      orden.sucursal= orden.sucursal.nombre;
      setOrden(orden);
      if (orden.placa !== placa) {
        alert("No se encontró la orden");
        setCargando(false);
        return;
      }
      setCargando(false);
      setExistOrden(!existOrden);
    } catch (error) {
      setCargando(!isCargando);
      console.log(error);
    }
  };

  const ordenChange = (e) => {
    setInputOrden(e.target.value);
  };

  const placaChange = (e) => {
    setPlaca(e.target.value);
  };

  return (
    <div className="flex bg-gray-50 rounded-3xl p-2 pl-10 pr-10 shadow-xl w-full  relative flex-col">
      <div className="absolute top-0 left-1/3 right-1/3 h-1 w-1/10 bg-amber-500 z-10"></div>
      {!existOrden && (
        <div>
          {" "}
          <div className="flex justify-center items-center gap-4 mb-6 p-4 flex-col">
            <div className="bg-amber-500/10 flex items-center justify-center rounded-full w-20 h-20">
              <Icon className="h-14 w-14 text-amber-500" />
            </div>
            <div>
              <h2 className="font-medium text-3xl ">{title}</h2>
              <p className="text-sm text-neutral-500">{description}</p>
            </div>
          </div>
          <div className="flex justify-start p-2 items-start">
            {" "}
            <h3 className="font-medium"> Datos de la órden</h3>{" "}
          </div>
          <div className="flex justify-center items-center flex-col mt-1">
            <Box
              sx={{
                width: 100,
                minWidth: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              component="form"
              onSubmit={consultarHandler}
            >
              <TextField
                fullWidth
                label="No. Orden"
                id="fullWidth"
                onChange={ordenChange}
                value={inputOrden}
                required={true}
              ></TextField>
              <TextField
                fullWidth
                label="No. Placa"
                id="fullWidth"
                onChange={placaChange}
                value={placa}
                required={true}
              ></TextField>

              <div className="flex justify-center mt-10 mb-4">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-white transition-colors bg-blue-500 w-1/2"
                  disabled={isCargando}
                >
                  {isCargando ? "Cargando..." : "Consultar"}{" "}
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </Box>
          </div>
        </div>
      )}
      {existOrden && (
        <div className="animate-slide-in flex flex-col scrollbar-hide ">
          <button
            className="flex w-full justify-start items-start p-3 h-1 mb-9 "
            onClick={() => setExistOrden(!existOrden)}
          >
            <ArrowLeftIcon className="h-10 w-10 bg-blue-500 rounded-full p-2" />
          </button>
          <div className=" ml-3">
            <h2 className="font-bold">Informacion de la orden {orden.id}</h2>
            <br></br>
            <table className="table-auto w-full">
              <tbody>
                {Object.entries(orden).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-2 py-1 text-left">{key}</td>
                    <td className="border px-4 py-2 text-left">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tarjet;
