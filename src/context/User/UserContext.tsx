import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "model";
import { useGetUserQuery } from "api";
import { PageLoader } from "components";

type UserContextType = {
  user: User | null | undefined;
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
  const { data: userData, isFetching, isLoading } = useGetUserQuery();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else if (!isFetching && !isLoading) {
      setUser(null);
    }
  }, [userData, isFetching, isLoading]);

  function logout() {
    setUser(undefined);
  }

  if (user === undefined && (isFetching || isLoading)) {
    return <PageLoader />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        fetchingUser: isFetching || isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
