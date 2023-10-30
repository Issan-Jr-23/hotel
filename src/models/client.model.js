import mongoose from "mongoose";
import moment from "moment-timezone";

const clienteSchema = new mongoose.Schema({
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
    enum: ['efectivo','nequi', 'daviplata', 'pse','efecty', 'transferencia'],
    required: true,
  },
  pagoAnticipado :{
    type: Number,
    Required: true,
    default: 0
  },
  mediosDePagoPendiente: {
    type: String,
    enum: ['efectivo','nequi', 'daviplata', 'pse','efecty', 'transferencia'],
    required: true,
  },
  pagoPendiente: {
    type: Number,
    required: true,
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
  consumoTotal: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Clientes", clienteSchema);






