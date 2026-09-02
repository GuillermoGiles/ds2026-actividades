import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { validate, validateParams } from "../middlewares/validate.middleware";
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from "../validations/libro.validation";

const router = Router();

router.get("/", libroController.getAll);
router.get("/:id", validateParams(idParamSchema), libroController.getById);
router.post("/", validate(libroCreateSchema), libroController.create);
router.put("/:id", validateParams(idParamSchema), validate(libroUpdateSchema), libroController.update);
router.delete("/:id", validateParams(idParamSchema), libroController.remove);

export default router;
