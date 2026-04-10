import { IMessage } from "../message/message.interface";
import { IChatMember } from "./chat-member.interface";


export interface IChat {
  id: string;
  type: "DIRECT" | "SELF" | "GROUP" | "CHANNEL";
  name: string;
  username: string;
  description: string;
  avatar: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  messages: IMessage[];
  chatMembers: IChatMember[],
}