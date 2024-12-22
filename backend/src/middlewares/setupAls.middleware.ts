// import {authService} from '../api/auth/auth.service.mjs'
import { NextFunction, Request, Response } from "express";
import { asyncLocalStorage } from "../services/als.service.ts";

export async function setupAsyncLocalStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const storage = {};
  asyncLocalStorage.run(storage, () => {
    // if (!req.cookies || Object.keys(req.cookies).length === 0) return next()
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)

    // if (loggedinUser) {
    //   const alsStore = asyncLocalStorage.getStore()
    //   alsStore.loggedinUser = loggedinUser
    // }
    next();
  });
}
