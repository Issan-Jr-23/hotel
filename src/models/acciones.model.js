import mongoose from "mongoose";

const accionModel = new mongoose.Schema({
    mensaje:{
        type:String,
    },
    fecha: {
        type: Date,
        default: Date.now
      }
})

export default mongoose.model("Mensaje", accionModel )