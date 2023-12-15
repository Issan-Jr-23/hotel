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

