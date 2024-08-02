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