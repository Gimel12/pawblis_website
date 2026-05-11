import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Users, UserPlus, MessageSquare, PawPrint } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, owner_name, dog_breed, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const { count } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
        <p className="text-muted mt-1">
          Welcome back! Here&apos;s an overview of your practice.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">{count ?? 0}</p>
              <p className="text-sm text-muted">Total Clients</p>
            </div>
          </div>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                New Client
              </p>
              <p className="text-sm text-muted">Add intake form</p>
            </div>
          </div>
        </Link>
        <Link
          href="/dashboard/chat"
          className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors">
                AI Assistant
              </p>
              <p className="text-sm text-muted">Chat about clients</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-2xl border border-border/50 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-lg font-bold text-secondary">Recent Clients</h2>
          <Link
            href="/dashboard/clients"
            className="text-sm text-primary hover:text-primary-dark font-medium"
          >
            View all
          </Link>
        </div>
        {!clients || clients.length === 0 ? (
          <div className="p-12 text-center">
            <PawPrint className="w-12 h-12 text-border mx-auto mb-4" />
            <p className="text-muted">No clients yet.</p>
            <Link
              href="/dashboard/clients/new"
              className="text-primary hover:text-primary-dark font-medium text-sm mt-2 inline-block"
            >
              Add your first client
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {clients.map((client) => (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center justify-between p-4 px-6 hover:bg-light transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <PawPrint className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">
                      {client.owner_name}
                    </p>
                    <p className="text-sm text-muted">
                      {client.dog_breed || "Breed not specified"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted">
                  {new Date(client.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
