import {Router} from "express";
import {crearProducto, filType, updateBebidas, updateCB, updateCF, updateCSTOCKB, updateCSTOCKF, validCB, validCF } from '../controllers/inventario.controllers.js'
import {updateProducto } from '../controllers/inventario.controllers.js'
import {obtenerInventario } from '../controllers/inventario.controllers.js'
import {crearAlimentos } from '../controllers/alimentos.controllers.js'
import {obtenerAlimentos } from '../controllers/alimentos.controllers.js'
import {obtenerMekatos } from '../controllers/inventario.controllers.js'
import {obtenerDrinks } from '../controllers/inventario.controllers.js'
import {obtenerFood } from '../controllers/inventario.controllers.js'
import {addCv } from '../controllers/inventario.controllers.js'
import {deleteProducto } from '../controllers/inventario.controllers.js'

const router = Router();

router.post("/inventario", crearProducto)
router.get("/obtener-inventario", obtenerInventario) 
router.post("/alimentos", crearAlimentos)
router.get("/obtener-alimentos", obtenerAlimentos)
router.get("/mekatos", obtenerMekatos)
router.get("/drinks", obtenerDrinks)
router.get("/food", obtenerFood)
router.post("/agregar-cantidad", addCv)
router.delete("/eliminar-mekato/:id", deleteProducto)
router.put("/update-producto/:id", updateProducto)
router.post('actualizar-inventario',updateBebidas)
router.post('/actualizar-inventario-bebida',updateCB)
router.post('/actualizar-stock-inicial/:id',updateCSTOCKB)
router.post('/actualizar-stock-inicial-food/:id',updateCSTOCKF)
router.get('/verificar-disponibilidad/:id',validCB)
router.get('/fill-type', filType)
router.post('/actualizar-inventario-food',updateCF)
router.get('/verificar-disponibilidad-food/:id',validCF)

export default router;
