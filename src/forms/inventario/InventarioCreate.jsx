import React from 'react'
import { useState } from 'react'
import InventarioVehiculoCreate from './InventarioVehiculoCreate'
import InventarioPiezaCreate from './InventarioPiezasCreate'

const InventarioCreate = () => {
    const [seleccion, setSeleccion] = useState('');

  const manejarCambio = (e) => {
    setSeleccion(e.target.value);
    // Aquí puedes agregar lógica adicional para manejar la selección
  };

  return (
    <div>
      <label htmlFor="dropdown">Elige una categoría:</label>
      <select id="dropdown" value={seleccion} onChange={manejarCambio}>
        <option value="default">Selecciona una opción</option>
        <option value="pieza">Pieza</option>
        <option value="vehiculo">Vehículo</option>
      </select>
        {seleccion === 'pieza' && <InventarioPiezaCreate />}
        {seleccion === 'vehiculo' && <InventarioVehiculoCreate />}
    </div>
  );

}

export default InventarioCreate