import { cookies } from "next/headers";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      
      const res = await fetch(`${AUTH_API}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) return { data: null, error: "Unauthorized" };

      const session = await res.json();

      if (session === null) {
        return { data: null, error: "Session is missing!" };
      }

      return { data: session, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error };
    }
  },
};
