import mongoose from "mongoose";

const preciosSchema = new mongoose.Schema({
    precio:{
        type:Number,
        required:[true,"El precio es requerido"],
    },
    tipo: {
        type: String,
        enum: ["ninios","adultos","todos"],
        default: "todos",
      },
})

export default mongoose.model("PreciosCPH", preciosSchema)