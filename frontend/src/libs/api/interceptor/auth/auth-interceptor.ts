/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

const processQueue = (error: AxiosError | any, token: string | null = null) => {
  failedQueue.forEach(({ reject, resolve }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const setupAuthInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry: boolean;
      };

      if (
        error.response?.status === 401 &&
        !originalRequest.url?.includes("/auth/login") && // api nest route
        !originalRequest.url?.includes("/auth/refresh") && // api nest route
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          throw new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              originalRequest._retry = true;
              return client(originalRequest);
            })
            .catch((error) => {
              Promise.reject(error);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await client.post("/auth/refresh");
          processQueue(null, null);
          return client(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};
