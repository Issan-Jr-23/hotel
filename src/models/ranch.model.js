import mongoose from "mongoose";


const ranchSchema = new mongoose.Schema({
    nombre:{
        type: String,
        default:""
    },
    tipo: {
        type: String,
        required: true
    },
    cantidadProducida: {
        type: String,
        require: true
    },
    areaDeProduccion: {
        type: String,
        require: true
    },
    empleados: {
        type: String,
        require: true
    },
    notasEspeciales: {
        type: String,
        default: ""
    }
})

export default mongoose.model("Ranch", ranchSchema)