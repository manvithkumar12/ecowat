import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { loggedUser } from "@ecowat/shared";
import { apiClient } from "@ecowat/shared";

export const getUser = async () => {
  const token = await SecureStore.getItemAsync("UserToken");
  if (!token) {
    return null;
  }
  apiClient.setToken(token);
  const user = jwtDecode(token as string);
  return user as loggedUser;
};
