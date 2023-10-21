import axios from "axios";
export const apiAddress = "http://localhost:8000/api/v1";

export const getVehiculos = async (userToken) => {
  const vehiculosAdress = apiAddress + "/vehiculos/";
  try {
    const response = await axios.get(vehiculosAdress, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error("error al obtener los vehiculos", error);
  }

}

export const ApiLogin = async (login) => {
  const loginAdress = apiAddress + "/token/";
  console.log("loginadress " + loginAdress);

  try {
    const response = await axios.post(loginAdress, {
      email: login.email,
      password: login.password,
    });
    return response.data;
  } catch (error) {
    throw new Error("error al obtener el token", error);
  }

}



