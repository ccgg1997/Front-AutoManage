import axios from "axios";
export const apiAddress = "http://localhost:8000/api/v1";

export const getVehiculos = async () => {
  const vehiculosAdress = apiAddress + "/vehiculos";
  try {
    const response = await axios.get(vehiculosAdress,{
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NDg0ODQ3LCJpYXQiOjE2OTc0ODMwNDcsImp0aSI6ImJmOWFmODUwYmUxODRkYzY5NGNlOTdmNDMyN2ZjNGY4IiwidXNlcl9pZCI6MiwidXNlcl9lbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJfbm9tYnJlIjoiYWRtaW5pc3RyYWRvciIsInVzZXJfYXBlbGxpZG8iOiIiLCJ1c2VyX3JvbCI6IkplZmVfVGFsbGVyIn0.S1Xmu_CV8yg3_f1I1jmG5A9Ra4lDNe8q9NPDzH0WTNU",
      },
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error("error al obtener los vehiculos",error);
  }

}

export const ApiLogin = async (login) => {
  const loginAdress = apiAddress + "/token/";
  console.log("loginadress "+loginAdress);
  
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



