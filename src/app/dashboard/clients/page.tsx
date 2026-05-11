import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PawPrint, UserPlus, Search } from "lucide-react";
import ClientSearch from "@/components/dashboard/ClientSearch";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, owner_name, owner_email, dog_breed, dog_sex, consultation_date, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Clients</h1>
          <p className="text-muted mt-1">
            Manage all your client intake records
          </p>
        </div>
        <Link
          href="/dashboard/clients/new"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          New Client
        </Link>
      </div>

      <ClientSearch clients={clients ?? []} />
    </div>
  );
}
