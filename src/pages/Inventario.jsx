import { getVehiculos } from '../components/api/adress';
import BasicTable from '../components/Table';
import { useState } from 'react';
import { useSelector } from "react-redux";
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex justify-left'>
        <button className="mt-10 mb-5 p-5 bg-lime-600 rounded" onClick={onClick}>Get Vehiculos</button>
      </div>
      <div className="flex justify-center h-screen p-20 pt-0">
        <BasicTable data={data} titles={titles} />
      </div>
    </>
  )
}

export default Inventario