import React from 'react';
import Tabs from '../components/Tabs.jsx';
import TableEditDelete from '../components/TableEditDelete.jsx'; // Asegúrate de que la ruta sea correcta
import { editItem, deleteItem } from './funciones.js'; // Asegúrate de que la ruta sea correcta

const Inventario = () => {
  // Datos de ejemplo para la tabla
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
