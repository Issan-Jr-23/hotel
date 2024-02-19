import { Router } from "express";
import { getTemplate, updateTemplate } from "../controllers/welcome.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/template',auth, getTemplate);
router.post('/template',auth, updateTemplate);

export default router;