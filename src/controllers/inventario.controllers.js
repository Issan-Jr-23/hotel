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
  Bebida.find({ tipo: "Bebida" })
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
  const { Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario  } = req.body;

  try {
    const productoActualizado = await Bebida.findOneAndUpdate(
      { _id:identificacion },
      {Descripcion, tipo, Caducidad, CantidadInicial, ValorUnitario},
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

    // Busca la bebida por ID
    const bebida = await Bebida.findById(id);
    if (!bebida) {
        return res.status(404).send({ error: 'Bebida no encontrada.' });
    }

    // Calcula la cantidad restante en el inventario
    const cantidadRestante = bebida.CantidadInicial - bebida.ProductosVendidos;

    // Verifica si hay suficiente cantidad en el inventario
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

      const cantidadRestante = bebida.CantidadInicial - bebida.ProductosVendidos;
      res.status(200).send({ cantidadRestante });
  } catch (error) {
      console.error('Error al verificar la disponibilidad:', error);
      res.status(500).send({ error: 'Error interno del servidor.' });
  }
};








// food-----------------------

export const updateCF = async (req, res) => {
  try {
    const { id, cantidad } = req.body;

    // Busca la bebida por ID
    const bebida = await Bebida.findById(id);
    if (!bebida) {
        return res.status(404).send({ error: 'Bebida no encontrada.' });
    }

    // Calcula la cantidad restante en el inventario
    const cantidadRestante = bebida.CantidadInicial - bebida.ProductosVendidos;

    // Verifica si hay suficiente cantidad en el inventario
    if (cantidad > cantidadRestante) {
        return res.status(400).send({ error: `Solo quedan ${cantidadRestante} unidades de ${bebida.Descripcion} disponibles en el inventario.` });
    }

    // Actualiza la cantidad de bebidas vendidas
    bebida.ProductosVendidos += cantidad;

    await bebida.save();  // Guarda la bebida actualizada en la base de datos

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

      const cantidadRestante = bebida.CantidadInicial - bebida.ProductosVendidos;
      res.status(200).send({ cantidadRestante });
  } catch (error) {
      console.error('Error al verificar la disponibilidad:', error);
      res.status(500).send({ error: 'Error interno del servidor.' });
  }
};







