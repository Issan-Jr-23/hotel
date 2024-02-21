import Accion from "../models/acciones.model.js"



export const obtenerMessage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Página solicitada
    const pageSize = 15; // Tamaño de la página

    // Calcula el número total de mensajes en la base de datos
    const totalMensajes = await Accion.countDocuments();

    // Calcula el número total de páginas
    const totalPages = Math.ceil(totalMensajes / pageSize);

    // Calcula la cantidad de registros que se deben saltar para la página actual
    const skip = (page - 1) * pageSize;

    // Define el pipeline de agregación para obtener los mensajes paginados
    const pipeline = [
      { $sort: { fechaDeRegistro: -1 } }, // Ordena por fecha de registro descendente
      { $skip: skip }, // Salta los registros anteriores a la página actual
      { $limit: pageSize } // Limita la cantidad de registros a devolver por página
    ];

    // Ejecuta la agregación para obtener los mensajes paginados
    const mensajesObtenidos = await Accion.aggregate(pipeline);

    // Devuelve los mensajes paginados junto con información de paginación
    res.status(200).json({
      mensajesObtenidos,
      page,
      totalPages,
      pageSize,
      totalMensajes
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los mensajes desde la base de datos");
  }
};





export const registrarEliminacion = async (req, res) => {
  try {
    const { userName, userId, productName, productId, deletionDate } = req.body;
    // console.log("Data enviada al servidor: ", userName, userId, productName, productId, deletionDate);

    // Crear el mensaje en el servidor
    const message = `El usuario ${userName} eliminó el producto "${productName}" (ID: ${productId}) en la fecha ${new Date(deletionDate).toLocaleString()}.`;

    // Crear un nuevo documento con el mensaje y otra información
    const nuevoMensaje = new Accion({
      userName,
      userId,
      productName,
      productId,
      deletionDate: deletionDate ? new Date(deletionDate) : new Date(),
      message // Guardar el mensaje creado en el servidor
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
    const { message } = req.body; // Cambiado de 'editedFields' a 'message'

    const nuevoRegistro = new Accion({ mensaje: message }); // Usando el mensaje directamente
    await nuevoRegistro.save();

    res.status(201).json({ mensaje: 'Registro de edición guardado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: 'Error al guardar el registro de edición.' });
  }
};
