export type User = {
  id: string;
  email: string;
  displayName: string;
  username: string;
  password: string;
  birthdate: string;
};

export type DecodedJWT = {
  id: string;
  email: string;
  displayName: string;
  username: string;
  birthdate: string;
  password: string;
  exp: number;
  iat: number;
};

export interface FriendUser {
  user: User;
}

export interface FriendRequest extends FriendUser {
  direction: FriendRequestDirection,
  status: FriendRequestStatus
}

export enum FriendRequestDirection {
  outgoing,
  incoming
}

export enum FriendRequestStatus {
  pending,
  accepted,
  denied
}