import bodyParser from "body-parser";
import Bebida from "../models/inventario.model.js";

export const crearProducto = async (req, res) => {
  try {
    const nuevaProducto = new Bebida(req.body);
    const productoGuardado = await nuevaProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar la bebida en la base de datos");
  }
};

export const obtenerInventario = async (req, res) => {
  try {
    const bebidas = await Bebida.find();
    res.status(200).json(bebidas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las bebidas desde la base de datos");
  }
};


export const obtenerMekatos = (req, res) => {
  Bebida.find({ tipo: "mekatos" })
    .then((mekatos) => {
      res.json(mekatos);
      console.log(mekatos)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener los mekatos" });
    });
};

export const obtenerDrinks = (req, res) => {
  Bebida.find({ tipo: "bebida" })
    .then((mekatos) => {
      res.json(mekatos);
      console.log(mekatos)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener los mekatos" });
    });
};

export const obtenerFood = (req, res) => {
  Bebida.find({ tipo: "comida" })
    .then((mekatos) => {
      res.json(mekatos);
      console.log(mekatos)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al obtener los mekatos" });
    });
};

export const addCv = async (req, res) => {
  try {
    const { mekatoId, additionalQuantity } = req.body;

    // Validar mekatoId y additionalQuantity según tus necesidades

    // Obtener el producto desde la base de datos
    const mekato = await Bebida.findById(mekatoId);

    // Verificar si la suma entre productosVendidos y additionalQuantity supera CantidadInicial
    if (mekato.productosVendidos + additionalQuantity <= mekato.CantidadInicial) {
      // Calcular el nuevo ValorTotal
      const nuevoValorTotal = (mekato.productosVendidos + additionalQuantity) * mekato.ValorUnitario;

      // Actualizar la cantidad vendida del producto y ValorTotal
      mekato.productosVendidos += additionalQuantity;
      mekato.ValorTotal = nuevoValorTotal;
      
      await mekato.save();

      res.json({ success: true, message: "Cantidad vendida agregada correctamente" });
    } else {
      res.status(400).json({ error: "La cantidad vendida supera el inventario disponible" });
    }
  } catch (error) {
    console.error("Error al agregar cantidad vendida:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


//---------------D E L E T E-----------------C R U D------------------U P D A T E--------------//





export const deleteProducto = async (req, res) => {
  const identificacion = req.params.id; 
  console.log(identificacion)

  try {
    const resultado = await Bebida.deleteOne({ _id: identificacion }); 
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


export const updateProducto = async (req, res) => {
  const identificacion = req.params.id;
  const { Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario,ProductosVendidos  } = req.body;

  try {
    const productoActualizado = await Bebida.findOneAndUpdate(
      { _id:identificacion },
      {Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario, ProductosVendidos},
      { new: true }
    ); 

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado correctamente', productoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};





export const updateBebidas = async (req, res) => {
  const { bebidaId, VentaAdultos, VentaNinios } = req.body;

  if (!bebidaId) {
     return res.status(400).send({ error: 'ID de la bebida es requerido' });
  }

  try {
     const updateData = {};
     if (VentaAdultos) {
        updateData.VentaAdultos = VentaAdultos;
     }
     if (VentaNinios) {
        updateData.VentaNinios = VentaNinios;
     }

     const bebidaActualizada = await Inventario.findOneAndUpdate(
        { _id: bebidaId },
        { $inc: updateData },  
        { new: true }  
     );

     if (!bebidaActualizada) {
        return res.status(404).send({ error: 'Bebida no encontrada' });
     }

     res.send(bebidaActualizada); 
  } catch (error) {
     res.status(500).send({ error: 'Error al actualizar el inventario' });
  }
};


export const filType = async (req, res) => {
  const { tipo } = req.query;
  const items = await Bebida.find(tipo ? { tipo } : {});
  res.json(items);
};






// export const addCv = async (req, res) => {
//   try {
//     const { mekatoId, additionalQuantity } = req.body;

//     // Validar mekatoId y additionalQuantity según tus necesidades

//     // Obtener el producto desde la base de datos
//     const mekato = await Bebida.findById(mekatoId);

//     // Verificar si la suma entre productosVendidos y additionalQuantity supera CantidadInicial
//     if (mekato.productosVendidos + additionalQuantity <= mekato.CantidadInicial) {
//       // Actualizar la cantidad vendida del producto y sumarla a productosVendidos
//       mekato.productosVendidos += additionalQuantity;
//       await mekato.save();

//       res.json({ success: true, message: "Cantidad vendida agregada correctamente" });
//     } else {
//       res.status(400).json({ error: "La cantidad vendida supera el inventario disponible" });
//     }
//   } catch (error) {
//     console.error("Error al agregar cantidad vendida:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };


export const updateCB = async (req, res) => {
  try {
    const { id, cantidad } = req.body;

    const bebida = await Bebida.findById(id);
    if (!bebida) {
        return res.status(404).send({ error: 'Bebida no encontrada.' });
    }

    const cantidadRestante = bebida.CantidadInicial;

    if (cantidad > cantidadRestante) {
        return res.status(400).send({ error: `Solo quedan ${cantidadRestante} unidades de ${bebida.Descripcion} disponibles en el inventario.` });
    }

    bebida.ProductosVendidos += cantidad;
    await bebida.save();  


    res.status(200).send({ message: 'Inventario actualizado con éxito.' });
} catch (error) {
    console.error('Error al actualizar el inventario de bebidas:', error);
    res.status(500).send({ error: 'Error interno del servidor.' });
}
};


export const validCB = async (req, res) => {
  try {
      const bebida = await Bebida.findById(req.params.id);
      if (!bebida) {
          return res.status(404).send({ error: 'Bebida no encontrada.' });
      }

      const cantidadRestante = bebida.CantidadInicial;
      res.status(200).send({ cantidadRestante });
  } catch (error) {
      console.error('Error al verificar la disponibilidad:', error);
      res.status(500).send({ error: 'Error interno del servidor.' });
  }
};

//food--------




// export const updateCF = async (req, res) => {
//   try {
//     const { id, cantidad } = req.body;

//     // Busca la bebida por ID
//     const bebida = await Bebida.findById(id);
//     if (!bebida) {
//         return res.status(404).send({ error: 'Bebida no encontrada.' });
//     }

//     // Calcula la cantidad restante en el inventario
//     const cantidadRestante = bebida.CantidadInicial - bebida.ProductosVendidos;

//     // Verifica si hay suficiente cantidad en el inventario
//     if (cantidad > cantidadRestante) {
//         return res.status(400).send({ error: `Solo quedan ${cantidadRestante} unidades de ${bebida.Descripcion} disponibles en el inventario.` });
//     }

//     // Actualiza la cantidad de bebidas vendidas
//     bebida.ProductosVendidos += cantidad;

//     await bebida.save();  // Guarda la bebida actualizada en la base de datos

//     res.status(200).send({ message: 'Inventario actualizado con éxito.' });
// } catch (error) {
//     console.error('Error al actualizar el inventario de bebidas:', error);
//     res.status(500).send({ error: 'Error interno del servidor.' });
// }
// };


// export const validCF = async (req, res) => {
//   try {
//       const bebida = await Bebida.findById(req.params.id);
//       if (!bebida) {
//           return res.status(404).send({ error: 'Bebida no encontrada.' });
//       }

//       const cantidadRestante = bebida.CantidadInicial - bebida.ProductosVendidos;
//       res.status(200).send({ cantidadRestante });
//   } catch (error) {
//       console.error('Error al verificar la disponibilidad:', error);
//       res.status(500).send({ error: 'Error interno del servidor.' });
//   }
// };








// food-----------------------

export const updateCF = async (req, res) => {
  try {
    const { id, cantidad } = req.body;

    const bebida = await Bebida.findById(id);
    if (!bebida) {
        return res.status(404).send({ error: 'Bebida no encontrada.' });
    }

    const cantidadRestante = bebida.CantidadInicial;
    const psubproducto = bebida.id;
    console.log("muestra el _id del producto seleccionado: "+psubproducto)
    console.log("cantidad mostrada en el server: "+cantidadRestante)

    if(psubproducto === "656f7968d49f0b774cc57d00" || psubproducto === "656f78fad49f0b774cc57cfd"){
      bebida.ProductosVendidos += cantidad;
      await bebida.save();
    }else
    if (cantidad > cantidadRestante) {
        return res.status(400).send({ error: `Solo quedan ${cantidadRestante} unidades de ${bebida.Descripcion} disponibles en el inventario.` });
    }else{

      console.log("cantidad enviadas al servidor: "+cantidad)
  
      bebida.ProductosVendidos += cantidad;
    }


    await bebida.save();

    res.status(200).send({ message: 'Inventario actualizado con éxito.' });
} catch (error) {
    console.error('Error al actualizar el inventario de bebidas:', error);
    res.status(500).send({ error: 'Error interno del servidor.' });
}
};


export const validCF = async (req, res) => {
  try {
      const bebida = await Bebida.findById(req.params.id);
      if (!bebida) {
          return res.status(404).send({ error: 'Bebida no encontrada.' });
      }

      const cantidadRestante = bebida.CantidadInicial
      res.status(200).send({ cantidadRestante });
  } catch (error) {
      console.error('Error al verificar la disponibilidad:', error);
      res.status(500).send({ error: 'Error interno del servidor.' });
  }
}; 

export const updateCSTOCKB = async (req, res) => {
  const bebidaId = req.params.id;
  const { cantidad } = req.body;
  console.log("cantidad a restar: "+cantidad)

  // Validación básica
  if (!bebidaId || cantidad === undefined) {
    return res.status(400).send({ message: 'Faltan datos requeridos (bebidaId y cantidad).' });
  }

  if (cantidad < 0) {
    return res.status(400).send({ message: 'La cantidad no puede ser negativa.' });
  }

  try {
    // Obtener la bebida actual de la base de datos
    const bebida = await Bebida.findById(bebidaId);

    if (!bebida) {
      return res.status(404).send({ message: 'Bebida no encontrada.' });
    }

    // Calcular la nueva cantidad inicial
    const nuevaCantidadInicial = bebida.CantidadInicial - cantidad;
    console.log("nueva cantidad: "+nuevaCantidadInicial)

    // Verificar que la nueva cantidad no sea negativa
    if (nuevaCantidadInicial < 0) {
      return res.status(400).send({ message: 'La cantidad a restar excede el stock inicial.' });
    }

    // Actualizar el stock inicial en la base de datos
    const bebidaActualizada = await Bebida.findByIdAndUpdate(bebidaId, { $set: { CantidadInicial: nuevaCantidadInicial } }, { new: true });
    console.log("2 log"+bebidaActualizada)

    res.status(200).send({ message: 'Stock inicial actualizado correctamente', bebida: bebidaActualizada });
  } catch (error) {
    console.error('Error al actualizar el stock inicial:', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

export const updateCSTOCKF = async (req, res) => {
  const foodId = req.params.id;
  const { cantidad } = req.body;
  console.log("cantidad a restar: " + cantidad);

  if (!foodId || cantidad === undefined) {
    return res.status(400).send({ message: 'Faltan datos requeridos (alimentoId y cantidad).' });
  }

  if (cantidad < 0) {
    return res.status(400).send({ message: 'La cantidad no puede ser negativa.' });
  }

  try {
    const alimento = await Bebida.findById(foodId);

    if (!alimento) {
      return res.status(404).send({ message: 'Alimento no encontrado.' });
    }

    const nuevaCantidadInicial = alimento.CantidadInicial - cantidad;
    console.log("nueva cantidad: " + nuevaCantidadInicial);

    if (nuevaCantidadInicial < 0) {
      return res.status(400).send({ message: 'La cantidad a restar excede el stock inicial.' });
    }

    const alimentoActualizado = await Bebida.findByIdAndUpdate(foodId, { $set: { CantidadInicial: nuevaCantidadInicial } }, { new: true });
    console.log("2 log" + alimentoActualizado);

    res.status(200).send({ message: 'Stock inicial actualizado correctamente', alimento: alimentoActualizado });
  } catch (error) {
    console.error('Error al actualizar el stock inicial:', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};


export const obtenerSubProductos = async (req, res) => {
  try {
    const productId = req.params.id;

    // Buscar el producto por ID
    const product = await Bebida.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Devolver los subproductos como respuesta
    res.json(product.subproductos);
  } catch (error) {
    console.error('Error en la solicitud /verificar-disponibilidad/:productId:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// export const actualizarSubproducto = async (req, res) => {
//   try {
//       const { foodId, subproductoId, cantidad } = req.body;

//       // Encuentra el producto padre por ID
//       const producto = await Bebida.findById(foodId);
//       if (!producto) {
//           return res.status(404).send({ message: 'Producto no encontrado.' });
//       }

//       // Encuentra el subproducto específico y actualiza su cantidad vendida
//       const subproducto = producto.subproductos.id(subproductoId);
//       if (!subproducto) {
//           return res.status(404).send({ message: 'Subproducto no encontrado.' });
//       }

//       subproducto.ProductosVendidos += cantidad;

//       await producto.save();

//       res.status(200).send({ message: 'Subproducto actualizado con éxito.' });
//   } catch (error) {
//       console.error('Error al actualizar el subproducto:', error);
//       res.status(500).send({ error: 'Error interno del servidor.' });
//   }
// };

export const updateStockSubproductos = async (req, res) => {
  const {foodId} = req.body;
  const subproductoId = req.body.subproductoId;
  const  {cantidad}  = req.body;
  console.log("Ver informacion del producto principal",foodId)
  console.log("Ver informacion del subproducto",subproductoId)
  console.log("Ver informacion de la cantidad inicial",cantidad)

  console.log("Cantidad a restar del subproducto: " + cantidad);

  if (!foodId || !subproductoId || cantidad === undefined) {
    return res.status(400).send({ message: 'Faltan datos requeridos (foodId, subProductId y cantidad).' });
  }

  if (cantidad < 0) {
    return res.status(400).send({ message: 'La cantidad no puede ser negativa.' });
  }

  try {
    const alimento = await Bebida.findById(foodId);

    if (!alimento) {
      return res.status(404).send({ message: 'Alimento no encontrado.' });
    }

    // Encuentra el subproducto específico
    const subProducto = alimento.subproductos.find(subProd => subProd._id.toString() === subproductoId);

    if (!subProducto) {
      return res.status(404).send({ message: 'Subproducto no encontrado.' });
    }

    // Actualiza la cantidad del subproducto
    subProducto.ProductosVendidos += cantidad;

    // Resta la cantidad del subproducto del stock total del producto principal
    const nuevaCantidadInicial = alimento.CantidadInicial - cantidad;
    console.log("Nueva cantidad del producto principal: " + nuevaCantidadInicial);

    if (nuevaCantidadInicial < 0) {
      return res.status(400).send({ message: 'La cantidad a restar excede el stock inicial del producto principal.' });
    }

    alimento.CantidadInicial = nuevaCantidadInicial;

    // Guardar los cambios en la base de datos
    const alimentoActualizado = await alimento.save();
    console.log("Alimento actualizado: ", alimentoActualizado);

    res.status(200).send({ message: 'Stock inicial y subproducto actualizados correctamente', alimento: alimentoActualizado });
  } catch (error) {
    console.error('Error al actualizar el stock inicial y subproducto:', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

export const guardarCortesiaItemInventory = async (req, res) => {
  const { foodId, subproductoId, cantidad } = req.body;
  console.log("datos de las cotersias que se guardaran - mensaje desde el servidor: ",foodId, subproductoId, cantidad)

  // Validar que todos los datos necesarios estén presentes
  if (!foodId || !subproductoId || cantidad === undefined) {
    return res.status(400).send({ message: 'Faltan datos requeridos (foodId, subproductoId y cantidad).' });
  }

  if (cantidad < 0) {
    return res.status(400).send({ message: 'La cantidad no puede ser negativa.' });
  }

  try {
    // Encuentra el alimento usando el modelo apropiado (ejemplo: Bebida)
    const alimento = await Bebida.findById(foodId);
    if (!alimento) {
      return res.status(404).send({ message: 'Alimento no encontrado.' });
    }

    // Encuentra el subproducto específico
    const subProducto = alimento.subproductos.find(subProd => subProd._id.toString() === subproductoId);
    if (!subProducto) {
      return res.status(404).send({ message: 'Subproducto no encontrado.' });
    }

    // Aquí asumimos que tienes un campo en el subproducto para manejar las cortesías
    subProducto.Cortesias = (subProducto.Cortesias || 0) + cantidad;

    // Guardar los cambios en la base de datos
    const alimentoActualizado = await alimento.save();
    console.log("Alimento actualizado con cortesías: ", alimentoActualizado);

    res.status(200).send({ message: 'Cortesías actualizadas correctamente', alimento: alimentoActualizado });
  } catch (error) {
    console.error('Error al actualizar las cortesías:', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

export const guardarCortesiaFoodInventory = async (req, res) => {
  const { foodId, cantidad } = req.body;
  console.log("datos de las cotersias que se guardaran - mensaje desde el servidor: ",foodId, cantidad)

  if (!foodId || cantidad === undefined) {
    return res.status(400).send({ message: 'Faltan datos requeridos (foodId, subproductoId y cantidad).' });
  }

  if (cantidad < 0) {
    return res.status(400).send({ message: 'La cantidad no puede ser negativa.' });
  }

  try {
    const alimento = await Bebida.findById(foodId);
    if (!alimento) {
      return res.status(404).send({ message: 'Alimento no encontrado.' });
    }

   alimento.Cortesias += cantidad;

    const alimentoActualizado = await alimento.save();
    console.log("Alimento actualizado con cortesías: ", alimentoActualizado);

    res.status(200).send({ message: 'Cortesías actualizadas correctamente', alimento: alimentoActualizado });
  } catch (error) {
    console.error('Error al actualizar las cortesías:', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
};

export const deleteSubproduct = async (req, res) => {
  const productId = req.params.id;
  const subproductId = req.body.idSubproducto;

  try {
      const product = await Bebida.findById(productId);
      if (!product) {
          return res.status(404).send('Producto no encontrado');
      }

      product.subproductos = product.subproductos.filter(subprod => subprod.id !== subproductId);
      await product.save();
      res.status(200).send('Subproducto eliminado con éxito');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el subproducto');
  }
};









