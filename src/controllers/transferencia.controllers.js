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

export const obtenerHistorialReservasSi = async (req, res) => {
  try {
      const usuarios = await Usuario.find(); 

      const historialReservasSi = usuarios.map(usuario => ({
          identificacion: usuario.identificacion,
          reservasSi: usuario.historial.filter(item => item.reserva === 'Si')
      }));

      res.json(historialReservasSi);
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

export const obtenerHistorialReservasNo = async (req, res) => {
  try {
      const usuarios = await Usuario.find(); 

      const historialReservasSi = usuarios.map(usuario => ({
          identificacion: usuario.identificacion,
          reservasSi: usuario.historial.filter(item => item.reserva === 'No')
      }));

      res.json(historialReservasSi);
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

export const obtenerTotalesNiniosYAdultosEnPasadia = async (req, res) => {
  try {
      const usuarios = await Usuario.find(); // Obtiene todos los usuarios

      let totalNinios = 0;
      let totalAdultos = 0;

      usuarios.forEach(usuario => {
          usuario.historial.forEach(reserva => {
              if (reserva.servicio === 'pasadia') {
                  totalNinios += reserva.ninios || 0; // Asegurarse de que ninios sea un número
                  totalAdultos += reserva.adultos || 0; // Asegurarse de que adultos sea un número
              }
          });
      });

      res.json({ totalNinios, totalAdultos });
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

export const totalgenerado = async (req, res) => {
  try {
      const usuarios = await Usuario.find();

      let totalPago = 0;
      let totalPagoPendiente = 0;

      usuarios.forEach(usuario => {
          usuario.historial.forEach(reserva => {
              if (reserva.servicio === 'pasadia') {
                totalPago += reserva.pago || 0; 
                totalPagoPendiente += reserva.pagoPendiente || 0;
              }
          });
      });

      res.json({ totalPago, totalPagoPendiente });
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

