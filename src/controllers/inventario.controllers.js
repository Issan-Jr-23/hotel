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
  Bebida.find({ tipo: "comidas" })
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




