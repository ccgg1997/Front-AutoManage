import { getVehiculos } from '../components/api/adress';
import BasicTable from '../components/Table';
import { useState } from 'react';
import { useSelector } from "react-redux";

const Inventario = () => {
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state.auth);

  const titles = ["ID", "Marca", "Linea", "Tipo", "Precio"];

  const onClick = async () => {
    try{
      console.log("hola es mi atuh"+ auth);
      const response = await getVehiculos();
      setData(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={onClick}>Get Vehiculos</button>
      <BasicTable data={data} titles={titles}/>
    </div>
  )
}

export default Inventario