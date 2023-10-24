import mongoose from "mongoose";
import moment from "moment-timezone";

const clienteSchema = new mongoose.Schema({  
  identificacion: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  reserva: {
    type:String,
    required: true

  },
  pagoPendienteTotal:{
    type:Number,
    required: true
  } ,
  fechaDeRegistro: { 
    type: Date,
    default: () => moment.tz("America/Bogota").toDate()
  },
  bebidas: {
    type: Object,
    required: false,
    default: {}
  },
  restaurante: String,
  totalConsumido: String,
});

export default mongoose.model('Clientes', clienteSchema);





