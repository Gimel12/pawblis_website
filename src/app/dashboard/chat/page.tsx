import AIChatWidget from "@/components/dashboard/AIChatWidget";

export const metadata = {
  title: "AI Assistant",
};

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary">AI Assistant</h1>
        <p className="text-muted mt-1">
          Ask questions about your clients, get training recommendations, or
          manage records using natural language.
        </p>
      </div>
      <AIChatWidget />
    </div>
  );
}
