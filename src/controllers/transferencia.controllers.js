// usuarioController.js
import Usuario from '../models/transferencia.model.js';

 export const agregarOActualizarUsuario = async (req, res) => {
  const { identificacion, datosHistorial } = req.body;

  try {
    let usuario = await Usuario.findOne({ identificacion });
    console.log("datos en el servidor: ",usuario)

    const idHistorial = `${identificacion}-${Date.now()}`;

    const nuevoRegistroHistorial = {
      idHistorial,
      ...datosHistorial
    };

    console.log("datos del servidor: ", nuevoRegistroHistorial)

    if (usuario) {
      usuario.historial.push(nuevoRegistroHistorial);
    } else {
      usuario = new Usuario({ identificacion, historial: [nuevoRegistroHistorial] });
    }

    await usuario.save();
    res.status(200).json({ message: 'Usuario agregado o actualizado con éxito', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la solicitud', error });
    console.log(error)
  }
};


export const obtenerHistorial = async (req, res) => {
  try {
    const clientesObtenidos = await Usuario.find();
    res.status(200).json(clientesObtenidos);
    console.log(clientesObtenidos)
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error al obtener los clientes desde la base de datos");
  }
};


export const obtenerHistorialDeUsuario = async (req, res) => {
  const { id } = req.params;

  try {
      const usuario = await Usuario.findOne({ identificacion: id });

      if (!usuario) {
          return res.status(404).send('Usuario no encontrado');
      }

      res.json(usuario.historial);
  } catch (error) {
      console.error('Error al obtener el historial del usuario:', error);
      res.status(500).send('Error interno del servidor');
  }
};

