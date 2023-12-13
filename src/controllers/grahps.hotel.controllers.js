// Importa tus modelos de Mongoose para las tres colecciones
import Pasadia from "../models/client.model.js";
import Habitacion from "../models/cliente.habitaciones.model.js";
import Cabania from "../models/client.cabania.model.js";
import moment from 'moment';

export const getReservas = async (req, res) => {
  try {
    const { tipo, fechaInicio, fechaFin } = req.query;
    let fechaFiltro = {};

    // Si se proporcionan ambas fechas, se aplica el filtro
    if (fechaInicio && fechaFin) {
      const inicio = moment.utc(fechaInicio).startOf('day').toDate();
      const fin = moment.utc(fechaFin).endOf('day').toDate();
      fechaFiltro = { fechaDeRegistro: { $gte: inicio, $lte: fin } };
    }

    // Obteniendo reservas de todas las categorías si no se especifica el tipo
    const reservasPasadia = await Pasadia.find(fechaFiltro).select('reserva');
    const reservasHabitacion = await Habitacion.find(fechaFiltro).select('reserva');
    const reservasCabania = await Cabania.find(fechaFiltro).select('reserva');
  
    const todasLasReservas = [
      ...reservasPasadia.map(item => ({ tipo: 'Pasadía', reserva: item.reserva })),
      ...reservasHabitacion.map(item => ({ tipo: 'Habitación', reserva: item.reserva })),
      ...reservasCabania.map(item => ({ tipo: 'Cabaña', reserva: item.reserva }))
    ];

    res.json(todasLasReservas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del Servidor');
  }
};
  export const obtenerReservaciones = async (req, res) => {
    try {
        // Especifica solo los campos que necesitas, en este caso 'fechaPasadia'
        const pasadias = await Pasadia.find({}, 'fechaPasadia').lean();
        const cabanias = await Cabania.find({}, 'fechaPasadia').lean();
        const habitaciones = await Habitacion.find({}, 'fechaPasadia').lean();

        // Combina los resultados
        const resultado = {
            pasadias,
            cabanias,
            habitaciones
        };

        res.json(resultado);
    } catch (error) {
        res.status(500).send(error);
    }
};
