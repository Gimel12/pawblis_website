import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Home,
  UtensilsCrossed,
  Heart,
  Brain,
  Stethoscope,
  PawPrint,
  Trash2,
} from "lucide-react";
import DeleteClientButton from "@/components/dashboard/DeleteClientButton";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single() as { data: any; error: any };

  if (error || !client) {
    notFound();
  }

  const Section = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border/50 bg-light/50 flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-secondary">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const Field = ({
    label,
    value,
  }: {
    label: string;
    value: string | null | undefined | boolean;
  }) => (
    <div>
      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm text-secondary">
        {value === true
          ? "Yes"
          : value === false
          ? "No"
          : value || "—"}
      </p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/clients"
            className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-secondary">
              {client.owner_name}
            </h1>
            <p className="text-sm text-muted">
              {client.dog_breed || "Breed not specified"} &middot;{" "}
              {new Date(client.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <DeleteClientButton clientId={client.id} />
      </div>

      <Section title="Owner & Dog Information" icon={User}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Field label="Owner Name" value={client.owner_name} />
          <Field label="Email" value={client.owner_email} />
          <Field label="Consultation Date" value={client.consultation_date} />
          <Field label="Breed" value={client.dog_breed} />
          <Field label="Sex" value={client.dog_sex} />
          <Field label="Reproductive Status" value={client.dog_reproductive_status} />
          <Field label="Weight" value={client.dog_weight} />
          <Field label="Date of Birth" value={client.dog_birth_date} />
          <Field label="Adoption Date" value={client.dog_adoption_date} />
          <Field label="Adoption Status" value={client.adoption_status} />
          <Field label="Origin" value={client.dog_origin} />
          <Field label="Consultation Reason" value={client.consultation_reason} />
        </div>
        {client.consultation_motives && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <Field label="Consultation Motives" value={client.consultation_motives} />
          </div>
        )}
      </Section>

      <Section title="Environment" icon={Home}>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Housing Type" value={client.housing_type} />
          <Field label="Interior Access" value={client.interior_access} />
          <Field label="Where Left Alone" value={client.where_left_alone} />
          <Field label="How Stays Alone" value={client.how_stays_alone} />
        </div>
      </Section>

      <Section title="Walks & Feeding" icon={UtensilsCrossed}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Field label="Walk Start Age" value={client.walk_start_age} />
          <Field label="Control Tools" value={client.control_tools} />
          <Field label="Food Type" value={client.food_type} />
          <Field label="Food Brand" value={client.food_brand} />
          <Field label="Administration" value={client.food_administration} />
          <Field label="Treats" value={client.treats} />
          <Field label="Treats When" value={client.treats_when} />
          <Field label="Glutton" value={client.is_glutton} />
          <Field label="Food Removal Reaction" value={client.food_removal_reaction} />
          <Field label="Walks" value={client.walks_number_duration} />
          <Field label="Post-Walk Routine" value={client.post_walk_routine} />
          <Field label="Feeding Schedule" value={client.feeding_schedule} />
        </div>
      </Section>

      <Section title="Socialization" icon={Heart}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="With Family" value={client.socialization_family} />
          <Field label="With Strangers" value={client.socialization_strangers} />
          <Field label="With Known Dogs" value={client.socialization_known_dogs} />
          <Field label="With Unknown Dogs" value={client.socialization_unknown_dogs} />
        </div>
      </Section>

      <Section title="Behavior & Other Issues" icon={Brain}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Field label="Elimination Behavior" value={client.elimination_behavior} />
          <Field label="Sleep Location" value={client.sleep_location} />
          <Field label="Uses Kongs" value={client.uses_kongs} />
          <Field label="Chases Bikes/Kids" value={client.chases_bikes_kids} />
          <Field label="Previous Training" value={client.previous_training} />
          <Field label="Training Method" value={client.training_method} />
          <Field label="Play Behavior" value={client.play_behavior} />
          <Field label="Stimulus Reaction" value={client.stimulus_reaction} />
          <Field label="Repetitive Behavior" value={client.repetitive_behavior} />
          <Field label="Corrections Type" value={client.punishments_type} />
          <Field label="Corrections Frequency" value={client.punishments_frequency} />
          <Field label="Corrections Context" value={client.punishments_context} />
        </div>
      </Section>

      <Section title="Medical History" icon={Stethoscope}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Field label="Medical History Type" value={client.medical_history_type} />
          <Field label="Start" value={client.medical_history_start} />
          <Field label="Frequency" value={client.medical_history_frequency} />
          <Field label="Medical Problems" value={client.medical_problems} />
          <Field label="Current Medication" value={client.current_medication} />
        </div>
        {client.consultation_observations && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <Field label="Consultation Observations" value={client.consultation_observations} />
          </div>
        )}
      </Section>
    </div>
  );
}
