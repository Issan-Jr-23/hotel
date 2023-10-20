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
    require: true

  },
  pagoPendienteTotal:{
    type:Number,
    require: true
  } ,
  fechaDeRegistro: { 
    type: Date,
    default: () => moment.tz("America/Bogota").toDate()
  },
  bebidas: String,
  restaurante: String,
  totalConsumido: String
});

export default mongoose.model('Clientes', clienteSchema);





