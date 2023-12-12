import Precios from "../models/precios.ranch.model.js"


export const guardarPrecios = async (req, res) => {
    try {
        const nuevoPrecio = new Precios(req.body);
        const nuevoPrecioGuardado = await nuevoPrecio.save();
        console.log("descripcion de datos: "+nuevoPrecioGuardado)
        res.status(201).send({ mensaje: "Pasadia agregado con éxito" });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al agregar Pasadia", error: error.message });
        console.log(error)
    }
}


export const obtenerPrecios = async (req, res) => {
    try {
      const precios = await Precios.find();
      res.status(200).json(precios);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las precios desde la base de datos");
    }
  };


  export const updatePrice = async (req, res) => {
    const { id } = req.params;
    const { producto, tipo, precio } = req.body;
    try {
        const updatedPrice = await Precios.findByIdAndUpdate(
            id,
            { producto, tipo, precio },
            { new: true }
        );
        if (!updatedPrice) {
            return res.status(404).send('El precio con el ID proporcionado no fue encontrado.');
        }
        res.send(updatedPrice);
    } catch (error) {
        res.status(500).send('Error al actualizar el precio: ' + error);
    }
};


