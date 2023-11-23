import axios from "axios";
import { API_URL } from "../config";

export const registrarProduction = async (formData) => {
    try {
      await axios.post(API_URL + "/registrar-produccion", formData);
      console.log("registro creado exitosamente");
    } catch (error) {
      console.log("tipo de error al crear el registro del usuario: " + error);
    }
  };


  export const obtenerData = async () => {
    try {
      const response = await axios.get(API_URL + "/produccion");
      return response.data;
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
      throw error;
    }
  };
  
