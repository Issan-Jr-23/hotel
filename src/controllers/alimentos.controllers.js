import Alimento from "../models/alimentos.model.js";

export const crearAlimentos = async (req, res) => {
  try {
    const nuevaBebida = new Alimento(req.body);
    const bebidaGuardada = await nuevaBebida.save();
    res.status(201).json(bebidaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar la bebida en la base de datos");
  }
};


export const obtenerAlimentos = async (req, res) => {
  try {
    const Alimentos = await Alimento.find();
    res.status(200).json(Alimentos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las bebidas desde la base de datos");
  }
};




