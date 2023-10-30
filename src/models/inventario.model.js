import mongoose from "mongoose"; 
// import moment from "moment-timezone";
  // default: () => moment.tz("America/Bogota").subtract(5, 'hours').toDate()

const inventarioSchema = new mongoose.Schema({ 


  Descripcion: {
    type: String,
    required: true,
  } , 
  tipo: {
    type: String,
    enum: ['Bebida', 'comida', 'mekato'], 
    required: true,
  }, 
  Caducidad: {
    type: Date,
  },
  CantidadInicial:{
    type: Number,
    required:true,
  },

//-------------------------
  ValorAdultos: {
    type: Number,
    required: true,
  },
  VentaAdultos: {
    type: Number,
    default: 0
  },
  TotalVentaAdultos: {
    type: Number,
    default: 0
  },

  //--------------------------------


  //----------------------------
  ValorNinios: {
    type:Number,
    required:true,
    default:0
  },

  VentaNinios: {
    type: Number,
    required:true,
    default: 0
  },

  TotalVentaNinios: {
    type: Number,
    default: 0
  },

  //-------------------------------


  CantidadRestante: {
    type: Number,
    default: 0
  },
  ValorTotal: {
    type: Number,
    default: 0
  }

});

export default mongoose.model("Inventario", inventarioSchema);
