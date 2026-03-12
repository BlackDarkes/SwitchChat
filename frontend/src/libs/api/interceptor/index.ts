"use client"

import { AxiosInstance } from "axios";
import { setupAuthInterceptor } from "./auth/auth-interceptor";
import { setupErrorInterceptor } from "./auth/error-interceptor";

export const setupInterceptor = (client: AxiosInstance) => {
  setupErrorInterceptor(client);
  setupAuthInterceptor(client);

  return client;
}