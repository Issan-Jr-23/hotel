import Accion from "../models/acciones.model.js"



export const obtenerMessage = async (req, res) => {
  try {
    const mensajesObtenidos = await Accion.find();
    res.status(200).json(mensajesObtenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};


export const registrarEliminacion = async (req, res) => {
    try {
      const { mensaje } = req.body;
  
      const nuevoMensaje = new Accion({ mensaje });
      await nuevoMensaje.save();
  
      res.status(201).json({ mensaje: 'Mensaje de eliminación guardado con éxito.' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al guardar el mensaje de eliminación.' });
    }
  };


  export const registrarEdicion = async (req, res) => {
    try {
      const { mensaje } = req.body;
  
      const nuevoRegistro = new Accion({ mensaje });
      await nuevoRegistro.save();
  
      res.status(201).json({ mensaje: 'Registro de edición guardado con éxito.' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al guardar el registro de edición.' });
    }
  };