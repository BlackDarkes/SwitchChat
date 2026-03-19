export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  user: {
    me: "/user/me",
  },
  chat: {
    getUserChat: "/chats",
    getChatById: "/chats/:id",
    getSelfChat: "/chats/self",
    getDirectChats: "/chats/direct",
    getGroupChats: "/chats/group",
    search: "/chats/search",
    create: "/chats",
    leave: "/chats/:id/leave",
  },
  message: {
    getHistory: "/messages/:id",
    send: "/messages/:id",
    update: "/messages/:id",
    delete: "/messages/:id",
    react: "/messages/:id/emoji/:emoji",
  }
};
