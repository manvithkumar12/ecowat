"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { loggedUser } from "@ecowat/shared";

const UserContext = createContext<loggedUser | null>(null);

type UserProviderProps = {
  children: ReactNode;
  user: loggedUser;
};

export const UserProvider = ({ children, user }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<loggedUser>(user);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
