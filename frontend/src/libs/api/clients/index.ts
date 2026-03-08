import { ENDPOINTS } from "../constants/endpoints";
import { baseClient } from "./base-client";

export const apiClient = {
  auth: {
    login: (data: { email: string; password: string }) =>
      baseClient.post(ENDPOINTS.auth.login, data),

    register: (data: { email: string; name: string; password: string }) =>
      baseClient.post(ENDPOINTS.auth.register, data),

    logout: () => baseClient.post(ENDPOINTS.auth.logout),

    refresh: () => baseClient.post(ENDPOINTS.auth.refresh),
  },
  user: {
    me: (id: string) => baseClient.get(ENDPOINTS.user.me.replace(":id", id)),
  },
};
