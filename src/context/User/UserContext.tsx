import React, { createContext, useEffect, useState } from "react";
import { User } from "model";
import { useLazyGetUserQuery } from "api";

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
  const [getUser, { data: userData, isLoading: fetchingUser }] =
    useLazyGetUserQuery();
  const [user, setUser] = useState<User | undefined>(userData);

  useEffect(() => {
    if (!user) {
      getUser()
        .then((res: any) => {
          if (res.data !== null || res.data !== undefined) {
            setUser(res.data);
          }
        })
        .catch((e: any) => {
          console.log(e);
          setUser(undefined);
        });
    }
  }, [user]);

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
