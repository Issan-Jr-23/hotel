import { mongoose } from "mongoose";
import moment from 'moment';
import Habitaciones from "../models/cliente.habitaciones.model.js";
import Usuario from "../models/transferencia.model.js"

export const obtenerClientes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 15;

    const totalClientes = await Habitaciones.countDocuments();
    const totalPages = Math.ceil(totalClientes / pageSize);
    
    const skip = (page - 1) * pageSize;

    const pipeline = [
      { $sort: { fechaDeRegistro: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const clientesObtenidos = await Habitaciones.aggregate(pipeline);

    res.status(200).json({
      clientes: clientesObtenidos,
      page,
      totalPages,
      pageSize,
      totalClientes
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};

export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Habitaciones(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar el cliente en la base de datos");
  }
};

export const deleteClient = async (req, res) => {
  const identificacion = req.params.id; 

  try {
    const resultado = await Habitaciones.deleteOne({ _id: identificacion }); 
    if (resultado.deletedCount > 0) {
      res.status(200).json({ message: `Usuario con identificación "${identificacion}" eliminado con éxito.` });
    } else {
      res.status(404).json({ message: `No se encontró un usuario con la identificación "${identificacion}".` });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

// export const deleteProducto = async (req, res) => {
//   const identificacion = req.params.id; 
//   console.log("delete registro: "+identificacion)

//   try {
//     const resultado = await Cliente.deleteOne({ _id: identificacion }); 
//     if (resultado.deletedCount > 0) {
//       res.status(200).json({ message: `Usuario con identificación "${identificacion}" eliminado con éxito.` });
//     } else {
//       res.status(404).json({ message: `No se encontró un usuario con la identificación "${identificacion}".` });
//     }
//   } catch (error) {
//     console.error('Error al eliminar el usuario:', error);
//     res.status(500).json({ message: 'Error interno del servidor.' });
//   }
// }

export const updateClient = async (req, res) => {
  const identificacion = req.params.identificacion;
  const { nombre, pagoPendienteTotal, reserva, bebidas } = req.body;

  try {
    const usuarioActualizado = await Habitaciones.findOneAndUpdate(
      { identificacion },
      { nombre, pagoPendienteTotal, reserva, bebidas },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado correctamente', usuarioActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const addBebida = async (req, res) => {
  const { id, bebida } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      let index = -1;
      // Buscar si la bebida ya existe en el registro del cliente y coincide en tipo (cortesía o no)
      index = cliente.bebidas.findIndex(b => 
        b.id === bebida.id && 
        b.mensaje === bebida.mensaje && // Asegurarse de que el tipo (cortesía o no) sea el mismo
        (b.fechaDeMarca === "" || !b.fechaDeMarca) // Busca bebidas con fechaDeMarca como espacio en blanco o sin definir
      );

      if (index > -1) {
        // Si se encuentra una bebida existente del mismo tipo, actualiza la cantidad
        cliente.bebidas[index].cantidad += bebida.cantidad;
      } else {
        // Si no se encuentra o es de un tipo diferente, agrega la bebida nueva
        if (bebida.mensaje === "Cortesía") {
          bebida.precio = 0;
        }
        bebida.fechaDeMarca = ""; // Establecer la fechaDeMarca como espacio en blanco para todas las bebidas
        cliente.bebidas.push(bebida);
      }

      cliente.markModified('bebidas');
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la bebida al cliente' });
  }
};

export const addFood = async (req, res) => {
  const { id, food } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      let index = -1;
      // Buscar si la comida ya existe en el registro del cliente y coincide en tipo (cortesía o no)
      index = cliente.restaurante.findIndex(f => 
        f.id === food.id && 
        f.mensaje === food.mensaje && // Asegurarse de que el tipo (cortesía o no) sea el mismo
        (f.fechaDeMarca === "" || !f.fechaDeMarca)
      );

      if (index > -1) {
        // Si se encuentra una comida existente del mismo tipo, actualiza la cantidad
        cliente.restaurante[index].cantidad += food.cantidad;
      } else {
        // Si no se encuentra o es de un tipo diferente, agrega la comida nueva
        if (food.mensaje === "Cortesía") {
          food.precio = 0;
        }
        food.fechaDeMarca = ""; // Establecer la fechaDeMarca como espacio en blanco para todas las comidas
        cliente.restaurante.push(food);
      }

      cliente.markModified('restaurante');
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la comida al cliente' });
  }
};

export const obtenerCPI = async (req, res) => {
  try {
    const clientId = req.params.id;

    const cliente = await Habitaciones.findById(clientId);

    if (!cliente) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.json({
      cantidadPersonas: cliente.cantidadPersonas,
      cantidadDeCortesias: cliente.cantidadDeCortesias,
      cantidadDeCortesiasF: cliente.cantidadDeCortesiasF,
      cantidadDeBebidas: cliente.bebidas,
      cantidadDeFood: cliente.restaurante
    });

  } catch (error) {
    res.status(500).send('Error al obtener los datos del cliente: ' + error.message);
  }
};

export const updatePP = async (req, res) => {
  const clienteId = req.params.id;
  const { pagoPendiente, mediosDePagoPendiente } = req.body; 

  try {
    const clienteActual = await Habitaciones.findOne({ identificacion: clienteId });
    if (!clienteActual) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const nuevoValorPagoPendiente = (Number(clienteActual.pagoPendiente) || 0) + Number(pagoPendiente);

    const nuevoValorTotal = clienteActual.nuevoTotal - pagoPendiente;

    const clienteActualizado = await Habitaciones.findOneAndUpdate(
      { identificacion: clienteId },
      { nuevoTotal: nuevoValorTotal, pagoPendiente: nuevoValorPagoPendiente, mediosDePagoPendiente },
      { new: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ message: 'Error al actualizar el cliente' });
    }

    res.status(200).json({ message: `Datos del cliente ${clienteId} actualizados correctamente`, cliente: clienteActualizado });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};


export const updateClientCts = async (req, res) => {
  const identificacion = req.params.id;
  const { cantidadDeCortesias, cantidadDeCortesiasF} = req.body;

  try {
    const cortesias = await Habitaciones.findOneAndUpdate(
      { _id: identificacion },
      { cantidadDeCortesias, cantidadDeCortesiasF },
      { new: true }
    );

    if (!cortesias) {
      return res.status(404).json({ mensaje: 'Cortesia no encontrado' });
    }

    res.json({ mensaje: 'Cortesia actualizada correctamente', cortesias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export const actualizarFacturacion = async (req, res) => {
  try {
    const { bebidas, restaurante,clienteId } = req.body;
    
    const cliente = await Habitaciones.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado: "+clienteId });
    }

    cliente.bebidas = bebidas;
    cliente.restaurante = restaurante;
    console.log(restaurante)

    await cliente.save();

    res.status(200).json({ message: "Facturación actualizada con éxito" });
  } catch (error) {
    console.error('Error al actualizar la facturación:', error);
    res.status(500).json({ message: "Error al actualizar la facturación" });
  }
};

export const obtenerClienteId = async (req, res) => {
  try {
    const clientId = req.params.id;
    console.log("id de usuario :", clientId);

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).send("ID de cliente inválido");
    }
    const objectId = new mongoose.Types.ObjectId(clientId);

    const cliente = await Habitaciones.findById(objectId);
    console.log("datos del usuario: ", cliente);

    if (!cliente) {
      return res.status(404).send("Cliente no encontrado");
    }

    res.json({
      nombre: cliente.nombre,
      identificacion: cliente.identificacion 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los datos del cliente: " + error.message);
  }
};

export const addBebidaAdicional = async (req, res) => {
  const {id} = req.params;
  const { bebida } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      let index = -1;
      index = cliente.bebidas.findIndex(
        (b) =>
          b.itemId === bebida.itemId &&
          b.mensaje === bebida.mensaje && 
          (b.fechaDeMarca === "" || !b.fechaDeMarca) 
      );

      if (index > -1) {
        cliente.bebidas[index].cantidad += bebida.cantidad;
      } else {
        if (bebida.mensaje === "Cortesía") {
          bebida.precio = 0;
        }
        bebida.fechaDeMarca = ""; 
        cliente.bebidas.push(bebida);
      }

      cliente.markModified("bebidas");
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la bebida al cliente" });
  }
};

export const addItemRecepcion = async (req, res) => {
  const {id} = req.params;
  const { bebida } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      let index = -1;
      index = cliente.recepcion.findIndex(
        (b) =>
          b.itemIdRec === bebida.itemIdRec &&
          b.mensaje === bebida.mensaje && 
          (b.fechaDeMarca === "" || !b.fechaDeMarca) 
      );

      if (index > -1) {
        cliente.recepcion[index].cantidad += bebida.cantidad;
      } else {
        if (bebida.mensaje === "Cortesía") {
          bebida.precio = 0;
        }
        bebida.fechaDeMarca = ""; 
        cliente.recepcion.push(bebida);
      }

      cliente.markModified("recepcion");
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la bebida al cliente" });
  }
};

export const addDescorche = async (req, res) => {
  const { id } = req.params;
  const { descorche } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      const descorcheModificado = {
        ...descorche,
        precio: Number(descorche.precio)
      };

      if (!isNaN(descorcheModificado.precio)) {
        cliente.descorche.push(descorcheModificado);

        await cliente.save();
        res.status(200).json(cliente);
      } else {
        res.status(400).json({ message: "El precio del descorche debe ser un número válido." });
      }
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la bebida al cliente" });
  }
};

export const addFoodAdicional = async (req, res) => {
  const {id} = req.params;
  const { food } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      let index = -1;
      // Buscar si la comida ya existe en el registro del cliente y coincide en tipo (cortesía o no)
      index = cliente.restaurante.findIndex(
        (f) =>
          f.id === food.id &&
          f.mensaje === food.mensaje && // Asegurarse de que el tipo (cortesía o no) sea el mismo
          (f.fechaDeMarca === "" || !f.fechaDeMarca)
      );

      if (index > -1) {
        // Si se encuentra una comida existente del mismo tipo, actualiza la cantidad
        cliente.restaurante[index].cantidad += food.cantidad;
      } else {
        // Si no se encuentra o es de un tipo diferente, agrega la comida nueva
        if (food.mensaje === "Cortesía") {
          food.precio = 0;
        }
        food.fechaDeMarca = ""; // Establecer la fechaDeMarca como espacio en blanco para todas las comidas
        cliente.restaurante.push(food);
      }

      cliente.markModified("restaurante");
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la comida al cliente" });
  }
};


export const updateUserStatus = async (req, res) => {
  const { userId, estado } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Falta el userId" });
  }

  if (!estado) {
    return res.status(400).json({ error: "Falta el estado" });
  }

  try {
    let update = { estado };

    if (estado === 'activo') {
      const fechaConResta = moment().subtract(5, 'hours').toDate();
      update.fechaActivacion = fechaConResta;
    }else if(estado === "finalizado"){
      const fechaConResta = moment().subtract(5, 'hours').toDate();
      update.fechaActivacion = fechaConResta;
    }

    const clienteActualizado = await Habitaciones.findByIdAndUpdate(userId, update, { new: true });

    if (!clienteActualizado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Estado actualizado con éxito", cliente: clienteActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el estado" });
  }
};


export const addFoodAdicionalSubproducto = async (req, res) => {
  const {id} = req.params;
  const { food } = req.body;
  console.log("datos a guardar :", food)

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {
      let index = -1;
      index = cliente.restaurante.findIndex(
        (f) =>
          f.itemIdSubproducto === food.itemIdSubproducto 
      );
      if (index > -1) {
        cliente.restaurante[index].cantidad += food.cantidad;
        cliente.restaurante.push(food);
      }

      cliente.markModified("restaurante");
      await cliente.save();
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar la comida al cliente" });
  }
};






export const resTotal = async (req, res) => {
  try {
    const identificacion = req.params.id;
    console.log("response: ", identificacion)
     const usuario = await Habitaciones.findOne({ identificacion: identificacion });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    let totalRes = 0;
    let totalBar = 0;
    let totalRec = 0;
    let totalDes = 0;
    if (usuario.restaurante && usuario.restaurante.length > 0) {
      usuario.restaurante.forEach((item) => {
        totalRes += item.cantidad * item.precio;
      });
    }
    if (usuario.bebidas && usuario.bebidas.length > 0) {
      usuario.bebidas.forEach((item) => {
        totalBar += item.cantidad * item.precio;
      });
    }

    if (usuario.recepcion && usuario.recepcion.length > 0) {
      usuario.recepcion.forEach((item) => {
        totalRec += item.cantidad * item.precio;
      });
    }

    if(usuario.descorche && usuario.recepcion.length > 0){
      usuario.descorche.forEach((item) => {
        totalDes += item.precio;
      })
    }

    res.status(200).json({
  restaurante: totalRes || 0,
  bar: totalBar || 0,
  recepcion: totalRec || 0,
  descorche: totalDes || 0,
  total: (totalRes || 0) + (totalBar || 0) + (totalRec || 0) + (totalDes || 0)
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const postPago = async (req, res) => {
  try {
    const identificacion = req.params.id;
    console.log("id: ", identificacion)
    console.log("response: ", identificacion)
     const usuario = await Habitaciones.findOne({ identificacion: identificacion });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    let totalRes = 0;
    let totalBar = 0;
    let totalRec = 0;
    let totalDes = 0;
    let reserva = "";
    let anticipado = 0;
    let posterior = 0;
    let pendiente = 0;
    let id = 0;
    if (usuario.restaurante && usuario.restaurante.length > 0) {
      usuario.restaurante.forEach((item) => {
        totalRes += item.cantidad * item.precio;
      });
    }

    if (usuario.bebidas && usuario.bebidas.length > 0) {
      usuario.bebidas.forEach((item) => {
        totalBar += item.cantidad * item.precio;
      });
    }

    if (usuario.recepcion && usuario.recepcion.length > 0) {
      usuario.recepcion.forEach((item) => {
        totalRec += item.cantidad * item.precio;
      });
    }

    if(usuario.descorche && usuario.recepcion.length > 0){
      usuario.descorche.forEach((item) => {
        totalDes += item.precio;
      })
    }

    reserva = usuario.reserva;
    anticipado = usuario.pagoAnticipado;
    posterior = usuario.pagoPendiente;
    pendiente = usuario.nuevoTotal;
    id = usuario.identificacion;

    res.status(200).json({
      restaurante: totalRes || 0,
      bar: totalBar || 0,
      recepcion: totalRec || 0,
      descorche: totalDes || 0,
      reserva: reserva,
      anticipado: anticipado || 0,
      posterior: posterior || 0,
      pendiente: pendiente || 0,
      identificacion: id || 0
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export const actualizarValor = async (req, res) => {
  try {
    const { id, valor } = req.body;
    console.log("id del usuario: ",id)

    const cliente = await Habitaciones.findOne({identificacion: id});
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    cliente.pago = valor;

    await cliente.save();

    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
  }


export const getClienteByIdentificacion = async (req, res) => {
  try {
    const identificacion = req.params.identificacion;
    const cliente = await Habitaciones.findOne({ identificacion: identificacion });

    if (!cliente) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).send('Error interno del servidor');
  }
};



export const productosCategoria = async (req, res) => {
  try {
    const pasadia = await Habitaciones.find()
    const historial = await Usuario.find()
    let total = 0;
    let totalBar = 0;
    let totalRec = 0;
    let totalDes = 0;
    let totalAd = 0;
    pasadia.forEach((data) => {
        data.restaurante?.forEach((response) => {
          if (response.adicional === "adicional") {
          totalAd += response.cantidad * response.precio;
          }else {
            total += response.cantidad * response.precio;
          }
        })

      data.bebidas?.forEach((response) => {
        if (response.adicional === "adicional") {
          totalAd += response.cantidad * response.precio;
        } else {
          totalBar += response.cantidad * response.precio;
        }
      })

      data.recepcion?.forEach((response) => {
        // if (response.adicional === "adicional") {
        //   totalAd += response.cantidad * response.precio;
        // } else {
          totalRec += response.cantidad * response.precio;
        // }
      })

      data.descorche?.forEach((response) => {
        totalDes += response.cantidad * response.precio;
      })

    })



    historial.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "habitaciones") {
        response.restaurante?.forEach((dataRes) => {
          if (dataRes.adicional === "adicional") {
          totalAd += dataRes.cantidad * dataRes.precio;
          }else{
          total += dataRes.cantidad * dataRes.precio;
          }
        })
        }
      })

      data.historial.forEach((response) => {
        if (response.servicio === "habitaciones") {
        response.bebidas?.forEach((dataRes) => {
          if (dataRes.adicional === "adicional") {
          totalAd += dataRes.cantidad * dataRes.precio;
          }else{
          totalBar += dataRes.cantidad * dataRes.precio;
          }
        })
        }
      })

        data.historial.forEach((response) => {
          if (response.servicio === "habitaciones") {
          response.recepcion?.forEach((resData) => {
          totalRec += resData.cantidad * resData.precio;
        // }
          })
          }
        })

        data.historial.forEach((response) => {
          if (response.servicio === "habitaciones") {
          response.descorche?.forEach((dataRes) => {
            totalDes += dataRes.cantidad * dataRes.precio
          })
          }
        })

    })

    res.status(200).json({
      restaurante: total || 0,
      bar: totalBar || 0,
      recepcion: totalRec || 0,
      descorche: totalDes || 0,
      adicional: totalAd || 0
    })

  } catch (error) {
    console.log(error)
  }
}

// fecha activacion y fecha de finalizacion

export const fechaActivacion = async (req, res) => {
  try {
    const pasadia = await Habitaciones.find();

    const fechasContadas = {};
    pasadia.forEach((response) => {
      if (response.servicio === "habitaciones" && response.estado === "activo") {
        const fechaActivacion = new Date(response.fechaActivacion);

        // Formatear la fecha como "2024-01-19T14:38:14.749Z"
        const fechaFormateada = fechaActivacion.toISOString();

        fechasContadas[fechaFormateada] = (fechasContadas[fechaFormateada] || 0) + 1;
      }
    });

    const resultado = Object.entries(fechasContadas).map(([fecha, cantidad]) => ({ fecha, cantidad }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener las fechas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const fechaFinalizacion = async (req, res) => {
  const fechasContadas = {};

  try {
    const historialUsuario = await Usuario.find();
    const clientes = await Habitaciones.find();

    historialUsuario.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "habitaciones" && response.estado === "finalizado") {
        const fechaFinalizacion = response.fechaActivacion;
        fechasContadas[fechaFinalizacion] = (fechasContadas[fechaFinalizacion] || 0) + 1;
      }
      });
    });

    clientes.forEach((cliente) => {
      if (cliente.servicio === "habitaciones" && cliente.estado === "finalizado") {
        const fechaFinalizacion = cliente.fechaActivacion;
        fechasContadas[fechaFinalizacion] = (fechasContadas[fechaFinalizacion] || 0) + 1;
      }
    });

    const resultado = Object.entries(fechasContadas).map(([fecha, cantidad]) => ({ fecha, cantidad }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener las fechas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};