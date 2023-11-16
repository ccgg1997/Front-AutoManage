import { getUsuarios } from '../components/api/adress';
import TableUser from '../components/TableUser';
import { useState } from 'react';
import { useSelector } from "react-redux";

const Usuarios = () => {
    const [data, setData] = useState([]);
  
    const titles = ["ID", "Nombre", "Email", "Identificacion", "Estado", "Rol"];
  
    const { token } = useSelector((state) => state.auth);

    const onClick = async () => {
      try {
        const response = await getUsuarios(token);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    }
  
  return (
      <div className="flex items-center justify-center h-screen">
        <button onClick={onClick}>Get Usuarios</button>
        <TableUser data={data} titles={titles} />
      </div>
    )
  }


export default Usuarios