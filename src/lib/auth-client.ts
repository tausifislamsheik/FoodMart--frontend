import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: typeof window !== "undefined" ? window.location.origin : "",
  // fetchOptions: {
  //   credentials: "include",
  // },
  baseURL:"https://foodmart-frontend.vercel.app/api/auth" 
});