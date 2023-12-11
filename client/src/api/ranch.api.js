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

  export const obtenerInventario = async () => {
    try {
      const response = await AxiosInstance.get("/inventario")
      return response.data
    } catch (error) {
      console.error("Error al obtener los datos del servidor: ", error)
      throw error;
    }
  }

  export const registrarData = async (formData) =>{
    try {
      await AxiosInstance.post("/registrar-data", formData) 
      console.log("¡Datos registrados con exito!")
    } catch (error) {
      console.error("Error al registrar los datos", error)
      throw error;
    }
  }

 export const deleteRegistro = async (id) => {
    try {
      await AxiosInstance.delete(`/delete-registro/${id}`);
      console.log("Usuario eliminado con éxito!");
    } catch (error) {
      console.log("datos no eliminados: ", id)
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  };
   
 export const registrarPrecios = async () => {
    try {
        await AxiosInstance.post("/precio-pasadia", formData);
        console.log("¡Registro de la tabla precio creado con exito!")
    } catch (error) {
        console.error("Error al agregar Pasadia: ", error);
    }
};

  
