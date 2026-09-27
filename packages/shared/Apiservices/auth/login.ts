export const loginAPi = async (
  email: string,
  password: string,
  baseUrl?: string,
) => {
  const url = baseUrl ?? "";
  const res = await fetch(`${url}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return res;
};
