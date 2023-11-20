import { now } from "mongoose";
import Cliente from "../models/client.model.js";

export const obtenerClientes = async (req, res) => {
  try {
    const clientesObtenidos = await Cliente.find();
    res.status(200).json(clientesObtenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
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
  const identificacion = req.params.identificacion;
  const { nombre, pagoPendienteTotal, reserva, bebidas } = req.body;

  try {
    const usuarioActualizado = await Cliente.findOneAndUpdate(
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
    const cliente = await Cliente.findById(id);

    if (cliente) {
      const hoy = new Date().toISOString().split('T')[0];

      let index = -1;
      if (bebida.mensaje === "Cortesía") {
        // Buscar una bebida de cortesía existente con la misma ID y que la fechaDeMarca sea hoy o esté vacía
        index = cliente.bebidas.findIndex(b => 
          b.id === bebida.id && b.mensaje === "Cortesía" &&
          (b.fechaDeMarca === hoy || !b.fechaDeMarca)
        );
      } else {
        // Buscar una bebida normal existente con la misma ID y que la fechaDeMarca sea hoy o esté vacía
        index = cliente.bebidas.findIndex(b => 
          b.id === bebida.id && b.mensaje !== "Cortesía" &&
          (b.fechaDeMarca === hoy || !b.fechaDeMarca)
        );
      }

      if (index > -1) {
        // Si la bebida ya existe (ya sea cortesía o normal), sumar la cantidad
        cliente.bebidas[index].cantidad += bebida.cantidad;
      } else {
        // Si la bebida no existe, agregarla como nueva
        if (bebida.mensaje === "Cortesía") {
          bebida.precio = 0;
          // No asignar fechaDeMarca para nuevas bebidas de cortesía
        } else {
          // Para bebidas normales, si quieres asignar la fecha actual cuando se crea una nueva, descomenta la siguiente línea
          // bebida.fechaDeMarca = hoy;
        }
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
    const cliente = await Cliente.findById(id);

    if (cliente) {
      let index = -1;

      // Determinar si se busca una comida de cortesía o normal
      if (food.mensaje === "Cortesía") {
        // Busca si ya existe una comida de cortesía igual
        index = cliente.restaurante.findIndex(f => f.id === food.id && f.mensaje === "Cortesía");
      } else {
        // Busca si ya existe la misma comida pero que no sea de cortesía
        index = cliente.restaurante.findIndex(f => f.id === food.id && f.mensaje !== "Cortesía");
      }

      if (index > -1) {
        // Si la comida ya existe (sea cortesía o no), actualiza la cantidad
        cliente.restaurante[index].cantidad += food.cantidad;
      } else {
        // Si la comida no existe o es un tipo diferente (cortesía o no), la agrega
        if (food.mensaje === "Cortesía") {
          food.precio = 0; // Asegura que el precio de la cortesía sea 0
        }
        cliente.restaurante.push(food);
      }

      cliente.markModified('restaurante'); // Indica que el array 'restaurante' ha sido modificado
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

    const cliente = await Cliente.findById(clientId);

    if (!cliente) {
      return res.status(404).send('Cliente no encontrado');
    }

    res.json({
      cantidadPersonas: cliente.cantidadPersonas,
      cantidadDeCortesias: cliente.cantidadDeCortesias,
      cantidadDeCortesiasF: cliente.cantidadDeCortesiasF
    });

  } catch (error) {
    res.status(500).send('Error al obtener los datos del cliente: ' + error.message);
  }
};


export const updatePP = async (req, res) => {
  const clienteId = req.params.id;
  const { pagoPendiente, mediosDePagoPendiente } = req.body;

  try {
    const cliente = await Cliente.findOneAndUpdate(
      { identificacion: clienteId }, 
      { pagoPendiente, mediosDePagoPendiente },
      { new: true } 
    );

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    console.log(`Cliente con ID ${clienteId} ha sido actualizado con la siguiente información:`);
    console.log('Pago Pendiente:', pagoPendiente);
    console.log('Medios de Pago Pendiente:', mediosDePagoPendiente);

    res.status(200).json({ message: `Datos del cliente ${clienteId} actualizados correctamente`, cliente });
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
      { cantidadDeCortesias, cantidadDeCortesiasF  },
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
    
    const cliente = await Cliente.findById(clienteId);
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
      




