// import { dbService } from '../../services/db.service.js'
// import { logger } from '../../services/logger.service.js'
// import mongodb from 'mongodb'
// const { ObjectId } = mongodb

import { UserModel } from "../../model/user.ts";
import { logger } from "../../services/logger.service.js";

export const userService = {
  query,
  create,
};

async function query(filterBy = {}) {
  //   const criteria = _buildCriteria(filterBy);
  try {
    const users = await UserModel.find({});
    return users;
  } catch (err) {
    logger.error("cannot find users", err);
    throw err;
  }
}

async function create(user: any) {
  try {
    await UserModel.create(user);
  } catch (err) {
    logger.error("cannot create user", err);
    throw err;
  }
}

// ==================================================================
// private functions
