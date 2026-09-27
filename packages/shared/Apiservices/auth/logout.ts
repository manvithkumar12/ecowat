export const logoutService = async (baseUrl: string) => {
  try {
    const res = fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res;
  } catch (error) {
    throw error;
  }
};
