import { Router } from "express";

import usersController from "../../../controllers/users.controller";

const router = Router();

router
  .route("/")
  .post(usersController.create.bind(usersController))
  .get(usersController.read.bind(usersController));

router
  .route("/:id")
  .get(usersController.getById.bind(usersController))
  .put(usersController.update.bind(usersController))
  .delete(usersController.delete.bind(usersController));

export default router;
