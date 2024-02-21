import AxiosInstance from "../api/axios.js";

export const registrarProduction = async (formData) => {
    try {
      await AxiosInstance.post("/registrar-produccion", formData);
      // console.log("registro creado exitosamente");
    } catch (error) {
      console.error("tipo de error al crear el registro del usuario");
    }
  };

  export const obtenerData = async () => {
    try {
      const response = await AxiosInstance.get("/produccion");
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del servidor");
    }
  };

  export const obtenerInventario = async () => {
    try {
      const response = await AxiosInstance.get("/inventario")
      return response.data
    } catch (error) {
      console.error("Error al obtener los datos del servidor: ")
    }
  }

  export const registrarData = async (formData) =>{
    try {
      await AxiosInstance.post("/registrar-data", formData)
    } catch (error) {
      console.error("Error al registrar los datos")
    }
  }

 export const deleteRegistro = async (id) => {
    try {
      await AxiosInstance.delete(`/delete-registro/${id}`);
    } catch (error) {
      console.error("Error al eliminar usuario");
    }
  };
   
 export const registrarPrecios = async (formData) => {
    try {
        await AxiosInstance.post("/crear-precio", formData);
        // console.log("¡Registro de la tabla precio creado con exito!")
    } catch (error) {
        console.error("Error al agregar Pasadia");
    }
};

export const obtenerPrecios = async () => {
  try {
    const response = await AxiosInstance.get("/precios-ranch")
    return response.data
  } catch (error) {
    console.error("Error al obtener los datos del servidor")
  }
}
  
