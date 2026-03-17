import { IUser } from "./user.interface";

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