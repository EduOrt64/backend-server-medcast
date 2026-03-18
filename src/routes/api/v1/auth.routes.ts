import { Router } from "express";

import usersController from "../../../controllers/users.controller";

const router = Router();

router.post("/signup", usersController.signup.bind(usersController));
router.post("/login", usersController.login.bind(usersController));

export default router;
