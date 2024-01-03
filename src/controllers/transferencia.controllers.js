// usuarioController.js
import Usuario from "../models/transferencia.model.js";
import Cliente from "../models/client.model.js";

export const agregarOActualizarUsuario = async (req, res) => {
  const { identificacion, datosHistorial } = req.body;

  try {
    let usuario = await Usuario.findOne({ identificacion });
    console.log("datos en el servidor: ", usuario);

    const idHistorial = `${identificacion}-${Date.now()}`;

    const nuevoRegistroHistorial = {
      idHistorial,
      ...datosHistorial,
    };

    console.log("datos del servidor: ", nuevoRegistroHistorial);

    if (usuario) {
      usuario.historial.push(nuevoRegistroHistorial);
    } else {
      usuario = new Usuario({
        identificacion,
        historial: [nuevoRegistroHistorial],
      });
    }

    await usuario.save();
    res
      .status(200)
      .json({ message: "Usuario agregado o actualizado con éxito", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error });
    console.log(error);
  }
};

export const obtenerHistorial = async (req, res) => {
  try {
    const clientesObtenidos = await Usuario.find();
    res.status(200).json(clientesObtenidos);
    console.log(clientesObtenidos);
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
      return res.status(404).send("Usuario no encontrado");
    }

    res.json(usuario.historial);
  } catch (error) {
    console.error("Error al obtener el historial del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export const obtenerHistorialReservasNo = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    const clientes = await Cliente.find();

    const historialReservasSi = usuarios.map((usuario) => ({
      identificacion: usuario.identificacion,
      reservasSi: usuario.historial.filter((item) => item.reserva === "No"),
    }));

    const reservasSiClientes = clientes.filter((cliente) => cliente.reserva === "No").map((cliente) => ({
      identificacion: cliente.identificacion,
      reserva: cliente.reserva,
    }));

    res.json({ historialReservasSi, reservasSiClientes });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const obtenerHistorialReservasSi = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    const clientes = await Cliente.find();

    const historialReservasSi = usuarios.map((usuario) => ({
      identificacion: usuario.identificacion,
      reservasSi: usuario.historial.filter((item) => item.reserva === "Si"),
    }));

    // Filter the entire 'clientes' array
    const reservasSiClientes = clientes.filter((cliente) => cliente.reserva === "Si").map((cliente) => ({
      identificacion: cliente.identificacion,
      reserva: cliente.reserva,
    }));

    res.json({ historialReservasSi, reservasSiClientes });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};



export const obtenerTotalesNiniosYAdultosEnPasadia = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    const clientes = await Cliente.find();

    let totalNinios = 0;
    let totalAdultos = 0;

    usuarios.forEach((usuario) => {
      usuario.historial.forEach((reserva) => {
        if (reserva.servicio === "pasadia") {
          totalNinios += reserva.ninios || 0; // Asegurarse de que ninios sea un número
          totalAdultos += reserva.adultos || 0; // Asegurarse de que adultos sea un número
        }
      });
    });

    clientes.forEach((personas) => {
      if (personas.servicio === "pasadia") {
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
    const clientes = await Cliente.find();

    let totalPago = 0;
    let totalPagoPendiente = 0;

    usuarios.forEach((usuario) => {
      usuario.historial.forEach((reserva) => {
        if (reserva.servicio === "pasadia") {
          totalPago += reserva.pago || 0;
          totalPagoPendiente += reserva.pagoPendiente || 0;
        }
      });
    });

    clientes.forEach((x) => {
      if (x.servicio === "pasadia") {
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

export const totalPructosVendidos = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    let totalPago = 0;
    let cantidadVendidos = 0;

    usuarios.forEach((usuario) => {
      usuario.historial.forEach((reserva) => {
        if (reserva.servicio === "pasadia") {
          reserva.restaurante.forEach((item) => {
            if (item.precio > 0) {
              totalPago += item.cantidad * item.precio;
              cantidadVendidos += item.cantidad;
            }
          });
          reserva.bebidas.forEach((item) => {
            if (item.precio > 0) {
              totalPago += item.cantidad * item.precio;
              cantidadVendidos += item.cantidad;
            }
          });
        }
      });
    });

    res.json({ totalPago, cantidadVendidos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};

export const totalPructosCortesias = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    let totalPago = 0;
    let cantidadVendidos = 0;

    usuarios.forEach((usuario) => {
      usuario.historial.forEach((reserva) => {
        if (reserva.servicio === "pasadia") {
          reserva.restaurante.forEach((item) => {
            if (item.precio === 0) {
              totalPago += item.cantidad * item.precio;
              cantidadVendidos += item.cantidad;
            }
          });
          reserva.bebidas.forEach((item) => {
            if (item.precio === 0) {
              totalPago += item.cantidad * item.precio;
              cantidadVendidos += item.cantidad;
            }
          });
        }
      });
    });

    res.json({ totalPago, cantidadVendidos });
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
