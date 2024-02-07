import Cabania from "../models/client.cabania.model.js";
import moment from 'moment';
import { mongoose } from "mongoose";

export const obtenerClientes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 3;

    const totalClientes = await Cabania.countDocuments();
    const totalPages = Math.ceil(totalClientes / pageSize);

    const skip = (page - 1) * pageSize;

    const pipeline = [
      { $sort: { fechaDeRegistro: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ];

    const clientesObtenidos = await Cabania.aggregate(pipeline);

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

export const resTotal = async (req, res) => {
  try {
    const identificacion = req.params.id;
    console.log("response: ", identificacion)
     const usuario = await Cabania.findOne({ identificacion: identificacion });
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
     const usuario = await Cabania.findOne({ identificacion: identificacion });
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

    const cliente = await Cabania.findOne({identificacion: id});
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





export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cabania(req.body);
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
    const resultado = await Cabania.deleteOne({ _id: identificacion }); 
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
    const usuarioActualizado = await Cabania.findOneAndUpdate(
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
    const cliente = await Cabania.findById(id);

    if (cliente) {
      let index = -1;
      index = cliente.bebidas.findIndex(b => 
        b.id === bebida.id && 
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
    const cliente = await Cabania.findById(id);

    if (cliente) {
      let index = -1;
      index = cliente.restaurante.findIndex(f => 
        f.id === food.id && 
        f.mensaje === food.mensaje &&
        (f.fechaDeMarca === "" || !f.fechaDeMarca)
      );

      if (index > -1) {
        cliente.restaurante[index].cantidad += food.cantidad;
      } else {
        if (food.mensaje === "Cortesía") {
          food.precio = 0;
        }
        food.fechaDeMarca = "";
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

    const cliente = await Cabania.findById(clientId);

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
    const clienteActual = await Cabania.findOne({ identificacion: clienteId });
    if (!clienteActual) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const nuevoValorPagoPendiente = (Number(clienteActual.pagoPendiente) || 0) + Number(pagoPendiente);

    const nuevoValorTotal = clienteActual.nuevoTotal - pagoPendiente;

    const clienteActualizado = await Cabania.findOneAndUpdate(
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
    const cortesias = await Cabania.findOneAndUpdate(
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
    
    const cliente = await Cabania.findById(clienteId);
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

export const getClienteByIdentificacion = async (req, res) => {
  try {
    const identificacion = req.params.identificacion;
    const cliente = await Cabania.findOne({ identificacion: identificacion });

    if (!cliente) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).send('Error interno del servidor');
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

    const clienteActualizado = await Cabania.findByIdAndUpdate(userId, update, { new: true });

    if (!clienteActualizado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Estado actualizado con éxito", cliente: clienteActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el estado" });
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

    const cliente = await Cabania.findById(objectId);
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
    const cliente = await Cabania.findById(id);

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
    const cliente = await Cabania.findById(id);

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
    // Encuentra el cliente por ID
    const cliente = await Cabania.findById(id);

    if (cliente) {
      // Convierte el precio a número antes de insertarlo
      const descorcheModificado = {
        ...descorche,
        precio: Number(descorche.precio) // Convierte el precio a número
      };

      // Asegura que la conversión no resulte en NaN (No es un Número)
      if (!isNaN(descorcheModificado.precio)) {
        // Agrega el descorche al cliente
        cliente.descorche.push(descorcheModificado);

        // Guarda el cliente modificado
        await cliente.save();
        res.status(200).json(cliente);
      } else {
        // Manejo de error si el precio no es un número válido
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
    const cliente = await Cabania.findById(id);

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


export const addFoodAdicionalSubproducto = async (req, res) => {
  const {id} = req.params;
  const { food } = req.body;
  console.log("datos a guardar :", food)

  try {
    const cliente = await Cabania.findById(id);

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
 

