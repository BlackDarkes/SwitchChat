export interface IAuthUser {
  email: string;
    name: string;
    id: string;
    username: string;
    avatar: string | null;
    bio: string | null;
    isOnline: boolean;
    lastSeen: Date | null;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
}