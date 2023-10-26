import Bebida from "../models/bebidas.model.js";

export const crearBebida = async (req, res) => {
  try {
    const nuevaBebida = new Bebida(req.body);
    const bebidaGuardada = await nuevaBebida.save();
    res.status(201).json(bebidaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar la bebida en la base de datos");
  }
};


export const obtenerBebidas = async (req, res) => {
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




