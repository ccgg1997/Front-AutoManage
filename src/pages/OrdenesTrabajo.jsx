import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tabs from '../components/Tabs';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const OrdenesTrabajo = () => {
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

export default OrdenesTrabajo;
