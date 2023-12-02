import axios from "axios";
//export const apiAddress = "https://jose-manuel.tech/api/v1";
export const apiAddress = "http://localhost:8000/api/v1";

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

export const createUsuario = async (user, useToken) => {
  const usuariosAdress = apiAddress + "/usuarios/";
  try {
    const response = await axios.post(usuariosAdress, user, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el usuario", error);
  }
}

export const updateUsers = async (user, useToken) => {
  const usuariosAdress = apiAddress + "/usuarios/" + user.id + "/";
  try {
    const response = await axios.put(usuariosAdress, user, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el usuario", error);
  }
}

export const userUpdate = async (id, user, useToken) => {
  const userAdress = apiAddress + "/usuarios/" + id + "/";
  try {
    const response = await axios.patch(userAdress, user, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el usuario", error);
  }
}

export const getUsuarios = async (useToken) => {
  const usuariosAdress = apiAddress + "/usuarios/";
  try {
    const response = await axios.get(usuariosAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("error al obtener los usuarios", error);
  }
}

export const userUpdatePassword = async (user, useToken) => {
  const userAdress = apiAddress + "/usuarios/change_password/"
  try {
    const response = await axios.post(userAdress, user, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error("Contraseña anterior incorrecta");
    } else {
      throw new Error("Error al actualizar el usuario", error);
    }
  }
}

export const getUsuarioById = async (id, useToken) => {
  const usuariosAdress = apiAddress + "/usuarios/" + id + "/";
  try {
    const response = await axios.get(usuariosAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    throw new Error("Error al obtener el usuario", error);
  }
}



export const deleteUsuario = async (id, useToken) => {
  const usuariosAdress = apiAddress + "/usuarios/" + id + "/";
  try {
    const response = await axios.patch(usuariosAdress, { is_active: false }, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el usuario", error);
  }
}

export const getUsuarioByIdentificacion = async (identificacion, useToken) => {
  const usuariosAdress = apiAddress + "/usuarios/buscar_por_identificacion/?identificacion=" + identificacion;
  try {
    const response = await axios.get(usuariosAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    }
    throw new Error("Error al obtener el usuario", error);
  }
}


/* ------------------------------------Piezas----------------------------------------------*/

/**
 * Makes an HTTP GET request to retrieve a list of vehicles from a specific API endpoint.
 * @param {string} useToken - The authorization token used in the request headers.
 * @returns {object} - The response data containing a list of vehicles.
 * @throws {Error} - If there is an error in the request.
 * @example
 * const vehicles = await getVehiculos(token);
 * console.log(vehicles);
 */
export const getPiezas = async (useToken) => {
  const piezasAdress = apiAddress + "/piezas/";
  try {
    const response = await axios.get(piezasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las piezas", error);
  }
}

/**
 * Sends a POST request to the specified API endpoint to create a new vehicle.
 * @param {object} vehiculo - The vehicle object containing the details of the vehicle to be created.
 * @param {string} useToken - The authorization token to be included in the request headers.
 * @returns {object} The response data returned from the API after successfully creating the vehicle.
 * @throws {Error} If an error occurs during the request.
 * @example
 * const newVehicle = {
 *  "nombre": "Motor de Arranque",
 *  "serie": "MARR_12",
 *  "precio": "150000.000"
    };
 * const token = "abc123";
 * try {
 *   const createdVehicle = await createPieza(newVehicle, token);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const createPieza = async (pieza, useToken) => {
  const piezasAdress = apiAddress + "/piezas/";
  try {
    const response = await axios.post(piezasAdress, pieza, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear pieza", error);
  }
}

/**
 * Updates a vehicle record in an API.
 * 
 * @param {object} Pieza - The vehicle object containing the updated data.
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
 *   const updatedVehicle = await updatePieza(vehicle, useToken);
 *   console.log(updatedVehicle);
 * } catch (error) {
 *   console.error(error);
 * }
 */
export const updatePieza = async (Pieza, useToken) => {
  const piezasAdress = apiAddress + "/piezas/" + Pieza.id + "/";
  try {
    const response = await axios.put(piezasAdress, Pieza, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el Pieza", error);
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
 * const result = await deletePieza(id, useToken);
 * console.log(result); // Output: The response data from the server
 */
export const deletePieza = async (id, useToken) => {
  const piezasAdress = apiAddress + "/piezas/" + id + "/";
  try {
    const response = await axios.delete(piezasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      throw new Error(error.response.data.detail, error);
    }
    throw new Error("Error al eliminar el pieza", error);
  }
}

//------------------------------------Inventario----------------------------------------------
//endpoint: /inventario/
export const getInventario = async (useToken) => {
  const inventarioAdress = apiAddress + "/inventario_vehiculos/?estado=DISPONIBLE";
  try {
    const response = await axios.get(inventarioAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el inventario", error);
  }
}

export const deleteVehiculoInventario = async (id, useToken) => {
  const inventarioAdress = apiAddress + "/inventario_vehiculos/" + id + "/";
  try {
    const response = await axios.delete(inventarioAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar el vehiculo del inventario", error);
  }
}

export const createVehiculoInventario = async (vehiculo, useToken) => {
  const inventarioAdress = apiAddress + "/inventario_vehiculos/";
  try {
    const response = await axios.post(inventarioAdress, vehiculo, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {

    throw new Error("Error al crear el vehiculo del inventario", error);
  }
}


//------------------------------------Ordenes----------------------------------------------
//endpoint: /ordenes/
export const getOrdenes = async (useToken) => {
  const ordenesAdress = apiAddress + "/ordenes/";
  try {
    const response = await axios.get(ordenesAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las ordenes", error);
  }
}

export const getOneOrden = async (id, useToken="asd") => {
  const ordenesAdress = apiAddress + "/ordenes/" + id+"/";
  try {
    const response = await axios.get(ordenesAdress, {
    });
    return response.data
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("Orden no encontrada", error);
    }else{
      throw new Error("Error al obtener la orden", error);
    }

  }
}

export const createOrden = async (orden, useToken) => {
  const ordenesAdress = apiAddress + "/ordenes/";
  try {
    const response = await axios.post(ordenesAdress, orden, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la orden", error);
  }
}

export const updateOrden = async (orden, useToken) => {
  const ordenesAdress = apiAddress + "/ordenes/" + orden.id + "/";
  try {
    const response = await axios.put(ordenesAdress, orden, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la orden", error);
  }
}

export const deleteOrden = async (id, useToken) => {
  const ordenesAdress = apiAddress + "/ordenes/" + id + "/";
  try {
    const response = await axios.delete(ordenesAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la orden", error);
  }
}


//------------------------REPUESTOS-------------------------------
export const getRepuestos = async (useToken) => {
  const repuestosAdress = apiAddress + "/inventario_piezas/";
  try {
    const response = await axios.get(repuestosAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los repuestos", error);
  }
}


//------------------------COTIZACION-------------------------------

export const getCotizaciones = async (useToken) => {
  const cotizacionesAdress = apiAddress + "/cotizaciones/";
  try {
    const response = await axios.get(cotizacionesAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las cotizaciones", error);
  }
}

export const getCotizacionesDetalle = async (useToken) => {
  const cotizacionesAdress = apiAddress + "/cotizaciones/detalle/";
  try {
    const response = await axios.get(cotizacionesAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las cotizaciones", error);
  }
}

export const createCotizacion = async (cotizacion, useToken) => {
  const cotizacionesAdress = apiAddress + "/cotizaciones/";
  try {
    const response = await axios.post(cotizacionesAdress, cotizacion, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la cotizacion", error);
  }
}

export const updateCotizacion = async (cotizacion, useToken) => {
  const cotizacionesAdress = apiAddress + "/cotizaciones/" + cotizacion.id + "/";
  try {
    const response = await axios.put(cotizacionesAdress, cotizacion, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar la cotizacion", error);
  }
}

export const deleteCotizacion = async (id, useToken) => {
  const cotizacionesAdress = apiAddress + "/cotizaciones/" + id + "/";
  try {
    const response = await axios.delete(cotizacionesAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al eliminar la cotizacion", error);
  }
}

//------------------------Ventas-------------------------------

export const getVentas = async (useToken) => {
  const ventasAdress = apiAddress + "/ventas/";
  try {
    const response = await axios.get(ventasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las ventas", error);
  }
}

export const createVenta = async (venta, useToken) => {
  const ventasAdress = apiAddress + "/ventas/";
  try {
    const response = await axios.post(ventasAdress, venta, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al crear la venta", error);
  }
}

export const updateVenta = async (venta, useToken) => {
  const ventasAdress = apiAddress + "/ventas/" + venta.id + "/";
  try {
    const response = await axios.put(ventasAdress, venta, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      throw new Error(error.response.data.detail, error);
    }
    throw new Error("Error al actualizar la venta", error);
  }
}

export const deleteVenta = async (id, useToken) => {
  const ventasAdress = apiAddress + "/ventas/" + id + "/";
  try {
    const response = await axios.delete(ventasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {

    throw new Error("Error al eliminar la venta", error);
  }
}


//-------------------------Sucursal------------------------------

export const getSucursales = async (useToken) => {
  const sucursalesAdress = apiAddress + "/sucursales/";
  try {
    const response = await axios.get(sucursalesAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las sucursales", error);
  }
}

//-------------------------Orden Piezas------------------------------

export const getOrdenPiezas = async (useToken) => {
  const ordenPiezasAdress = apiAddress + "/orden_piezas/";
  try {
    const response = await axios.get(ordenPiezasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {

    throw new Error("Error al obtener las ordenes de piezas", error);
  }
}
export const getOrdenPiezaById = async (id, useToken) => {
  const ordenPiezasAdress = apiAddress + "/orden_piezas/?orden=" + id;
  try {
    const response = await axios.get(ordenPiezasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data
  } catch (error) {

    throw new Error("Error al obtener la orden de piezas", error);
  }
}

export const createOrdenPieza = async (ordenPieza, useToken) => {
  const ordenPiezasAdress = apiAddress + "/orden_piezas/";
  try {
    const response = await axios.post(ordenPiezasAdress, ordenPieza, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {

    throw new Error("Error al crear la orden de piezas", error);
  }
}

export const updateOrdenPieza = async (ordenPieza, useToken) => {
  const ordenPiezasAdress = apiAddress + "/orden_piezas/" + ordenPieza.id + "/";
  try {
    const response = await axios.put(ordenPiezasAdress, ordenPieza, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {

    throw new Error("Error al actualizar la orden de piezas", error);
  }
}

export const deleteOrdenPieza = async (id, useToken) => {
  const ordenPiezasAdress = apiAddress + "/orden_piezas/" + id + "/";
  try {
    const response = await axios.delete(ordenPiezasAdress, {
      headers: {
        Authorization: "Bearer " + useToken,
      },
    });
    return response.data;
  } catch (error) {

    throw new Error("Error al eliminar la orden de piezas", error);
  }
}
