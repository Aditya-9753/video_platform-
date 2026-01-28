import { getToken } from "../storage/tokenStorage";

export const authHeader = async () => {
  const token = await getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};
