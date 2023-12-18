import { now } from "mongoose";
import Cliente from "../models/client.model.js";

export const obtenerClientes = async (req, res) => {
  try {
    const clientesObtenidos = await Cliente.find();
    res.status(200).json(clientesObtenidos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error al obtener los clientes desde la base de datos");
  }
};

export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar el cliente en la base de datos");
  }
};

export const deleteClient = async (req, res) => {
  const identificacion = req.params.id; 
  console.log(identificacion)

  try {
    const resultado = await Cliente.deleteOne({ _id: identificacion }); 
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
  const identificacion = req.params.id;
  const { nombre, fechaPasadia, reserva } = req.body;

  try {
    const usuarioActualizado = await Cliente.findOneAndUpdate(
      { _id:identificacion },
      { nombre, fechaPasadia, reserva },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const addBebida = async (req, res) => {
  const { id, bebida } = req.body;

  try {
    const cliente = await Cliente.findById(id);

    if (cliente) {
      let index = -1;
      index = cliente.bebidas.findIndex(
        (b) =>
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

export const addFood = async (req, res) => {
  const { id, food } = req.body;

  try {
    const cliente = await Cliente.findById(id);

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

export const obtenerCPI = async (req, res) => {
  try {
    const clientId = req.params.id;

    const cliente = await Cliente.findById(clientId);

    if (!cliente) {
      return res.status(404).send("Cliente no encontrado");
    }

    res.json({
      cantidadPersonas: cliente.cantidadPersonas,
      cantidadDeCortesias: cliente.cantidadDeCortesias,
      cantidadDeCortesiasF: cliente.cantidadDeCortesiasF,
      cantidadDeBebidas: cliente.bebidas,
      cantidadDeFood: cliente.restaurante,
    });
  } catch (error) {
    res
      .status(500)
      .send("Error al obtener los datos del cliente: " + error.message);
  }
};


export const updatePP = async (req, res) => {
  const clienteId = req.params.id;
  const { pagoPendiente, mediosDePagoPendiente } = req.body; 

  try {
    const clienteActual = await Cliente.findOne({ identificacion: clienteId });
    if (!clienteActual) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const nuevoValorTotal = clienteActual.nuevoTotal - pagoPendiente;

    const clienteActualizado = await Cliente.findOneAndUpdate(
      { identificacion: clienteId }, 
      { nuevoTotal: nuevoValorTotal, pagoPendiente, mediosDePagoPendiente },
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
  const { cantidadDeCortesias, cantidadDeCortesiasF } = req.body;

  try {
    const cortesias = await Cliente.findOneAndUpdate(
      { _id: identificacion },
      { cantidadDeCortesias, cantidadDeCortesiasF },
      { new: true }
    );

    if (!cortesias) {
      return res.status(404).json({ mensaje: "Cortesia no encontrado" });
    }

    res.json({ mensaje: "Cortesia actualizada correctamente", cortesias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};



export const actualizarFacturacion = async (req, res) => {
  try {
    const { bebidas, restaurante, clienteId } = req.body;

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res
        .status(404)
        .json({ message: "Cliente no encontrado: " + clienteId });
    }

    cliente.bebidas = bebidas;
    cliente.restaurante = restaurante;
    console.log(restaurante);

    await cliente.save();

    res.status(200).json({ message: "Facturación actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la facturación:", error);
    res.status(500).json({ message: "Error al actualizar la facturación" });
  }
};

export const getClienteByIdentificacion = async (req, res) => {
  try {
    const identificacion = req.params.identificacion;
    const cliente = await Cliente.findOne({ identificacion: identificacion });

    if (!cliente) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente:', error); 
    res.status(500).send('Error interno del servidor');
  }
};



