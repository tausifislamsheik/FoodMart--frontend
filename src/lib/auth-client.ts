import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BACKEND_URL!,
  // baseURL: typeof window !== "undefined" ? window.location.origin : "",
  // fetchOptions: {
  //   credentials: "include",
  // },
});