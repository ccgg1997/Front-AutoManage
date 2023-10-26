import { getVehiculos } from "../components/api/adress";
import BasicTable from "../components/Table";
import { useState } from "react";
import { useSelector } from "react-redux";
import VehiculoForm from "../forms/vehiculo/vehiculoForm";

const Inventario = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const titles = ["ID", "Marca", "Linea", "Tipo", "Precio"];

  const { token } = useSelector((state) => state.auth);

  const onClick = async () => {
    try {
      const response = await getVehiculos(token);
      setData(response);
      setActive(!active);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-left p-10">
        <button
          className="mt-10 mb-5 p-5 bg-lime-600 rounded"
          onClick={onClick}
        >
          Get Vehiculos
        </button>
      </div>
      <div className="flex justify-center h-screen p-10 pt-0 ">
        <BasicTable data={data} titles={titles} active={active} />
      </div>
      <div>
        <VehiculoForm />
      </div>
    </>
  );
};

export default Inventario;
