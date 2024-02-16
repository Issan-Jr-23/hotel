import mongoose from "mongoose";

// Función para obtener la fecha y hora actual menos 5 horas
function getCurrentDateMinus5Hours() {
    const now = new Date();
    now.setHours(now.getHours() - 5);
    return now;
}

const accionSchema = new mongoose.Schema({
    mensaje: {
        type: String,
    },
    actionDate: {
        type: Date,
        default: getCurrentDateMinus5Hours
    }
});

export default mongoose.model("Accion", accionSchema);
