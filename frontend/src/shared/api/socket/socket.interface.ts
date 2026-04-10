import { IMessage } from "@/shared/types";

interface IServerToClientEvents {
  message_received: (message: IMessage) => void;
  message_updated: (message: IMessage) => void;
  message_deleted: (payload: { messageId: string }) => void;
  reaction_updated: (payload: { messageId: string; emoji: string }) => void;
  user_typing: (payload: { userId: string; isTyping: boolean }) => void;
}

interface IClientToServerEvents {
  join_room: (chatId: string) => void;
  leave_room: (chatId: string) => void;
  typing: (payload: { chatId: string; isTyping: boolean }) => void;
}

export type { IServerToClientEvents, IClientToServerEvents};
