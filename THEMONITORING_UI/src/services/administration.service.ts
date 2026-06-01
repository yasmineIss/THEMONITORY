import { api } from "./api.service";

export const AdministrationService = {
  async getAll() {
    return api.get("/administrations");
  },
};