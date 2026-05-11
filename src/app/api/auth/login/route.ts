import { validateCredentials, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!validateCredentials(username, password)) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await setSession();
  return Response.json({ success: true });
}
