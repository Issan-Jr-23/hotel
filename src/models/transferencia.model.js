import mongoose from 'mongoose';

const historialSchema = new mongoose.Schema({
  idHistorial: { type: String },
  nombre: { type: String },
  reserva: { type: String },
  ninios:{type:Number},
  adultos:{type:Number},
  servicio:{type:String},
  metodoPago: { type: String },
  pago: { type: Number },
  metodoPagoPendiente: { type: String },
  pagoPendiente: { type: Number },
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
});

const transferenciaSchema = new mongoose.Schema({
  identificacion: { type: Number, required: true },
  historial: [historialSchema]
});

const Transferencia = mongoose.model('Historial', transferenciaSchema);

export default Transferencia;
