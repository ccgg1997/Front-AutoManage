import axios from "axios";
export const apiAddress = " ";

/* ------------------------------------Vehiculo----------------------------------------------*/
/**
 * Sends a POST request to the specified API endpoint to create a new vehicle.
 * @param {object} vehiculo - The vehicle object containing the details of the vehicle to be created.
 * @param {string} useToken - The authorization token to be included in the request headers.
 * @returns {object} The response data returned from the API after successfully creating the vehicle.
 * @throws {Error} If an error occurs during the request.
 * @example
 * const newVehicle = {
 *   make: "Toyota",
 *   model: "Camry",
 *   year: 2022
 * };
 * const token = "abc123";
 * try {
 *   const createdVehicle = await createVehiculo(newVehicle, token);
 *   console.log(createdVehicle);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const createVehiculo = async (vehiculo, useToken) => {
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

/**
 * Retrieves information about a vehicle from a specified API endpoint.
 * 
 * @param {number} id - The ID of the vehicle to retrieve.
 * @param {string} useToken - The token used for authentication.
 * @returns {object} - The data received from the API if the request is successful.
 * @throws {Error} - If an error occurs during the request.
 * 
 * @example
 * const vehicleId = 123;
 * const token = "abc123";
 * try {
 *   const vehicleData = await getVehiculo(vehicleId, token);
 *   console.log(vehicleData);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const getVehiculo = async (id, useToken) => {
  const vehiculoAdress = apiAddress + "/vehiculos/" + id + "/";
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

/**
 * Makes an HTTP GET request to retrieve a list of vehicles from a specific API endpoint.
 * @param {string} useToken - The authorization token used in the request headers.
 * @returns {object} - The response data containing a list of vehicles.
 * @throws {Error} - If there is an error in the request.
 * @example
 * const vehicles = await getVehiculos(token);
 * console.log(vehicles);
 */
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

/**
 * Updates a vehicle record in an API.
 * 
 * @param {object} vehiculo - The vehicle object containing the updated data.
 * @param {boolean} useToken - A flag indicating whether to use a token for authorization.
 * @returns {Promise<object>} - The updated vehicle data.
 * @throws {Error} - If an error occurs during the update process.
 * 
 * @example
 * const vehicle = {
 *   id: 123,
 *   // other vehicle properties
 * };
 * const useToken = true;
 * try {
 *   const updatedVehicle = await updateVehiculo(vehicle, useToken);
 *   console.log(updatedVehicle);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const updateVehiculo = async (vehiculo, useToken) => {
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

/**
 * Deletes a vehicle from the server using an HTTP DELETE request.
 * @param {number} id - The ID of the vehicle to be deleted.
 * @param {string} useToken - The authentication token used for authorization.
 * @returns {Promise} - A promise that resolves with the response data from the server if the request is successful. Otherwise, it rejects with an Error object.
 * @throws {Error} - If an error occurs during the request.
 * @example
 * const id = 123; // ID of the vehicle to be deleted
 * const useToken = "abc123"; // Authentication token
 * const result = await deleteVehiculo(id, useToken);
 * console.log(result); // Output: The response data from the server
 */
export const deleteVehiculo = async (id, useToken) => {
  const vehiculosAdress = apiAddress + "/vehiculos/" + id + "/";
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

/* ------------------------------------Login----------------------------------------------*/

/**
 * Authenticates a user by sending a POST request to a login API endpoint.
 * @param {Object} login - An object containing the user's email and password.
 * @returns {Promise} - A promise that resolves with the response data if the request is successful, or rejects with an error message.
 * @throws {Error} - If the email or password is empty, or if the request fails with an error status code.
 * 
 * @example
 * const login = {
 *   email: "example@example.com",
 *   password: "password123",
 * };
 * 
 * try {
 *   const response = await ApiLogin(login);
 *   console.log(response);
 * } catch (error) {
 *   console.error(error);
 * }
 */
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

/* ------------------------------------User----------------------------------------------*/
/**
 * Updates a user's information by making a PUT request to an API endpoint.
 * @param {object} user - The user object containing the user's information to be updated. It should have an `id` property.
 * @param {string} useToken - The authorization token to be included in the request headers.
 * @returns {object} The updated user object returned by the API.
 * @throws {Error} If an error occurs during the request.
 * @example
 * const user = {
 *   id: 123,
 *   name: "John Doe",
 *   email: "john.doe@example.com"
 * };
 * const token = "abc123";
 * try {
 *   const updatedUser = await userUpdate(user, token);
 *   console.log(updatedUser);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const userUpdate = async (id,user, useToken) => {
  const userAdress = apiAddress + "/usuarios/" + id + "/";
  try {
    const response = await axios.put(userAdress, user, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el usuario", error);
  }
}



