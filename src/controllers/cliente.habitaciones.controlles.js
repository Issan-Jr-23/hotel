import { mongoose } from "mongoose";
import moment from 'moment';
import Habitaciones from "../models/cliente.habitaciones.model.js";

export const obtenerClientes = async (req, res) => {
  try {
    const clientesObtenidos = await Habitaciones.find();
    res.status(200).json(clientesObtenidos);
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
    // Busca el cliente por su identificación y actualiza
    const cliente = await Habitaciones.findOneAndUpdate(
      { identificacion: clienteId }, // Asegúrese de que esta línea esté utilizando la variable correcta `clienteId`
      { pagoPendiente, mediosDePagoPendiente },
      { new: true } // Devuelve el documento modificado
    );

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    console.log(`Cliente con ID ${clienteId} ha sido actualizado con la siguiente información:`);
    console.log('Pago Pendiente:', pagoPendiente);
    console.log('Medios de Pago Pendiente:', mediosDePagoPendiente);

    // Respuesta exitosa con el cliente actualizado
    res.status(200).json({ message: `Datos del cliente ${clienteId} actualizados correctamente`, cliente });
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

export const addItemRecepcion = async (req, res) => {3
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
  const {id} = req.params;
  const { descorche } = req.body;

  try {
    const cliente = await Habitaciones.findById(id);

    if (cliente) {

        cliente.descorche.push(descorche);

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

export const addFoodAdicional = async (req, res) => {
  const {id} = req.params;
  const { food } = req.body;

  try {
    const cliente = await habitaciones.findById(id);

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


