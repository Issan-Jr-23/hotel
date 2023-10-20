import Cliente from "../models/client.model.js";

export const obtenerClientes = async (req, res) => {
  try {
    const clienteObtenido = await Cliente.find();
    res.status(200).json(clienteObtenido);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las bebidas desde la base de datos");
  }
}; 



export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar la bebida en la base de datos");
  }
};

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




