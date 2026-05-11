import { cookies } from "next/headers";

const STATIC_USER = "yanet";
const STATIC_PASS = "yanet2000";
const SESSION_COOKIE = "pawblis_session";
const SESSION_VALUE = "authenticated_yanet";

export function validateCredentials(username: string, password: string): boolean {
  return username === STATIC_USER && password === STATIC_PASS;
}

export async function setSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

export function isAuthenticatedSync(cookieValue: string | undefined): boolean {
  return cookieValue === SESSION_VALUE;
}

export { SESSION_COOKIE, SESSION_VALUE };
