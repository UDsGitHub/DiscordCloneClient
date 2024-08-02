export type Message = {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timeStamp: Date;
};

export type DmUser = {
    userId: string;
    username: string;
    currentMessage?: string;
    messageList: Array<Message>;
}

export type DmUserListType = Record<string, DmUser>;