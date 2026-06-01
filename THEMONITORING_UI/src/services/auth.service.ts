import { api } from "./api.service";

export const AuthService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
};