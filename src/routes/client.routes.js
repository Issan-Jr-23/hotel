import { Router } from "express";
import {
  dataUser
} from "../controllers/client.controllers.js";

const router = Router();

router.get("/data", dataUser);

export default router;
