import express from "express";
import { createUser, getUsers } from "./user.controller.ts";
// import { log } from '../../middlewares/logger.middleware.js'

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
// ==================================================================

export const userRoutes = router;
