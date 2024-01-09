import { Router } from "express";
import { create, deleteRegistro, registroStockCabanias } from "../controllers/stockCabanias.controller.js";

const route = Router()

route.get("/view-cabania-stock", registroStockCabanias)
route.post("/register-cabania-stock", create)
route.delete("/delete-cabania-stock/:id", deleteRegistro)
route.put("/update-cabania-stock")

export default route;