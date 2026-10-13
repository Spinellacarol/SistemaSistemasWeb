import { Router } from "express";
import { autenticar } from "../middlewares/autenticar.js";
import { listar, criar, atualizar, remover } from "../controllers/tarefa.controller.js";

const router = Router();
router.use(autenticar);
router.get("/", listar);
router.post("/", criar);
router.put("/:id", atualizar);
router.delete("/:id", remover);

export default router;