import React from 'react';
import Tabs from '../components/Tabs.jsx';
import Table from '../components/Table.jsx';
import { editItem, deleteItem } from './funciones.js'; // Asegúrate de que la ruta sea correcta
import { useSelector } from "react-redux";
import { useState,useEffect } from 'react';
import { getInventario } from '../components/api/adress.js';

const Inventario = () => {
  const [data, setData] = useState([]);

  // Datos de ejemplo para la tabla
  const {token} = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInventario(token);
      setData(response);
    };
    fetchData();
    console.log
  }, []);

  const editItemInventarioClick = (row) => {
    editItem(row);
  }

  const deleteItemInventarioClick = (row) => {
    deleteItem(row);
  }  

  const titles = [
    { field: 'companyName', headerName: 'CompanyName', width: 130 },
    { field: 'country', headerName: 'Country', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'accion',
      headerName: 'Accion',
      width: 200,
      renderCell: (params) => (
          <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={() => editItemInventarioClick(params.row)}>
            Editar
          </button>
          <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded" 
          onClick={() => deleteItemInventarioClick(params.row)}>
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const datosDeLaTabla = [
    {id:1, companyName: 'KnobHome', country: 'Germany', status: 'deleted' },
    {id:2, companyName: 'Squary', country: 'Sweden', status: 'active' },
    {id:3, companyName: 'ghome', country: 'Switzerland', status: 'inactive' },
  ];

  const tabs = [
    { label: 'Repuestos', content: <Table data={datosDeLaTabla} titles={titles} /> },
    { label: 'Vehiculo', content: 'Contenido del Item Two' },
    { label: 'Taller', content: 'Contenido del Item Three' },
  ];

  return (
    <Tabs tabs={tabs} />
  );
};

export default Inventario;
