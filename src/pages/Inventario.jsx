import { getVehiculos } from "../components/api/adress";
import BasicTable from "../components/Table";
import { useState } from "react";
import { useSelector } from "react-redux";
import VehiculoForm from "../forms/vehiculo/vehiculoForm";
import VehiculoUpdate from "../forms/vehiculo/vehiculoUpdateForm";
import VehiculoDelete from "../forms/vehiculo/vehiculoDeleteForm";
const Inventario = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const  [deleteActive, setDeleteActive] = useState(false);
  const titles = ["ID", "Marca", "Linea", "Tipo", "Precio"];

  const { token } = useSelector((state) => state.auth);

  const onClick = async () => {
    try {
      if (!active) {
        const response = await getVehiculos(token);
        setData(response);
        setActive(true);
        setCreateActive(false);
        setEditActive(false);
        setDeleteActive(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickAdd = () => {
    if (!createActive) {
      setCreateActive(true);
      setActive(false);
      setEditActive(false);
      setDeleteActive(false);
    }
  };

  const onClickEdit = () => {
    if (!editActive) {
      setEditActive(true);
      setActive(false);
      setCreateActive(false);
      setDeleteActive(false);
    }
  };

  const onClickDelete = () => {
    if (!deleteActive) {
      setDeleteActive(true);
      setActive(false);
      setCreateActive(false);
      setEditActive(false);
    }
  }

  return (
    <>
      <div className="flex justify-center space-x-4 sm:space-x-8 ">
        <button
          className="mt-10 mb-5 p-5 bg-lime-600 rounded"
          onClick={onClick}
        >
          Obtener Vehiculos
        </button>
        <button
          className="mt-10 mb-5 p-5 bg-lime-600 rounded"
          onClick={onClickAdd}
        >
          Agregar Vehiculo
        </button>
        <button
          className="mt-10 mb-5 p-5 bg-lime-600 rounded"
          onClick={onClickEdit}
        >
          Editar Vehiculo
        </button>
        <button
          className="mt-10 mb-5 p-5 bg-lime-600 rounded"
          onClick={onClickDelete}
        >
          Eliminar Vehiculo
        </button>
      </div>
      <div className="mt-4">
      {active && (
        <div className="flex justify-center">
          <BasicTable data={data} titles={titles} />
        </div>
      )}
      <div>{createActive && <VehiculoForm />}</div>
      <div>{editActive && <VehiculoUpdate />}</div>
      <div>{deleteActive && <VehiculoDelete />}</div>
      </div>
    </>
  );
};

export default Inventario;
