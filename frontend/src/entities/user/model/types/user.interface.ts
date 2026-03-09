export interface IUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string | null;
  bio?: string | null;
  isOnline?: boolean;
  lastSeen?: Date | string | null;
  role?: "ADMIN" | "USER";
  createdAt?: Date | string;
  updatedAt?: Date | string;
}