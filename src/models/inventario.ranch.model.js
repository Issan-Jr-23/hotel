import mongoose from "mongoose";


const inventarioRanchSchema = new mongoose.Schema({
        Descripcion: { 
            type: String,
         },
         Ubicacion:{
            type :String
         },
         Cantidad:{
            type: String
         }
    })

export default mongoose.model("inventarioRanch", inventarioRanchSchema);