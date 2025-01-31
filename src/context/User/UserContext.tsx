import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "model";
import { useGetUserQuery } from "api";
import { PageLoader } from "components";

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
  const { data: userData, isFetching: fetchingUser } = useGetUserQuery();
  const [user, setUser] = useState<User | undefined>(userData);


  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData])
  

  function logout() {
    setUser(undefined);
  }

  if (fetchingUser) {
    return <PageLoader />
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

export const useUserContext = () => useContext(UserContext)

export default UserProvider;
