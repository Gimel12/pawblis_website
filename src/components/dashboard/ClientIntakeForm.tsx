"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  User,
  Dog,
  Home,
  UtensilsCrossed,
  Clock,
  Heart,
  Brain,
  Stethoscope,
  Save,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const STEPS = [
  { label: "Owner & Dog Info", icon: User },
  { label: "Environment", icon: Home },
  { label: "Walks & Feeding", icon: UtensilsCrossed },
  { label: "Daily Routine & Animals", icon: Clock },
  { label: "Socialization", icon: Heart },
  { label: "Behavior & Phobias", icon: Brain },
  { label: "Medical History", icon: Stethoscope },
];

export default function ClientIntakeForm() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    consultation_date: new Date().toISOString().split("T")[0],
    owner_name: "",
    owner_email: "",
    dog_breed: "",
    dog_sex: "",
    dog_reproductive_status: "",
    consultation_reason: "",
    dog_weight: "",
    dog_birth_date: "",
    dog_adoption_date: "",
    adoption_status: "",
    dog_origin: "",
    consultation_motives: "",
    housing_type: "",
    interior_access: "",
    where_left_alone: "",
    how_stays_alone: "",
    walk_start_age: "",
    control_tools: "",
    food_type: "",
    food_brand: "",
    food_administration: "",
    treats: "",
    treats_when: "",
    is_glutton: false,
    food_removal_reaction: "",
    walks_number_duration: "",
    post_walk_routine: "",
    feeding_schedule: "",
    other_animals: "[]",
    socialization_family: "",
    socialization_strangers: "",
    socialization_known_dogs: "",
    socialization_unknown_dogs: "",
    elimination_behavior: "",
    sleep_location: "",
    uses_kongs: "",
    chases_bikes_kids: "",
    previous_training: "",
    training_method: "",
    play_behavior: "",
    phobias: "[]",
    stimulus_reaction: "",
    repetitive_behavior: "",
    punishments_type: "",
    punishments_frequency: "",
    punishments_context: "",
    punishments_start: "",
    medical_history_type: "",
    medical_history_start: "",
    medical_history_frequency: "",
    consultation_observations: "",
    medical_problems: "",
    current_medication: "",
  });

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-secondary mb-1.5";
  const sectionClass = "space-y-5";

  const handleSubmit = async () => {
    if (!form.owner_name || !form.owner_email) {
      setError("Owner name and email are required.");
      setStep(0);
      return;
    }

    setSaving(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      ...form,
      user_id: user?.id,
      other_animals: form.other_animals ? JSON.parse(form.other_animals) : [],
      phobias: form.phobias ? JSON.parse(form.phobias) : [],
    };

    const { error: dbError } = await supabase.from("clients").insert(payload);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
    } else {
      router.push("/dashboard/clients");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Owner & Dog Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Consultation Date *</label>
                <input type="date" value={form.consultation_date} onChange={(e) => update("consultation_date", e.target.value)} className={inputClass} />
              </div>
              <div />
              <div>
                <label className={labelClass}>Owner Name *</label>
                <input type="text" value={form.owner_name} onChange={(e) => update("owner_name", e.target.value)} className={inputClass} placeholder="Full name" />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" value={form.owner_email} onChange={(e) => update("owner_email", e.target.value)} className={inputClass} placeholder="owner@email.com" />
              </div>
            </div>
            <div className="border-t border-border/50 pt-5">
              <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Dog Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Breed</label>
                  <input type="text" value={form.dog_breed} onChange={(e) => update("dog_breed", e.target.value)} className={inputClass} placeholder="e.g. Golden Retriever" />
                </div>
                <div>
                  <label className={labelClass}>Sex</label>
                  <select value={form.dog_sex} onChange={(e) => update("dog_sex", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Reproductive Status (E.R.)</label>
                  <select value={form.dog_reproductive_status} onChange={(e) => update("dog_reproductive_status", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    <option value="Intact">Intact</option>
                    <option value="Neutered">Neutered</option>
                    <option value="Spayed">Spayed</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Weight</label>
                  <input type="text" value={form.dog_weight} onChange={(e) => update("dog_weight", e.target.value)} className={inputClass} placeholder="e.g. 25 kg" />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" value={form.dog_birth_date} onChange={(e) => update("dog_birth_date", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date of Adoption</label>
                  <input type="date" value={form.dog_adoption_date} onChange={(e) => update("dog_adoption_date", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Adoption Status</label>
                  <input type="text" value={form.adoption_status} onChange={(e) => update("adoption_status", e.target.value)} className={inputClass} placeholder="e.g. Adopted, Purchased, Rescued" />
                </div>
                <div>
                  <label className={labelClass}>Origin / Provenance</label>
                  <input type="text" value={form.dog_origin} onChange={(e) => update("dog_origin", e.target.value)} className={inputClass} placeholder="e.g. Breeder, Shelter" />
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Consultation Reason</label>
              <input type="text" value={form.consultation_reason} onChange={(e) => update("consultation_reason", e.target.value)} className={inputClass} placeholder="Primary reason for consultation" />
            </div>
            <div>
              <label className={labelClass}>Consultation Motives (Detailed)</label>
              <textarea rows={3} value={form.consultation_motives} onChange={(e) => update("consultation_motives", e.target.value)} className={inputClass + " resize-none"} placeholder="Detailed description of the consultation motives..." />
            </div>
          </div>
        );
      case 1:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Environment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Housing Type</label>
                <select value={form.housing_type} onChange={(e) => update("housing_type", e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="House with Terrace">House with Terrace</option>
                  <option value="House with Garden">House with Garden</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Interior Access</label>
                <select value={form.interior_access} onChange={(e) => update("interior_access", e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  <option value="Always">Always</option>
                  <option value="Never">Never</option>
                  <option value="Sometimes">Sometimes</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Where is the dog left alone?</label>
                <input type="text" value={form.where_left_alone} onChange={(e) => update("where_left_alone", e.target.value)} className={inputClass} placeholder="e.g. Living room, backyard" />
              </div>
              <div>
                <label className={labelClass}>How does the dog stay when alone?</label>
                <input type="text" value={form.how_stays_alone} onChange={(e) => update("how_stays_alone", e.target.value)} className={inputClass} placeholder="e.g. Calm, anxious, destructive" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Walks & Feeding
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Walk Start Age</label>
                <input type="text" value={form.walk_start_age} onChange={(e) => update("walk_start_age", e.target.value)} className={inputClass} placeholder="e.g. 3 months" />
              </div>
              <div>
                <label className={labelClass}>Control Tools</label>
                <input type="text" value={form.control_tools} onChange={(e) => update("control_tools", e.target.value)} className={inputClass} placeholder="e.g. Harness, leash, collar" />
              </div>
              <div>
                <label className={labelClass}>Food Type</label>
                <input type="text" value={form.food_type} onChange={(e) => update("food_type", e.target.value)} className={inputClass} placeholder="e.g. Dry kibble, raw, mixed" />
              </div>
              <div>
                <label className={labelClass}>Food Brand</label>
                <input type="text" value={form.food_brand} onChange={(e) => update("food_brand", e.target.value)} className={inputClass} placeholder="e.g. Royal Canin" />
              </div>
              <div>
                <label className={labelClass}>Food Administration</label>
                <select value={form.food_administration} onChange={(e) => update("food_administration", e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  <option value="Ad Libitum">Ad Libitum (free access)</option>
                  <option value="Rationed">Rationed</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Treats</label>
                <input type="text" value={form.treats} onChange={(e) => update("treats", e.target.value)} className={inputClass} placeholder="Type of treats used" />
              </div>
              <div>
                <label className={labelClass}>When are treats given?</label>
                <input type="text" value={form.treats_when} onChange={(e) => update("treats_when", e.target.value)} className={inputClass} placeholder="e.g. During training, random" />
              </div>
              <div className="flex items-center gap-3 pt-7">
                <input type="checkbox" id="is_glutton" checked={form.is_glutton} onChange={(e) => update("is_glutton", e.target.checked)} className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <label htmlFor="is_glutton" className="text-sm font-medium text-secondary">Is the dog a glutton?</label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Reaction to food removal</label>
              <textarea rows={2} value={form.food_removal_reaction} onChange={(e) => update("food_removal_reaction", e.target.value)} className={inputClass + " resize-none"} placeholder="How does the dog react when food is taken away?" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Daily Routine & Other Animals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Number & Duration of Walks</label>
                <input type="text" value={form.walks_number_duration} onChange={(e) => update("walks_number_duration", e.target.value)} className={inputClass} placeholder="e.g. 3 walks, 30 min each" />
              </div>
              <div>
                <label className={labelClass}>Post-Walk Routine</label>
                <input type="text" value={form.post_walk_routine} onChange={(e) => update("post_walk_routine", e.target.value)} className={inputClass} placeholder="What happens after walks?" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Feeding Schedule</label>
                <input type="text" value={form.feeding_schedule} onChange={(e) => update("feeding_schedule", e.target.value)} className={inputClass} placeholder="e.g. 8am, 1pm, 7pm" />
              </div>
            </div>
            <div className="border-t border-border/50 pt-5">
              <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Other Animals in the Home</h4>
              <textarea rows={3} value={form.other_animals === "[]" ? "" : form.other_animals} onChange={(e) => update("other_animals", e.target.value || "[]")} className={inputClass + " resize-none"} placeholder='Describe other animals: species, breed, age, sex (e.g. "Cat, Siamese, 3 years, Female")' />
              <p className="text-xs text-muted mt-1">One animal per line or describe freely.</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Socialization
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClass}>Behavior with Family Members</label>
                <textarea rows={2} value={form.socialization_family} onChange={(e) => update("socialization_family", e.target.value)} className={inputClass + " resize-none"} placeholder="How does the dog behave with family?" />
              </div>
              <div>
                <label className={labelClass}>Behavior with Strangers</label>
                <textarea rows={2} value={form.socialization_strangers} onChange={(e) => update("socialization_strangers", e.target.value)} className={inputClass + " resize-none"} placeholder="How does the dog react to unknown people?" />
              </div>
              <div>
                <label className={labelClass}>Behavior with Known Dogs</label>
                <textarea rows={2} value={form.socialization_known_dogs} onChange={(e) => update("socialization_known_dogs", e.target.value)} className={inputClass + " resize-none"} placeholder="How does the dog interact with familiar dogs?" />
              </div>
              <div>
                <label className={labelClass}>Behavior with Unknown Dogs</label>
                <textarea rows={2} value={form.socialization_unknown_dogs} onChange={(e) => update("socialization_unknown_dogs", e.target.value)} className={inputClass + " resize-none"} placeholder="How does the dog react to strange dogs?" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Behavior & Other Issues
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Elimination Behavior</label>
                <input type="text" value={form.elimination_behavior} onChange={(e) => update("elimination_behavior", e.target.value)} className={inputClass} placeholder="House-trained? Issues?" />
              </div>
              <div>
                <label className={labelClass}>Where does the dog sleep?</label>
                <input type="text" value={form.sleep_location} onChange={(e) => update("sleep_location", e.target.value)} className={inputClass} placeholder="e.g. Dog bed, owner's bed, crate" />
              </div>
              <div>
                <label className={labelClass}>Uses Kongs or enrichment toys?</label>
                <input type="text" value={form.uses_kongs} onChange={(e) => update("uses_kongs", e.target.value)} className={inputClass} placeholder="Yes/No, which ones?" />
              </div>
              <div>
                <label className={labelClass}>Chases bikes/kids/skateboards?</label>
                <input type="text" value={form.chases_bikes_kids} onChange={(e) => update("chases_bikes_kids", e.target.value)} className={inputClass} placeholder="Describe behavior" />
              </div>
              <div>
                <label className={labelClass}>Previous Training</label>
                <input type="text" value={form.previous_training} onChange={(e) => update("previous_training", e.target.value)} className={inputClass} placeholder="Any previous training?" />
              </div>
              <div>
                <label className={labelClass}>Training Method Used</label>
                <input type="text" value={form.training_method} onChange={(e) => update("training_method", e.target.value)} className={inputClass} placeholder="e.g. Positive reinforcement, clicker" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Play Behavior</label>
              <textarea rows={2} value={form.play_behavior} onChange={(e) => update("play_behavior", e.target.value)} className={inputClass + " resize-none"} placeholder="How does the dog play? Favorite games?" />
            </div>
            <div className="border-t border-border/50 pt-5">
              <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Phobias & Fears</h4>
              <textarea rows={2} value={form.phobias === "[]" ? "" : form.phobias} onChange={(e) => update("phobias", e.target.value || "[]")} className={inputClass + " resize-none"} placeholder="List any phobias or fears (e.g. thunderstorms, fireworks, vacuums)" />
              <div className="mt-4">
                <label className={labelClass}>Reaction to fear stimulus</label>
                <textarea rows={2} value={form.stimulus_reaction} onChange={(e) => update("stimulus_reaction", e.target.value)} className={inputClass + " resize-none"} placeholder="What does the dog do when exposed to the feared stimulus?" />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Repetitive Behaviors</label>
                <input type="text" value={form.repetitive_behavior} onChange={(e) => update("repetitive_behavior", e.target.value)} className={inputClass} placeholder="e.g. Tail chasing, pacing, licking" />
              </div>
            </div>
            <div className="border-t border-border/50 pt-5">
              <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Corrections & Punishments</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Type of Corrections/Punishments</label>
                  <input type="text" value={form.punishments_type} onChange={(e) => update("punishments_type", e.target.value)} className={inputClass} placeholder="e.g. Verbal, physical, none" />
                </div>
                <div>
                  <label className={labelClass}>Frequency</label>
                  <input type="text" value={form.punishments_frequency} onChange={(e) => update("punishments_frequency", e.target.value)} className={inputClass} placeholder="How often?" />
                </div>
                <div>
                  <label className={labelClass}>Context</label>
                  <input type="text" value={form.punishments_context} onChange={(e) => update("punishments_context", e.target.value)} className={inputClass} placeholder="In what situations?" />
                </div>
                <div>
                  <label className={labelClass}>When did it start?</label>
                  <input type="text" value={form.punishments_start} onChange={(e) => update("punishments_start", e.target.value)} className={inputClass} placeholder="How long ago?" />
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className={sectionClass}>
            <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              Medical History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Medical History Type</label>
                <input type="text" value={form.medical_history_type} onChange={(e) => update("medical_history_type", e.target.value)} className={inputClass} placeholder="Type of medical conditions" />
              </div>
              <div>
                <label className={labelClass}>Start Date</label>
                <input type="text" value={form.medical_history_start} onChange={(e) => update("medical_history_start", e.target.value)} className={inputClass} placeholder="When did it begin?" />
              </div>
              <div>
                <label className={labelClass}>Frequency</label>
                <input type="text" value={form.medical_history_frequency} onChange={(e) => update("medical_history_frequency", e.target.value)} className={inputClass} placeholder="How often does it occur?" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Medical Problems</label>
              <textarea rows={2} value={form.medical_problems} onChange={(e) => update("medical_problems", e.target.value)} className={inputClass + " resize-none"} placeholder="Any current medical problems?" />
            </div>
            <div>
              <label className={labelClass}>Current Medication</label>
              <textarea rows={2} value={form.current_medication} onChange={(e) => update("current_medication", e.target.value)} className={inputClass + " resize-none"} placeholder="List current medications and dosages" />
            </div>
            <div>
              <label className={labelClass}>Consultation Observations</label>
              <textarea rows={3} value={form.consultation_observations} onChange={(e) => update("consultation_observations", e.target.value)} className={inputClass + " resize-none"} placeholder="Notes and observations from the consultation..." />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="bg-white rounded-2xl border border-border/50 p-4 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                i === step
                  ? "bg-primary text-white"
                  : i < step
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-light"
              }`}
            >
              <s.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl border border-border/50 p-8 shadow-sm">
        {renderStep()}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted hover:text-secondary hover:border-secondary disabled:opacity-40 transition-all font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-all shadow-md"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-all shadow-md disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Client
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
