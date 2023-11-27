import AxiosInstance from "../api/axios.js";

export const registrarProduction = async (formData) => {
    try {
      await AxiosInstance.post("/registrar-produccion", formData);
      console.log("registro creado exitosamente");
    } catch (error) {
      console.log("tipo de error al crear el registro del usuario: " + error);
    }
  };


  export const obtenerData = async () => {
    try {
      const response = await AxiosInstance.get("/produccion");
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
      throw error;
    }
  };
  
