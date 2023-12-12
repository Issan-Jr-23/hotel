import mongoose from "mongoose";


function getCurrentDateMinus5Hours() {
    const now = new Date();
    now.setHours(now.getHours() - 5);
    return now;
}

const preciosRanchSchema = new mongoose.Schema({
    precio:{
        type:Number,
    },
    tipo: {
        type: String,
        enum: ["unidad","carton", "litro", "gramoCerdo", "libraCerdo", "kiloCerdo", "gramoQueso", "libraQueso", "kiloQueso" ],
        default: ""
      },
    producto: {
        type: String,
        enum: ["huevo","leche","queso","pollo","cerdo"]
      },
      fecha: {
        type: Date,
        default: getCurrentDateMinus5Hours 
    }
})

export default mongoose.model("PreciosRanch", preciosRanchSchema);