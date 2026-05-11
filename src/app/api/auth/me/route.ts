import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ user: null }, { status: 401 });
  }
  return Response.json({ user: { name: "Yanet", email: "yanet@pawblis.com" } });
}
