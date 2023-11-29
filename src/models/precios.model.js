import mongoose from "mongoose";


function getCurrentDateMinus5Hours() {
    const now = new Date();
    now.setHours(now.getHours() - 5);
    return now;
}

const preciosSchema = new mongoose.Schema({
    precio:{
        type:Number,
    },
    tipo: {
        type: String,
        enum: ["ninios","adultos","todos"],
        default: "todos",
      },
    servicio: {
        type: String,
        enum: ["pasadia","cabanias","habitaciones","cabaniaMayapo","adicional"]
      },
      fecha: {
        type: Date,
        default: getCurrentDateMinus5Hours 
    }
})

export default mongoose.model("PreciosPCH", preciosSchema);