import Bebida from "../models/bebidas.model.js";

// Controlador para crear una nueva bebida
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

// Controlador para obtener todas las bebidas
export const obtenerBebidas = async (req, res) => {
  try {
    const bebidas = await Bebida.find();
    res.status(200).json(bebidas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las bebidas desde la base de datos");
  }
};

// Otros controladores para actualizar y eliminar bebidas pueden ser añadidos aquí si es necesario


