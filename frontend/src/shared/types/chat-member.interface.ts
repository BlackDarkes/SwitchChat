import { IUser } from "@/entities/user";

export interface IChatMember {
  id: string;
  chatId: string;
  userId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  joinedAt: string;
  lastReadMessageId: string;
  isFavorite: boolean;
  user: IUser;
}