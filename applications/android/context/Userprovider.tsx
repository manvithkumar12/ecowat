import { loggedUser } from "@ecowat/shared";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<loggedUser | null>(null);
type UserProviderProps = {
  children: ReactNode;
  user: loggedUser | null;
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
