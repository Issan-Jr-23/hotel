import Cabania from "../models/client.cabania.model.js";
import Usuario from '../models/transferencia.model.js';
import Habitaciones from "../models/cliente.habitaciones.model.js";

export const obtenerTotalesNiniosYAdultosEnPasadia = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Cabania.find();
  
      let totalNinios = 0;
      let totalAdultos = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "cabania") {
            totalNinios += reserva.ninios || 0; // Asegurarse de que ninios sea un número
            totalAdultos += reserva.adultos || 0; // Asegurarse de que adultos sea un número
          }
        });
      });
  
      clientes.forEach((personas) => {
        if (personas.servicio === "cabania") {
          totalNinios += personas.cantidadPersonas.ninios || 0;
          totalAdultos += personas.cantidadPersonas.adultos || 0;
        }
      });
  
      res.json({ totalNinios, totalAdultos });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };
  
  export const totalgenerado = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Cabania.find();
  
      let totalPago = 0;
      let totalPagoPendiente = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "cabania") {
            totalPago += reserva.pago || 0;
            totalPagoPendiente += reserva.pagoPendiente || 0;
          }
        });
      });
  
      clientes.forEach((x) => {
        if (x.servicio === "cabania") {
          totalPago += x.pagoAnticipado || 0;
          totalPagoPendiente += x.pagoPendiente || 0;
        }
      });
  
      res.json({ totalPago, totalPagoPendiente });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };


export const obtenerTotalesNiniosYAdultosEnHabitaciones = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Habitaciones.find();
  
      let totalNinios = 0;
      let totalAdultos = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "habitaciones") {
            totalNinios += reserva.ninios || 0; // Asegurarse de que ninios sea un número
            totalAdultos += reserva.adultos || 0; // Asegurarse de que adultos sea un número
          }
        });
      });
  
      clientes.forEach((personas) => {
        if (personas.servicio === "habitaciones") {
          totalNinios += personas.cantidadPersonas.ninios || 0;
          totalAdultos += personas.cantidadPersonas.adultos || 0;
        }
      });
  
      res.json({ totalNinios, totalAdultos });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };
  
  export const totalgeneradoHabitaciones = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      const clientes = await Habitaciones.find();
  
      let totalPago = 0;
      let totalPagoPendiente = 0;
  
      usuarios.forEach((usuario) => {
        usuario.historial.forEach((reserva) => {
          if (reserva.servicio === "habitaciones") {
            totalPago += reserva.pago || 0;
            totalPagoPendiente += reserva.pagoPendiente || 0;
          }
        });
      });
  
      clientes.forEach((x) => {
        if (x.servicio === "habitaciones") {
          totalPago += x.pagoAnticipado || 0;
          totalPagoPendiente += x.pagoPendiente || 0;
        }
      });
  
      res.json({ totalPago, totalPagoPendiente });
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      res.status(500).send("Error al procesar la solicitud");
    }
  };
  
  export const usuariosQueMasCompraron = async (req, res) => {
    try {
        const calcularTotalPorUsuario = (coleccion) => coleccion.aggregate([
            // Desagrupar los arrays de restaurante y bebidas
            { $unwind: "$restaurante" },
            { $unwind: "$bebidas" },
            // Filtrar para incluir solo los items con precio mayor a 0
            { $match: { "restaurante.precio": { $gt: 0 }, "bebidas.precio": { $gt: 0 } } },
            // Calcular el total gastado en cada reserva
            {
                $project: {
                    identificacion: 1,
                    totalGastadoRestaurante: { $multiply: ["$restaurante.cantidad", "$restaurante.precio"] },
                    totalGastadoBebidas: { $multiply: ["$bebidas.cantidad", "$bebidas.precio"] }
                }
            },
            // Sumar el total de restaurante y bebidas
            {
                $group: {
                    _id: "$identificacion",
                    totalGastado: { $sum: { $add: ["$totalGastadoRestaurante", "$totalGastadoBebidas"] } }
                }
            }
        ]);

        // Obtener los totales de cada colección
        const [Usuario, Cabanias, Habitaciones] = await Promise.all([
            calcularTotalPorUsuario(Usuario),
            calcularTotalPorUsuario(Cabanias),
            calcularTotalPorUsuario(Habitaciones)
        ]);

        // Combinar los resultados
        let totalGastos = {};
        [Usuario, Cabanias, Habitaciones].forEach(coleccion => {
            coleccion.forEach(item => {
                totalGastos[item._id] = (totalGastos[item._id] || 0) + item.totalGastado;
            });
        });

        // Convertir a array y ordenar
        const usuariosOrdenados = Object.keys(totalGastos).map(id => ({ identificacion: id, totalGastado: totalGastos[id] }));
        usuariosOrdenados.sort((a, b) => b.totalGastado - a.totalGastado);

        res.json(usuariosOrdenados);
    } catch (error) {
        res.status(500).send('Error en el servidor: ' + error.message);
    }
}