import { Router } from "express";
import { agregarOActualizarUsuario, obtenerCantidadGeneralResrvas, obtenerHistorial, obtenerHistorialDeUsuario, obtenerTotalesNiniosYAdultosEnCabania, obtenerTotalesNiniosYAdultosEnPasadia, totalPructosCortesiasCabania, totalPructosVendidosCabania} from "../controllers/transferencia.controllers.js";


const router = Router()


router.post("/create-historial", agregarOActualizarUsuario);
router.get("/obtener-historial",obtenerHistorial);
router.get("/obtener-historial/:id",obtenerHistorialDeUsuario);
router.get('/obtener-cantidad-total-reservas',obtenerCantidadGeneralResrvas);
router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
router.get('/obtener-cantidad-usuarios-cabania',obtenerTotalesNiniosYAdultosEnCabania);


router.get('/productos-vendidos-cabania',totalPructosVendidosCabania);

router.get('/productos-cortesias-cabania',totalPructosCortesiasCabania);
 

export default router;