import React, { createContext, useEffect, useState } from "react";
import { User } from "model";
import { useGetUserQuery } from "api";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => any;
  logout: () => any;
  fetchingUser: boolean;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
  logout: () => {},
  fetchingUser: false,
});

const UserProvider = ({ children }: UserProviderProps) => {
  const { data: userData, isLoading: fetchingUser } = useGetUserQuery();
  const [user, setUser] = useState<User | undefined>(userData);

  useEffect(() => {  
    if (!fetchingUser && userData !== undefined) {
      setUser(userData);
    }
  }, [userData, fetchingUser]);

  function logout() {
    setUser(undefined);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        fetchingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
