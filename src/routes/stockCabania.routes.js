import { Router } from "express";
import { create, deleteRegistro, registroStockCabanias } from "../controllers/stockCabanias.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const route = Router()

route.get("/view-cabania-stock",auth, registroStockCabanias)
route.post("/register-cabania-stock",auth, create)
route.delete("/delete-cabania-stock/:id",auth, deleteRegistro)

export default route;