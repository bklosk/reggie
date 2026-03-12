import { NextResponse } from "next/server";
import Exa from "exa-js";

type WatchlistRequestBody = {
  query: string;
};

const OUTPUT_SCHEMA = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" },
          url: { type: "string" },
          publishedDate: { type: "string" },
          agency: { type: "string" },
          status: { type: "string" },
        },
      },
    },
  },
  required: ["results"],
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WatchlistRequestBody;

    if (!body.query) {
      return NextResponse.json(
        { error: "Missing required field: query" },
        { status: 400 }
      );
    }

    const exa = new Exa();

    const response = await exa.search(body.query, {
      type: "deep",
      systemPrompt: [
        `You are a regulatory intelligence analyst. For each result, extract the title, a brief summary, the URL, the published date (ISO 8601), the issuing agency, and the status (e.g., proposed, final, active, closed).`,
        `Return the most recent and impactful developments first.`,
      ].join(" "),
      outputSchema: OUTPUT_SCHEMA,
    });

    const output = response.output?.content;

    if (!output || typeof output === "string") {
      return NextResponse.json({ results: [] });
    }

    const raw = output as { results?: unknown[] };
    const results = Array.isArray(raw.results) ? raw.results : [];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[/api/watchlist]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
