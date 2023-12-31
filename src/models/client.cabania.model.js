import mongoose from "mongoose";
import moment from "moment-timezone";

const clienteSchema = new mongoose.Schema({
  identificacion: {
    type: Number,
    unique:true,
  },
  nombre: {
    type: String,
    required: true,
  },
  
  reserva: {
    type: String,
    required: true,
    default: "si"
  },
  mediosDePago: {
    type: String,
    enum: ['efectivo','nequi', 'daviplata', 'pse','efecty', 'transferencia',''],
    default:"",
  },
  tipo_cabania: {
    type: String,
    enum: ['Macuira','Taroa','Mayapo',''],
    default:"",
  },
  pagoAnticipado :{
    type: Number,
    default: 0
  },
  mediosDePagoPendiente: {
    type: String,
    enum: ['efectivo','nequi', 'daviplata', 'pse','efecty', 'transferencia',''],
    default: "",
  },
  pagoPendiente: {
    type: Number,
    default: 0
  },
  totalReserva: {
    type:Number,
    default: 0
  },
  cantidadPersonas: {
    adultos: {
      type: Number,
    },
    ninios: {
      type: Number,
      default: 0
    },
  },
  fechaDeRegistro: {
    type: Date,
    default: () => moment.tz("America/Bogota").toDate(), 
  },
  fechaPasadia: {
    type: Date, 
  },
  bebidas: {
    type: Array,
    required: false,
    default: [],
  },
  restaurante: {
    type: Array,
    required: false,
    default: [],
  },
  nuevoTotal: {
    type: Number,
    default: 0
  },
  servicio:{type:String, default:"cabania"}
});



export default mongoose.model("Cabania", clienteSchema);






