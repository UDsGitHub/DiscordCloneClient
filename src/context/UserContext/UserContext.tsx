import React, { createContext, useState } from "react";
import { User } from "model";

type UserContextType = {
  user: User | undefined,
  setUser: (user: User | undefined) => any;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => any;
  logout: (username: string) => any;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout(username: string) {}

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
