import {Router} from "express";
import { crearProducto, deleteSubproduct, filType, guardarCortesiaFoodInventory, guardarCortesiaItemInventory, obtenerProductoPorId, obtenerProductosRecepcion, obtenerSubProductoPorId, obtenerSubProductos, updateBebidas, updateCB, updateCF, updateCSTOCKB, updateCSTOCKF, updateStockSubproductos, updateSubproduct, validCB, validCF } from '../controllers/inventario.controllers.js'
import {updateProducto } from '../controllers/inventario.controllers.js'
import {obtenerInventario } from '../controllers/inventario.controllers.js'
// import {crearAlimentos } from '../controllers/alimentos.controllers.js'
// import {obtenerAlimentos } from '../controllers/alimentos.controllers.js'
import {obtenerMekatos } from '../controllers/inventario.controllers.js'
import {obtenerDrinks } from '../controllers/inventario.controllers.js'
import {obtenerFood } from '../controllers/inventario.controllers.js'
import {addCv } from '../controllers/inventario.controllers.js'
import {deleteProducto } from '../controllers/inventario.controllers.js'
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/inventario",auth, crearProducto)
router.get("/obtener-inventario",auth, obtenerInventario) 
router.get("/obtener-inventario/:id",auth, obtenerProductoPorId) 
router.get("/obtener/sub/productos/:id/:idSubproducto",auth, obtenerSubProductoPorId) 
// router.post("/alimentos",auth, crearAlimentos)
// router.get("/obtener-alimentos",auth, obtenerAlimentos)
router.get("/mekatos",auth, obtenerMekatos)
router.get("/drinks",auth, obtenerDrinks)
router.get("/food",auth, obtenerFood)
router.get("/recepcion",auth, obtenerProductosRecepcion)
router.post("/agregar-cantidad",auth, addCv)
router.delete("/eliminar-mekato/:id",auth, deleteProducto)
router.put("/update-producto/:id",auth, updateProducto)
router.post('actualizar-inventario',auth,updateBebidas);
router.post('/actualizar-inventario-bebida',auth,updateCB);
router.post('/actualizar-stock-inicial/:id',auth,updateCSTOCKB);
router.post('/actualizar-stock-inicial-food/:id',auth,updateCSTOCKF);
router.get('/verificar-disponibilidad/:id',auth,validCB);
router.get('/fill-type',auth, filType);
router.post('/actualizar-inventario-food',auth,updateCF);
router.get('/verificar-disponibilidad-food/:id',auth,validCF); 
router.get('/obtener-sub-productos/:id',auth, obtenerSubProductos)
// router.post('/actualizar-subproducto', actualizarSubproducto);
router.post('/update-cantidad-inicial',auth, updateStockSubproductos);
router.post('/guardar-cortesia-inventario',auth, guardarCortesiaItemInventory);
router.post('/guardar-cortesias-inventario',auth, guardarCortesiaFoodInventory);
router.delete('/eliminar-subproduct/:id',auth, deleteSubproduct);
router.put('/update-prueba-subproducto/:id',auth, updateSubproduct);

export default router;
