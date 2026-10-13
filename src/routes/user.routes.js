import { Router } from "express";
import { autenticar } from "../middlewares/autenticar.js";
import { autorizar } from "../middlewares/autorizar.js";
import { listarUsers, alterarRole } from "../controllers/user.controller.js";

const router = Router();
router.use(autenticar, autorizar("ADMIN"));
router.get("/", listarUsers);
router.patch("/:id/role", alterarRole);

export default router;