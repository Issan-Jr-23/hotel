import mongoose from "mongoose";

const bebidaSchema = new mongoose.Schema({ 
  nombre: String,
  tamanio: String,
  cantidad: Number,
  fechaCaducidad: Date,
  precioVenta: Number,
});

export default mongoose.model("Bebidas", bebidaSchema);
