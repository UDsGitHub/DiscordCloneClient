export type User = {
  id: string;
  email: string;
  displayName: string;
  username: string;
  password: string;
  birthdate: string;
};

export type FriendUser = User & {
  serverInvites: string[];
};

export interface FriendRequest {
  user: User;
  direction: FriendRequestDirection;
  status: FriendRequestStatus;
}

export enum FriendRequestDirection {
  outgoing,
  incoming,
}

export enum FriendRequestStatus {
  pending,
  accepted,
  denied,
}

export type ServerInviteRequest = {
  serverId: string,
  userId: string,
}