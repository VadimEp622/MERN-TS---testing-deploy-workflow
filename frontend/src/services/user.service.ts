import { httpService } from "./http.service";

const BASE_URL = "user";

export const userService = {
  getById,
  getUsers,
};

function getById(userId: any) {
  return httpService.get(`${BASE_URL}/${userId}`);
}

function getUsers() {
  return httpService.get(`${BASE_URL}`);
}
