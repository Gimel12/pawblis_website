import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages } = await request.json();

    // Fetch all client data for context
    const { data: clients } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    const clientContext =
      clients && clients.length > 0
        ? clients
            .map(
              (c, i) =>
                `Client ${i + 1}: ${c.owner_name} (${c.owner_email})
  Dog: ${c.dog_breed || "Unknown breed"}, ${c.dog_sex || "Unknown sex"}, Weight: ${c.dog_weight || "N/A"}
  Consultation Date: ${c.consultation_date || "N/A"}
  Reason: ${c.consultation_reason || "N/A"}
  Motives: ${c.consultation_motives || "N/A"}
  Housing: ${c.housing_type || "N/A"}, Interior Access: ${c.interior_access || "N/A"}
  Food: ${c.food_type || "N/A"} (${c.food_brand || "N/A"}), Administration: ${c.food_administration || "N/A"}
  Walks: ${c.walks_number_duration || "N/A"}
  Socialization - Family: ${c.socialization_family || "N/A"}, Strangers: ${c.socialization_strangers || "N/A"}, Known Dogs: ${c.socialization_known_dogs || "N/A"}, Unknown Dogs: ${c.socialization_unknown_dogs || "N/A"}
  Sleep: ${c.sleep_location || "N/A"}, Previous Training: ${c.previous_training || "N/A"}, Method: ${c.training_method || "N/A"}
  Phobias: ${typeof c.phobias === "string" ? c.phobias : JSON.stringify(c.phobias) || "None"}
  Medical Problems: ${c.medical_problems || "None"}, Medication: ${c.current_medication || "None"}
  Observations: ${c.consultation_observations || "N/A"}`
            )
            .join("\n\n")
        : "No clients in the database yet.";

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const systemPrompt = `You are Pawblis AI, a helpful assistant for a professional dog trainer named Yanet who runs Pawblis Dog Training. You have access to all client intake records from the database.

Your role is to:
- Answer questions about clients and their dogs
- Provide training recommendations based on client data
- Help identify patterns across clients
- Suggest behavioral approaches based on the dog's profile
- Summarize client information when asked

Here are all the current client records:

${clientContext}

Be helpful, concise, and professional. When referencing clients, use their names. If asked about something not in the data, say so clearly. Provide actionable training advice when relevant, always emphasizing positive reinforcement methods.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const content =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I could not generate a response.";

    return Response.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
