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
  },
  message: {
    getHistory: "/messages/:id",
  }
};
