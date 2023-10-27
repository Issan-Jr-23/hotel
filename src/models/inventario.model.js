import mongoose from "mongoose"; 
import moment from "moment-timezone";


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
    default: () => moment.tz("America/Bogota").subtract(5, 'hours').toDate()
  },
  CantidadInicial:{
    type: Number,
    required:true,
  },
  ValorUnitario: {
    type: Number,
    required: true,
  },
  productosVendidos: {
    type: Number,
    default: 0
  },
  ValorTotal: {
    type: Number,
    default: 0
  }

});

export default mongoose.model("Inventario", inventarioSchema);
