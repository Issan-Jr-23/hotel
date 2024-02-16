import mongoose from "mongoose";
import moment from "moment-timezone";

const subproductoSchema = new mongoose.Schema({
  Descripcion: {
    type: String,
  },
  ValorUnitario: {
    type: Number,
  },
  ProductosVendidos:{
    type: Number,
    default:0
  },
  Cortesias:{
    type:Number,
    default:0
  },
});

const inventarioSchema = new mongoose.Schema({
  Descripcion: {
    type: String,
  },
  tipo: {
    type: String,
    enum: ["bebida", "comida", "utensilios", "despensa", "recepcion", "otro"],
    required: true
  },
  Caducidad: {
    type: Date,
    set: function (v) {
      return moment(v).tz("America/Bogota").toDate();
    },
  },
  CantidadInicial: {
    type: Number,
    required: true,
  },
  subproductos: [subproductoSchema],

  ValorUnitario: {
    type: Number,
    required: true,
    default: 0,
  },

  ProductosVendidos: {
    type: Number,
    default: 0,
  },
  ValorTotal: {
    type: Number,
    default: 0,
  },
  Restante: {
    type: Number,
    default: 0,
  },
  Cortesias:{
    type:Number,
    default:0
  }
});

const Inventario = mongoose.model("Inventario", inventarioSchema);

export default Inventario;
