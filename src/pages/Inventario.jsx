import * as React from 'react';
import Tabs from '../components/Tabs';

const Inventario = () => {
  const tabs = [
    { label: 'Repuestos', content: 'Contenido del Item One' },
    { label: 'Vehiculo', content: 'Contenido del Item Two' },
    { label: 'Taller', content: 'Contenido del Item Three' },
  ];

  return (
    <div className="h-screen dark:text-white">
      <Tabs className="h-full" tabs={tabs} />
    </div>
  );
};

export default Inventario;