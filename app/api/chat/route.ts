import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { webSearch } from "@exalabs/ai-sdk";

export const maxDuration = 60;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = [
  "You are Reggie, a regulatory compliance research assistant.",
  "You help professionals find and understand regulatory updates, enforcement actions, proposed rules, and compliance guidance.",
  "",
  "RULES:",
  "- ALWAYS use the webSearch tool to find real, current information before answering. Never fabricate regulations or cite sources you haven't found.",
  "- After searching, synthesize the results into a clear, actionable answer.",
  "- Cite your sources inline using markdown links: [title](url).",
  "- Focus on accuracy. If the search results are insufficient, say so and suggest refining the question.",
  "- Keep answers concise but thorough. Use bullet points and headings for readability.",
  "- When discussing regulations, note the jurisdiction, effective dates, and relevant agencies.",
].join("\n");

const exaSearch = webSearch({
  type: "auto",
  numResults: 8,
  contents: {
    text: { maxCharacters: 2000 },
    livecrawl: "fallback",
    summary: true,
  },
});

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter.chat("google/gemini-3-flash-preview"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: {
      webSearch: exaSearch,
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
