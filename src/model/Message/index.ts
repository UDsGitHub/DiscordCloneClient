export type Message = {
  id?: string;
  fromId: string;
  toId: string;
  message: string;
  timeStamp: Date;
};

export type DmUser = {
  userId: string;
  displayName: string;
  currentMessage: string;
  messageList: Message[];
};

export type SendMessageToUserRequest = {
  toUserId: string;
  message: string;
};

export type DmUserListType = Record<string, DmUser>;
