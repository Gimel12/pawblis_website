import { getDb } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const clients = db
    .prepare("SELECT * FROM clients ORDER BY created_at DESC")
    .all();

  return Response.json({ clients });
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const db = getDb();

  const columns = Object.keys(body);
  const placeholders = columns.map(() => "?").join(", ");
  const values = columns.map((col) => {
    const val = body[col];
    if (typeof val === "boolean") return val ? 1 : 0;
    if (typeof val === "object") return JSON.stringify(val);
    return val;
  });

  const stmt = db.prepare(
    `INSERT INTO clients (${columns.join(", ")}) VALUES (${placeholders})`
  );
  const result = stmt.run(...values);

  return Response.json({ success: true, id: result.lastInsertRowid });
}
