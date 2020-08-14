import { Router } from "express";
import UserController from "../controllers/user-controller/User.c";

const router = Router();
router.post("/register", UserController.register);
router.get("/active-account/:codeActive", UserController.activeAccount);
router.post("/login", UserController.login);
export const ARouter = Router();
ARouter.use("/auth/", router);
