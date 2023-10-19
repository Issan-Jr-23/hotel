import mongoose from "mongoose";

const bebidaSchema = new mongoose.Schema({ 
  nombre: String,
  tamaño: String,
  cantidad: Number,
  fechaCaducidad: Date,
  precioVenta: Number,
});

export default mongoose.model("Alimentos", bebidaSchema);
