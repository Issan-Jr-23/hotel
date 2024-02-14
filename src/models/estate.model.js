import mongoose from "mongoose";

const terneroSchema = mongoose.Schema({
  identificationNumber: {
    type: String,
    unique: true
  },
  name:{
   type: String
  },
  breed: {
    type: String
  },
  gender: {
    type: String,
    enum: ['macho', 'hembra']
  },
  birthDate: {
    type: Date
  },
  color: {
    type: String
  },
  distinctiveMark: {
    type: String
  },
  description: {
   type: String
  }
});

const produccionLecheSchema = mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
});

const eventoLecheSchema = mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  tipoEvento: {
    type: String,
    enum: ['inicio_dar_leche', 'dejo_dar_leche'],
    required: true
  }
});

const animalSchema = mongoose.Schema({
  identificationNumber: {
    type: String,
    unique: true
  },
  name:{
   type: String
  },
  breed: {
    type: String
  },
  gender: {
    type: String,
    enum: ['macho', 'hembra']
  },
  birthDate: {
    type: Date
  },
  color: {
    type: String
  },
  distinctiveMark: {
    type: String
  },
  description: {
   type: String
  },
  historialTerneros: {
    type: [terneroSchema]
  },
  historialProduccionLeche: {
    type: [produccionLecheSchema]
  },
  historialEventosLeche: {
    type: [eventoLecheSchema]
  }
});

export default mongoose.model("Animal", animalSchema);
