import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/Table.jsx";
import { getCotizacionesDetalle } from "../../../components/api/adress.js";

export default function SeleccionarCotizacion({
  updateVehiculoInfo,
  actionVehiculoSeleccionado,
}) {
  const { token } = useSelector((state) => state.auth);
  const [dataCotizaciones, setDataCotizaciones] = useState([]);
  const titles = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "fecha_creacion", headerName: "Fecha Creación", width: 130 },
    { field: "fecha_vencimiento", headerName: "Fecha Vencimiento", width: 130 },
    { field: "vehiculo", headerName: "Vehículo", width: 130 },
    { field: "id_cliente", headerName: "Identificación", width: 130 },
    { field: "cliente", headerName: "Nombre", width: 130 },
    { field: "precio", headerName: "Valor Acordado", width: 130 },
    {
      field: "accion",
      headerName: "Acción",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => {
              setVehiculoInfo(params.row);
              actionVehiculoSeleccionado();
            }}
          >
            Seleccionar
          </button>
        </div>
      ),
    },
  ];

  const setVehiculoInfo = (row) => {
    console.log("en SetVehiculoinfo ", row);
    const vehiculoInfo = {
      id: row.inventario_vehiculos.id,
      vehiculo: {
        precio: row.valor_total,
        marca: row.inventario_vehiculos.vehiculo.marca,
        linea: row.inventario_vehiculos.vehiculo.linea,
      },
      identificacion_cliente: row.id_cliente,
      id_cotizacion: row.id,
    };
    updateVehiculoInfo(vehiculoInfo);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cotizaciones = await getCotizacionesDetalle(token);
      cotizaciones.map((coti) => {
        coti.id = coti.id;
        coti.fecha_creacion = coti.fecha_creacion;
        coti.fecha_vencimiento = coti.fecha_vencimiento;
        coti.vehiculo =
          coti.inventario_vehiculos.vehiculo.marca +
          " - " +
          coti.inventario_vehiculos.vehiculo.linea;
        coti.id_cliente = coti.cliente.identificacion;
        coti.cliente = coti.cliente.nombre;
        coti.precio = coti.valor_total;
      });
      setDataCotizaciones(cotizaciones);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">
        Seleccione la cotización realizada
      </h1>
      <div className="flex justify-center">
        <Table data={dataCotizaciones} titles={titles} />
      </div>
    </>
  );
}
