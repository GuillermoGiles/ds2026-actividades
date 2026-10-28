import { Router } from "express";
import * as categoriaController from "../controllers/categoria.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { categoriaCreateSchema, categoriaUpdateSchema } from "../validations/categoria.validation";
import { idParamSchema } from "../validations/libro.validation";

import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", categoriaController.getAll);
router.get("/:id", validateParams(idParamSchema), categoriaController.getById);
router.post("/", authenticate, authorize("ADMIN"), validate(categoriaCreateSchema), categoriaController.create);
router.put("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), validate(categoriaUpdateSchema), categoriaController.update);
router.delete("/:id", authenticate, authorize("ADMIN"), validateParams(idParamSchema), categoriaController.remove);

export default router;
