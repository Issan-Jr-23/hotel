import Cliente from "../models/select.drink.model.js";

export const addDrink = async (req, res) => {
  try {
    const nuevoDrink = new Cliente(req.body);
    const DrinkGuardada = await nuevoDrink.save();
    res.status(201).json(DrinkGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar el cliente en la base de datos");
  }
};
