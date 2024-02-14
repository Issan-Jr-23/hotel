import Ranch from "../models/ranch.model.js"
import estate from "../models/estate.model.js"

export const registrarProduccion = async (req, res) =>{
    try {
        const nuevoRegistro = new Ranch(req.body)
        const registroCreado  = await nuevoRegistro.save();
        res.status(201).json(registroCreado)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al crear el registro Ranch")
    }
}

export const getData = async (req, res) => {
  try {
    const dataFinca = await Ranch.find();
    res.status(200).json(dataFinca);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los clientes desde la base de datos");
  }
};






