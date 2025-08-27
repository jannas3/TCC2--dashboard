import { Router } from "express";
import { postScreening, getScreenings } from "./screening.controller.js";
import { botAuth } from "../../middlewares/botAuth.js";

const router = Router();

// GET para visualizar no navegador
router.get("/screenings", getScreenings);

// POST protegido (usado pelo bot)
router.post("/screenings", botAuth, postScreening);

export default router;
