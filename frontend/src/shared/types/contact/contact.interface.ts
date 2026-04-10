
import { IChatMember } from "../chat/chat-member.interface";
import { IChat } from "../chat/chat.interface";
import { IUser } from "../user/user.interface";

interface IUserWithMembers extends IUser {
  chatMembers: Array<IChatMember & { chat?: IChat }>;
}

export interface IContact {
  id: string;
  ownerId: string;
  contactId: string;
  addedAt: string;
  owner: IUserWithMembers;
  contact: IUserWithMembers;
}
