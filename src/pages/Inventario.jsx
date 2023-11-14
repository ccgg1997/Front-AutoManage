import * as React from 'react';
import Tabs from '../components/Tabs';

const Inventario = () => {
  const [data, setData] = useState([]);

  const titles = ["ID", "Marca", "Linea", "Tipo", "Precio"];

  const onClick = async () => {
    try {
      const response = await getVehiculos();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={onClick}>Get Vehiculos</button>
      <BasicTable data={data} titles={titles} />
    </div>
  );
};

export default Inventario;