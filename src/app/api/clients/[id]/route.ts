import { getDb } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  const client = db.prepare("SELECT * FROM clients WHERE id = ?").get(id);

  if (!client) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ client });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM clients WHERE id = ?").run(id);

  return Response.json({ success: true });
}
