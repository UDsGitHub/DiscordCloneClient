export type User = {
  id: number;
  email: string;
  displayName: string;
  username: string;
  password: string;
  birthdate: string;
};

export type DmUserType = User & {
  currentMessage: string;
  messageList: string[];
};
