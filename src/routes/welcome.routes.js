import { Router } from "express";
import { getTemplate, updateTemplate } from "../controllers/welcome.controllers.js";

const router = Router();

router.get('/template', getTemplate);
router.post('/template', updateTemplate);

export default router;