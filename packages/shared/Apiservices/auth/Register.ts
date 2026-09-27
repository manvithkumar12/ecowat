export const registerApi = async (
  email: string,
  password: string,
  name: string,
  baseUrl: string,
) => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    return res;
  } catch (error) {
    throw error;
  }
};
