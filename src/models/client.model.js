import mongoose from "mongoose";


const clienteSchema = new mongoose.Schema({
            
    nombre: {
        type: String,
        required: true
    },
    reserva: {
        type: Boolean,
        default: false
    },
    pago_pendiente: {
        type: Number,
        default: 0
    },
    total_del_paquete: {
        type: Number,
        default: 0
    },
    bar: {
        type: Number,
        default: 0
    },
    restaurante: {
        type: Number,
        default: 0
    },
    total_consumido: {
        type: Number,
        default: 0
    }

});


const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
