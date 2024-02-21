import CabaniaStock from "../models/stockCabanias.model.js";

export const create = async (req, res) => {
  try {
    const nuevoRegistro = new CabaniaStock(req.body);
    const productoGuardado = await nuevoRegistro.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error("error al crear el registro: ", error);
  }
};

export const registroStockCabanias = async (req, res) => {
  try {
    const registros = await CabaniaStock.find();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteRegistro = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRegistro = await CabaniaStock.deleteOne({ _id: id });
    if (deleteRegistro.deletedCount > 0) {
      res
        .status(200)
        .json({
          message: `Usuario con identificación "${id}" eliminado con éxito.`,
        });
    } else {
      res
        .status(404)
        .json({
          message: `No se encontró un usuario con la identificación "${id}".`,
        });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
