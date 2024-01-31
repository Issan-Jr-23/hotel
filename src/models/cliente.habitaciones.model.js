import mongoose from "mongoose";
import moment from "moment-timezone";

const clienteSchema = new mongoose.Schema({
  identificacion: {
    type: Number,
    unique:true
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
  habitaciones: {
    type: String,
    enum: ['Descanso','Jardin_Secreto', 'Arcoiris',''],
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
  recepcion: {
    type: Array,
    required: false,
    default: [],
  },
  descorche: {
    type: Array,
    required: false,
    default: [],
  },
  nuevoTotal: {
    type: Number,
    default: 0
  },
  cantidadDeCortesias: {
    type: Number,
    default: 0
  },
  cantidadDeCortesiasF:{
    type: Number,
    default: 0
  },
  servicio:{type:String, default:"habitaciones"},
    estado:{
    type:String, 
    default:"pendiente"},
    fechaActivacion: {
      type: Date, 
      default: null  
  },
    pago:{
    type: Number, default:0
  }
});



export default mongoose.model("Habitaciones", clienteSchema);






