"use client";

import { useState } from "react";
import Link from "next/link";
import { PawPrint, Search } from "lucide-react";

interface ClientRow {
  id: string;
  owner_name: string;
  owner_email: string;
  dog_breed: string | null;
  dog_sex: string | null;
  consultation_date: string | null;
  created_at: string;
}

export default function ClientSearch({ clients }: { clients: ClientRow[] }) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.owner_name.toLowerCase().includes(search.toLowerCase()) ||
      c.owner_email.toLowerCase().includes(search.toLowerCase()) ||
      (c.dog_breed && c.dog_breed.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or breed..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
      </div>

      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <PawPrint className="w-12 h-12 text-border mx-auto mb-4" />
            <p className="text-muted">
              {search ? "No clients match your search." : "No clients yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-light/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Breed
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Sex
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-light/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/clients/${client.id}`}
                        className="font-medium text-secondary hover:text-primary transition-colors"
                      >
                        {client.owner_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {client.owner_email}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {client.dog_breed || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {client.dog_sex || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
