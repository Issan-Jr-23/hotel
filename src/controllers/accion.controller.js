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
    // Desestructura los campos específicos que esperas recibir
    const { userName, productName, productId, deletionDate } = req.body;

    // Crea un nuevo documento con toda la información
    const nuevoMensaje = new Accion({
      userName,
      productName,
      productId,
      deletionDate: deletionDate ? new Date(deletionDate) : new Date(),
    });

    await nuevoMensaje.save();

    res.status(201).json({ mensaje: 'Mensaje de eliminación guardado con éxito.' });
  } catch (error) {
    console.error(error); // Es bueno registrar el error para depuración
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