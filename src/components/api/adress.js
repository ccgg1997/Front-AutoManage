import axios from "axios";
export const apiAddress = "http://localhost:8000/api/v1";

export const createVehiculo = async (vehiculo,useToken) => {
  const vehiculosAdress = apiAddress + "/vehiculos/";
  try {
    const response = await axios.post(vehiculosAdress, vehiculo, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el vehiculo", error);
  }
}

export const getVehiculo = async (id,useToken) => {
  const vehiculoAdress = apiAddress + "/vehiculos/" + id;
  try {
    const response = await axios.get(vehiculoAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    throw new Error("Error al obtener el vehiculo", error);
  }
}

export const getVehiculos = async (useToken) => {

  const vehiculosAdress = apiAddress + "/vehiculos/";
  try {
    const response = await axios.get(vehiculosAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los vehiculos", error);
  }

}

export const updateVehiculo = async (vehiculo,useToken) => {
  const vehiculosAdress = apiAddress + "/vehiculos/" + vehiculo.id + "/";
  try {
    const response = await axios.put(vehiculosAdress, vehiculo, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el vehiculo", error);
  }
}

export const deleteVehiculo = async (id,useToken) => {
  const vehiculosAdress = apiAddress + "/vehiculos/" + id;
  try {
    const response = await axios.delete(vehiculosAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el vehiculo", error);
  }
}

export const ApiLogin = async (login) => {
  const loginAdress = apiAddress + "/token/";
  if (login.email === "" || login.password === "") {
    throw new Error("Datos vacios");
  }
  try {
    const response = await axios.post(loginAdress, {
      email: login.email,
      password: login.password,
    });
      return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    throw new Error("Error en el servidor");
  }
};



