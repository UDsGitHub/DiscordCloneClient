export type User = {
  id: number;
  username: string;
  currentMessage: string;
  messageList: string[];
};

export type DmUserType = User & {};