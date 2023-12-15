// Importando Mongoose
import mongoose from 'mongoose';

// Esquema para historial
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

// Esquema para transferencia
const transferenciaSchema = new mongoose.Schema({
  identificacion: { type: String, required: true },
  historial: [historialSchema]
});

// Creando el modelo Transferencia y especificando el nombre de la colección
const Transferencia = mongoose.model('Historial', transferenciaSchema);

// Exportando el modelo
export default Transferencia;
