import ClientIntakeForm from "@/components/dashboard/ClientIntakeForm";

export const metadata = {
  title: "New Client Intake",
};

export default function NewClientPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary">
          New Client Intake
        </h1>
        <p className="text-muted mt-1">
          Fill out the canine education consultation form
        </p>
      </div>
      <ClientIntakeForm />
    </div>
  );
}
