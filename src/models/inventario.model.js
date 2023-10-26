import mongoose from "mongoose"; 

const inventarioSchema = new mongoose.Schema({ 
  Descripcion: {
    type: String,
    required: true,
  } ,
  tipo: {
    type: String,
    enum: ['Bebidas', 'comidas', 'mekatos'],
    required: true,
  },
  Caducidad: {
    type: Date,
    default: Date.now
  },
  CantidadInicial:{
    type: Number,
    required:true,
  },
  ValorUnitario: {
    type: Number,
    required: true,
  },

});

export default mongoose.model("Inventario", inventarioSchema);
