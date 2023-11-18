import React from 'react';
import Tabs from '../components/Tabs.jsx';
import TableEditDelete from '../components/TableEditDelete.jsx'; // Asegúrate de que la ruta sea correcta
import { editItem, deleteItem } from './funciones.js'; // Asegúrate de que la ruta sea correcta
import { useSelector } from "react-redux";
import { useState,useEffect } from 'react';
import { getInventario } from '../components/api/adress.js';

const Inventario = () => {
  const [data, setData] = useState([]);

  // Datos de ejemplo para la tabla
  const {token} = useSelector((state) => state.auth);
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInventario(token);
      setData(response);
    };
    fetchData();
    console.log
  }, []);

  console.log(data);

  const datosDeLaTabla = [
    { companyName: 'KnobHome', country: 'Germany', status: 'deleted' },
    { companyName: 'Squary', country: 'Sweden', status: 'active' },
    { companyName: 'ghome', country: 'Switzerland', status: 'inactive' },
  ];

  

  const tabs = [
    { label: 'Repuestos', content: <TableEditDelete data={datosDeLaTabla} editFunc={editItem} deleteFunc={deleteItem} /> },
    { label: 'Vehiculo', content: 'Contenido del Item Two' },
    { label: 'Taller', content: 'Contenido del Item Three' },
  ];

  return (
    <Tabs tabs={tabs} />
  );
};

export default Inventario;
