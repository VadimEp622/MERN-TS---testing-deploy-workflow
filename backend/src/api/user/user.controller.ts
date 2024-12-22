import { Response, Request } from "express";
import { userService } from "./user.service.ts";
import { logger } from "../../services/logger.service.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const filterBy = {};
    const users = await userService.query(filterBy);
    res.send(users);
  } catch (err) {
    logger.error("Failed to get users", err);
    res.status(400).send({ err: "Failed to get users" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { fullname, username, password } = req.body;
    if (!fullname || !username || !password) {
      throw new Error("Invalid user data");
    }
    const user = { fullname, username, password };
    await userService.create(user);
    res.send({ msg: "User created" });
  } catch (err) {
    logger.error("Failed to get users", err);
    res.status(400).send({ err: "Failed to get users" });
  }
}
