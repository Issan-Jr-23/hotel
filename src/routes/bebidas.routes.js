import {Router} from "express";
import {crearProducto } from '../controllers/inventario.controllers.js'
import {obtenerInventario } from '../controllers/inventario.controllers.js'
import {crearAlimentos } from '../controllers/alimentos.controllers.js'
import {obtenerAlimentos } from '../controllers/alimentos.controllers.js'
import {actualizarBebida } from '../controllers/inventario.controllers.js'
import {obtenerMekatos } from '../controllers/inventario.controllers.js'
import {obtenerDrinks } from '../controllers/inventario.controllers.js'
import {obtenerFood } from '../controllers/inventario.controllers.js'
import {addCv } from '../controllers/inventario.controllers.js'

const router = Router();

router.post("/inventario", crearProducto)
router.get("/obtener-inventario", obtenerInventario)
router.post("/alimentos", crearAlimentos)
router.get("/obtener-alimentos", obtenerAlimentos)
router.post("/update-bebidas", actualizarBebida)
router.get("/mekatos", obtenerMekatos)
router.get("/drinks", obtenerDrinks)
router.get("/food", obtenerFood)
router.post("/agregar-cantidad", addCv)

export default router;
