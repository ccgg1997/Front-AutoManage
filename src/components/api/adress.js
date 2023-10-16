import axios from "axios";
export const apiAddress = "http://localhost:8000/api/v1";

export const getVehiculos = async () => {
  const vehiculosAdress = apiAddress + "/vehiculos";
  try {
    const response = await axios.get(vehiculosAdress,{
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NDkwNjM3LCJpYXQiOjE2OTc0ODg4MzcsImp0aSI6IjQ1OGQ2NDUzYTgwMzQxZTRhMGQzNmQ0YTRiN2U1MmRhIiwidXNlcl9pZCI6MiwidXNlcl9lbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJfbm9tYnJlIjoiYWRtaW5pc3RyYWRvciIsInVzZXJfYXBlbGxpZG8iOiIiLCJ1c2VyX3JvbCI6IkplZmVfVGFsbGVyIn0.TEaS6f7qF4w0JAcdJsp-GAWSE6G9VMnGiFCuJAeIRGs",
      },
    });

    return response.data
  } catch (error) {
    throw new Error("error al obtener los vehiculos",error);
  }

}


