export const callBackApi = async (accessToken: string) => {
  try {
    const res = await fetch("/api/auth/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
      }),
    });
    return res;
  } catch (error) {
    throw error;
  }
};
