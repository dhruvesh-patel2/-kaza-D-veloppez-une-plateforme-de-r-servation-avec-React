export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:3000";

export const API_URL = `${BACKEND_URL}/api`;

export const AUTH_URL = `${BACKEND_URL}/auth`;
