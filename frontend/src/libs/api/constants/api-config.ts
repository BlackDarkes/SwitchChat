import { ENV } from "@/shared/config/env";

export const API_CONFIG = {
  base_url: ENV.api_url,
  timeout: 30000,
  max_retrying: 3,
}