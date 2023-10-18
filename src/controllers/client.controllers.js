import Datos from "../models/datos.model.js";


export const dataUser = async (req, res) => {
  try {
    const datos = await Datos.find({}, 'username email'); // Solo selecciona las propiedades 'nombre' y 'correo'

    res.json(datos);
  } catch (error) {
    console.error('Error al obtener datos desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener datos desde la base de datos' });
  }
};


