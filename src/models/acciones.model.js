import mongoose from "mongoose";

// Función para obtener la fecha y hora actual menos 5 horas
function getCurrentDateMinus5Hours() {
    const now = new Date();
    now.setHours(now.getHours() - 5);
    return now;
}

const accionModel = new mongoose.Schema({
    mensaje: {
        type: String,
    },
    fecha: {
        type: Date,
        default: getCurrentDateMinus5Hours // Usamos la función aquí
    }
});

export default mongoose.model("Mensaje", accionModel);