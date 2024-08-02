import React, { createContext, useState } from "react";
import { User } from "model";

type UserContextType = {
  user: User | undefined,
  setUser: (user: User | undefined) => any;
  logout: () => any;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  logout: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  function logout() {
    setUser(undefined);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
