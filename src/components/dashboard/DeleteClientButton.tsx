"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteClientButton({ clientId }: { clientId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    setDeleting(true);
    await supabase.from("clients").delete().eq("id", clientId);
    router.push("/dashboard/clients");
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setConfirming(false)}
          className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted hover:text-secondary transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Confirm Delete
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </button>
  );
}
