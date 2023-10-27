import Bebida from "../models/inventario.model.js";

export const crearProducto = async (req, res) => {
  try {
    const nuevaBebida = new Bebida(req.body);
    const bebidaGuardada = await nuevaBebida.save();
    res.status(201).json(bebidaGuardada);
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

export const actualizarBebida = async (req, res) => {
  const { id, cantidadARestar } = req.body;

  try {
    const bebida = await Bebida.findById(id);

    if (!bebida) {
      return res.status(404).json({ mensaje: 'Bebida no encontrada' });
    }

    bebida.cantidad -= cantidadARestar;

    await bebida.save();

    return res.status(200).json({ mensaje: 'Cantidad de bebida actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la bebida:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
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
  Bebida.find({ tipo: "Bebidas" })
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




