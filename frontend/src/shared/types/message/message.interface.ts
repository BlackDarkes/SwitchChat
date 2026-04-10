import { IUser } from "../user/user.interface";

export interface IMessage {
  id: string;
  userId: string;
  chatId: string;
  text: string;
  type: "TEXT" | "SYSTEM" | "FILE" | "CALL_START";
  isEdited: boolean;
  replyToId: string;
  isPined: boolean;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}