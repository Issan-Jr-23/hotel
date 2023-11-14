import mongoose from "mongoose";

const datosSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Crea el modelo utilizando el esquema

export default mongoose.model("Gra", datosSchema);

