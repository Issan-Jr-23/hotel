import Precios from "../routes/precios.routes.js"

export const guardarPrecioPasadia = async (req, res) => {
    try {
        const nuevoPasadia = new Precios(req.body);
        await nuevoPasadia.save();
        console.log("descripcion de datos: "+nuevoPasadia)
        res.status(201).send({ mensaje: "Pasadia agregado con éxito" });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al agregar Pasadia", error: error.message });
    }
}

