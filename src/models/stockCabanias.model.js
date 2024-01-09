import mongoose from "mongoose";

const stockCabania = mongoose.Schema({
    item: { type: String, default: undefined },
    descripcion: { type: String, default: undefined },
    cantidad: { type: Number, required: true },
    cabania: {
        type: String,
        enum: ["cabania1", "cabania2", "cabania3"],
        default: undefined
    },
    ubicacion: {
        type: String,
        enum: ["cuarto", "sala", "banio", "cocina"],
        default: undefined
    },
    contenido: { type: String, default: undefined }
});

export default mongoose.model("cabaniaStock", stockCabania);
