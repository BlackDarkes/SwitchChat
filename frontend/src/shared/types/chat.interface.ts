import { IChatMember } from "./chat-member.interface";
import { IMessage } from "./message.interface";

export interface IChat {
  id: string;
  type: "DIRECT" | "SELF" | "GROUP" | "CHANNEL";
  name: string;
  username: string;
  description: string;
  avatar: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  messages: IMessage[];
  chatMembers: IChatMember[],
}