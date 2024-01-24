import { mongoose } from "mongoose";
import moment from 'moment';
import Cliente from "../models/client.model.js";
import Usuario from '../models/transferencia.model.js';

export const obtenerClientes = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 15;

    const skip = (page - 1) * pageSize;

    const pipeline = [
      { $skip: skip },
      { $limit: pageSize },
    ];

    const clientesObtenidos = await Cliente.aggregate(pipeline);

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


export const totalPructosVendidosCortesias = async (req, res) => {
  try {
      const usuarios = await Cliente.find();

      let totalPago = 0;
      let cantidadVendidos = 0;

      usuarios.forEach(usuario => {
              if (usuario.servicio === 'pasadia') {
                usuario.restaurante.forEach( item => {
                  if (item.precio === 0){
                    totalPago += item.cantidad * item.precio;
                    cantidadVendidos += item.cantidad
                  }
                })
                usuario.bebidas.forEach( item => {
                  if (item.precio === 0) {
                    totalPago += item.cantidad * item.precio;
                    cantidadVendidos += item.cantidad;
                  }
                })
              }
      });

      res.json({ totalPago, cantidadVendidos });
  } catch (error) {
      console.error('Error al obtener los datos: ', error);
      res.status(500).send('Error al procesar la solicitud');
  }
};

export const obtenerResumenCompras = async (req, res) => {
  try {
    const clientes = await Cliente.find({}).select('identificacion nombre bebidas restaurante servicio');
    const usuarios = await Usuario.find({}).select('identificacion historial');

    const resumenCompras = new Map();

    const actualizarResumen = (identificacion, nombre, cantidad, valor) => {
      if (resumenCompras.has(identificacion)) {
        let datosUsuario = resumenCompras.get(identificacion);
        datosUsuario.cantidadTotal += cantidad;
        datosUsuario.valorTotal += valor;
  
        if (nombre && (!datosUsuario.nombre || nombre.length > datosUsuario.nombre.length)) {
          datosUsuario.nombre = nombre;
        }
      } else {
        resumenCompras.set(identificacion, {
          identificacion,
          nombre: nombre || '',
          cantidadTotal: cantidad,
          valorTotal: valor
        });
      }
    };

  
    clientes.forEach(cliente => {
      let totalBebidas = 0;
      let totalRestaurantes = 0;
      let cantidadBebidas = 0;
      let cantidadRestaurantes = 0;

      cliente.bebidas.forEach(bebida => {
        if (bebida.precio > 0) {
          totalBebidas += bebida.precio * bebida.cantidad;
          cantidadBebidas += bebida.cantidad;
        }
      });

      cliente.restaurante.forEach(restaurante => {
        if (restaurante.precio > 0) {
          totalRestaurantes += restaurante.precio * restaurante.cantidad;
          cantidadRestaurantes += restaurante.cantidad;
        }
      });

      actualizarResumen(cliente.identificacion, cliente.nombre, cantidadBebidas + cantidadRestaurantes, totalBebidas + totalRestaurantes);
    });

    
    usuarios.forEach(usuario => {
      let cantidadTotalBebidas = 0;
      let cantidadTotalRestaurantes = 0;
      let valorTotalBebidas = 0;
      let valorTotalRestaurantes = 0;
      let nombreMasLargo = '';

      usuario.historial.forEach(historial => {
        if (historial.servicio === 'pasadia') {
          if (historial.nombre && historial.nombre.length > nombreMasLargo.length) {
            nombreMasLargo = historial.nombre;
          }

          historial.bebidas.forEach(bebida => {
            cantidadTotalBebidas += bebida.cantidad;
            valorTotalBebidas += bebida.precio * bebida.cantidad;
          });

          historial.restaurante.forEach(restaurante => {
            cantidadTotalRestaurantes += restaurante.cantidad;
            valorTotalRestaurantes += restaurante.precio * restaurante.cantidad;
          });
        }
      });

      const cantidadTotal = cantidadTotalBebidas + cantidadTotalRestaurantes;
      const valorTotal = valorTotalBebidas + valorTotalRestaurantes;

      actualizarResumen(usuario.identificacion, nombreMasLargo, cantidadTotal, valorTotal);
    });


    const resultadoOrdenado = Array.from(resumenCompras.values())
      .sort((a, b) => b.valorTotal - a.valorTotal)
      .slice(0, 7);

    res.status(200).json(resultadoOrdenado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el resumen de compras" });
  }
};











// export const obtenerProductosCop = async (req, res) => {
//   try {
//     // Obtener datos de las colecciones de clientes y usuarios
//     const clientes = await Cliente.find({}).select("bebidas restaurante");
//     const usuarios = await Usuario.find({}).select("historial");

//     let productosCombinados = {};

//     // Función para agregar o actualizar productos en el objeto combinado
//     const agregarProducto = (producto, esBebida) => {
//       const { id, nombre, cantidad, precio } = producto;
//       if (precio > 0) {
//         if (productosCombinados[id]) {
//           // Si el producto ya existe, actualizar cantidad
//           productosCombinados[id].cantidad += cantidad;
//           productosCombinados[id].total += cantidad * precio;
//         } else {
//           // Si no existe, agregar nuevo producto
//           productosCombinados[id] = { id, nombre, cantidad, total: cantidad * precio, tipo: esBebida ? 'bebida' : 'restaurante' };
//         }
//       }
//     };

//     // Procesar productos de la colección de clientes
//     clientes.forEach(cliente => {
//       cliente.bebidas.forEach(bebida => agregarProducto(bebida, true));
//       cliente.restaurante.forEach(restaurante => agregarProducto(restaurante, false));
//     });

//     // Procesar productos del historial de la colección de usuarios
//     usuarios.forEach(usuario => {
//       usuario.historial.forEach(historialItem => {
//         historialItem.bebidas.forEach(bebida => agregarProducto(bebida, true));
//         historialItem.restaurante.forEach(restaurante => agregarProducto(restaurante, false));
//       });
//     });

//     // Convertir el objeto en un array para la respuesta
//     const resultado = Object.values(productosCombinados);

//     // Enviar la respuesta combinada
//     res.json(resultado);
//   } catch (error) {
//     // Manejar cualquier error que ocurra en el proceso
//     res.status(500).send(error.message);
//   }
// };

export const obtenerProductosCop = async (req, res) => {
  try {
    const clientes = await Cliente.find({ servicio: 'pasadia' }).select("bebidas restaurante");
    const usuarios = await Usuario.find({ 'historial.servicio': 'pasadia' }).select("historial");

    let productosCombinados = {};

    const agregarProducto = (producto, esBebida) => {
      const { id, nombre, cantidad, precio } = producto;
      if (precio > 0) {
        if (productosCombinados[id]) {
          productosCombinados[id].cantidad += cantidad;
          productosCombinados[id].total += cantidad * precio;
        } else {
          productosCombinados[id] = { id, nombre, cantidad, total: cantidad * precio, tipo: esBebida ? 'bebida' : 'restaurante' };
        }
      }
    };

    clientes.forEach(cliente => {
      cliente.bebidas.forEach(bebida => agregarProducto(bebida, true));
      cliente.restaurante.forEach(restaurante => agregarProducto(restaurante, false));
    });

    usuarios.forEach(usuario => {
      usuario.historial.forEach(historialItem => {
        if (historialItem.servicio === 'pasadia') {
          historialItem.bebidas.forEach(bebida => agregarProducto(bebida, true));
          historialItem.restaurante.forEach(restaurante => agregarProducto(restaurante, false));
        }
      });
    });

    let productosOrdenados = Object.values(productosCombinados).sort((a, b) => b.total - a.total);

    const resultado = productosOrdenados.slice(0, 7);

    res.json(resultado);
  } catch (error) {
    res.status(500).send(error.message);
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
    }

    const clienteActualizado = await Cliente.findByIdAndUpdate(userId, update, { new: true });

    if (!clienteActualizado) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(200).json({ message: "Estado actualizado con éxito", cliente: clienteActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el estado" });
  }
};

export const fechaActivacion = async (req, res) => {
  try {
    const pasadia = await Cliente.find();

    const fechasContadas = {};
    pasadia.forEach((response) => {
      if (response.servicio === "pasadia" && response.estado === "activo") {
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
    const historial = await Usuario.find();

    historial.forEach((data) => {
      data.historial.forEach((response) => {
        if (response.servicio === "pasadia" && response.estado === "finalizado") {
          const fechaActivacion = response.fechaActivacion;
          
          fechasContadas[fechaActivacion] = (fechasContadas[fechaActivacion] || 0) + 1;
        }
      });
    });

    const resultado = Object.entries(fechasContadas).map(([fecha, cantidad]) => ({ fecha, cantidad }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener las fechas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const obtenerFechasCompras = async (req, res) => {
  try {
    const clientes = await Cliente.find();

    let sumaPorFecha = {};
    clientes.forEach(cliente => {
        if (cliente.bebidas && cliente.bebidas.length > 0) {
            cliente.bebidas.forEach(bebida => {
                if (bebida.fecha && bebida.cantidad != null) {
                    const fechaFormateada = new Date(bebida.fecha).toISOString().split('T')[0];

                    sumaPorFecha[fechaFormateada] = (sumaPorFecha[fechaFormateada] || 0) + bebida.cantidad;
                }
            });
        }
    });
    clientes.forEach(cliente => {
        if (cliente.restaurante && cliente.restaurante.length > 0) {
            cliente.restaurante.forEach(restaurante => {
                if (restaurante.fecha && restaurante.cantidad != null) {
                    const fechaFormateada = new Date(restaurante.fecha).toISOString().split('T')[0];

                    sumaPorFecha[fechaFormateada] = (sumaPorFecha[fechaFormateada] || 0) + restaurante.cantidad;
                }
            });
        }
    });

    let resultado = [];
    for (let fecha in sumaPorFecha) {
        resultado.push({
            fecha: fecha,
            cantidad: sumaPorFecha[fecha]
        });
    }

    res.status(200).json(resultado);
} catch (error) {
    res.status(500).json({ mensaje: "Error al sumar las cantidades de bebidas por fecha", error });
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

    const cliente = await Cliente.findById(objectId);
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
    const cliente = await Cliente.findById(id);

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
    const cliente = await Cliente.findById(id);

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
    const cliente = await Cliente.findById(id);

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

export const addFoodAdicionalSubproducto = async (req, res) => {
  const {id} = req.params;
  const { food } = req.body;
  console.log("datos a guardar :", food)

  try {
    const cliente = await Cliente.findById(id);

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


export const productosMasCompradosPasadia = async (req, res) => {
  try {
    const pasadia = await Cliente.find();
    const historial = await Usuario.find();
    const productosInfo = [];
    const findProductById = (array, id) => {
      return array.find((item) => item.id === id);
    };

    pasadia.forEach((data) => {
      data.restaurante.forEach((producto) => {
        const existingProduct = findProductById(productosInfo, producto.id);
  
        if (existingProduct) {
          existingProduct.cantidad += producto.cantidad;
          existingProduct.total += producto.cantidad * producto.precio;
        } else {
          productosInfo.push({
            id: producto.id,
            nombre: producto.nombre,
            total: producto.cantidad * producto.precio,
          });
        }
      } )
    });

    pasadia.forEach((data) => {
      data.bebidas.forEach((producto) => {
        const existingProduct = findProductById(productosInfo, producto.id);
        if (existingProduct) {
          existingProduct.cantidad += producto.cantidad;
          existingProduct.total += producto.cantidad * producto.precio;
        } else {
          productosInfo.push({
            id: producto.id,
            nombre: producto.nombre,
            total: producto.cantidad * producto.precio,
          });
        }
      } )
    });


    historial.forEach((producto) => {
      producto.historial.forEach((response) => {
        if (response.servicio === "pasadia") {
        response.restaurante.forEach((data) => {
            const existingProduct = findProductById(productosInfo, data.id);
            if (existingProduct) {
              existingProduct.cantidad += data.cantidad;
              existingProduct.total += data.cantidad * data.precio;
            } else {
              productosInfo.push({
                id: data.id,
                nombre: data.nombre,
                total: data.cantidad * data.precio,
              });
            }
          });
        }
      });
    });
    historial.forEach((producto) => {
      producto.historial.forEach((response) => {
        if (response.servicio === "pasadia") {
          response.bebidas.forEach((data) => {
            const existingProduct = findProductById(productosInfo, data.id);
            if (existingProduct) {
              existingProduct.cantidad += data.cantidad;
              existingProduct.total += data.cantidad * data.precio;
            } else {
              productosInfo.push({
                id: data.id,
                nombre: data.nombre,
                total: data.cantidad * data.precio,
              });
            }
          });
        }
      });
    });



    res.status(200).json({ productosInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const productosCategoria = async (req, res) => {
  try {
    const pasadia = await Cliente.find()
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
        if (response.adicional === "adicional") {
          totalAd += response.cantidad * response.precio;
        } else {
          totalRec += response.cantidad * response.precio;
        }
      })

      data.descorche?.forEach((response) => {
        totalDes += response.cantidad * response.precio;
      })

    })
    historial.forEach((data) => {
      data.historial.forEach((response) => {
        response.restaurante?.forEach((dataRes) => {
          total += dataRes.cantidad * dataRes.precio;
        })
      })

      historial.forEach((data) => {
        data.historial.forEach((response) => {
          response.bebidas?.forEach((dataRes) => {
            totalBar += dataRes.cantidad * dataRes.precio;
          })
        })
      })

      historial.forEach((data) => {
        data.historial.forEach((response) => {
          response.recepcion?.forEach((dataRes) => {
            totalRec += dataRes.cantidad * dataRes.Precio;
          })
        })
      })

      historial.forEach((data) => {
        data.historial.forEach((response) => {
          response.descorche?.forEach((dataRes) => {
            totalDes += dataRes.cantidad * dataRes.precio
          })
        })
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



