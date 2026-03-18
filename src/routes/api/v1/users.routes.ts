import { Router } from "express";

import usersController from "../../../controllers/users.controller";
import { tokenMiddleware } from "../../../middlewares";

const router = Router();

router
  .route("/")
  .post(usersController.create.bind(usersController))
  .get(usersController.read.bind(usersController));

router.get(
  "/protected",
  tokenMiddleware,
  usersController.protectedRoute.bind(usersController),
);

router
  .route("/:id")
  .get(usersController.getById.bind(usersController))
  .put(usersController.update.bind(usersController))
  .delete(usersController.delete.bind(usersController));

export default router;
